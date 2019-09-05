<template>
  <transition name="datepicker-transition" appear @after-enter="setActive">
    <div
      v-click-outside="{ handler : () => $emit('close'), isActive: !inline && isActive }"
      v-if="shouldShowAgenda"
      ref="content"
      :style="styles"
      :class="classes"
      class="datepicker"
      name="datepicker-slide"
      @mousemove="handleMouseMove"
      @click.stop>

      <!-- Title (Only for fullscreenMobile) -->
      <div
        v-if="fullscreenMobile"
        class="datepicker-title">
        <p>{{ name }}</p>
        <button type="button" @click="$emit('close')">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="times"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <!-- eslint-disable max-len -->
            <path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
            <!-- eslint-enable max-len -->
          </svg>
        </button>
      </div>

      <!-- Header -->
      <DatePickerHeader
        v-if="!noHeader"
        :mutable-date="mutableDate"
        :transition-name="transitionLabelName"
        :color="color"
        :locale="locale"
        :format-header="formatHeader"
        :mode="yearMonthMode"
        :range="range"
        :range-header-text="rangeHeaderText"
        @showYearMonthSelector="showYearMonthSelector"
        @hideYearMonthSelector="hideYearMonthSelector"
      />

      <!-- Presets -->
      <DatePickerPresets
        v-if="range"
        :range-presets="rangePresets"
        :mutable-date="mutableDate"
        :min-date="minDate"
        :end-date="endDate"
        :color="color"
        :locale="locale"
        @updateRange="emitSelectedDate"
      />

      <div class="datepicker-content">
        <!-- Controls -->
        <DatePickerControls
          :rtl="rtl"
          :current-date="currentDate"
          :transition-name="transitionLabelName"
          :color="color"
          mode="month"
          @changeVisibleDate="changeMonth"
          @showYearMonthSelector="showYearMonthSelector"
        />

        <!-- Week -->
        <div class="datepicker-week">
          <div
            v-for="(day, index) in weekDays"
            :key="index"
            class="datepicker-weekday">
            {{ day }}
          </div>
        </div>

        <!-- Days -->
        <TransitionGroup
          tag="div"
          class="datepicker-days__wrapper"
          :class="classWeeks"
          :name="transitionDaysName">
          <div
            v-for="dates in [currentDate]"
            :key="dates.month"
            class="datepicker-days">
            <div
              v-for="day in spaceBeforeFirstDay"
              :key="`space-${day}`"
              class="datepicker-day"
            />
            <button
              v-for="(day, index) in currentDate.getDays()"
              :key="index"
              :class="{
                'selected' : isSelected(day) && !isDisabled(day),
                'between': range && isBetween(day),
                'in-range': range && isInRange(day),
                'first': range && firstInRange(day),
                'last': range && lastInRange(day) && Boolean(mutableDate.end),
                'select-start': range && !mutableDate.start,
                'select-end': range && mutableDate.start && !mutableDate.end,
                'disabled': isDisabled(day),
              }"
              :disabled="isDisabled(day)"
              :data-date="day.format('YYYY-MM-DD')"
              type="button"
              class="datepicker-day"
              @click="selectDate(day)"
            >
              <span v-if="isToday(day)" class="datepicker-day--current" />
              <span
                :style="setBackgroundColor(color)"
                class="datepicker-day__effect" />
              <span class="datepicker-day__text">{{day.format('D')}}</span>
            </button>
          </div>
        </TransitionGroup>

        <DatePickerYearMonth
          v-if="shouldShowYearMonthSelector"
          :mode="yearMonthMode"
          :range="range"
          :current-date="currentDate"
          :mutable-date="mutableDate"
          :transition-name="transitionDaysName"
          :show-year-month-selector="showYearMonthSelector"
          :color="color"
          :min-date="minDate"
          :end-date="endDate"
          @changeYear="changeYear"
          @selectedYearMonth="selectedYearMonth"
        />
      </div>

      <!-- Validate -->
      <DatePickerValidate
        v-if="validate"
        :button-validate="buttonValidate"
        :button-cancel="buttonCancel"
        :color="color"
        @cancel="$emit('close')"
        @validate="$emit('validateDate')"
      />
    </div>
  </transition>
</template>

<script>
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

// directives
import ClickOutside from '../../directives/click-outside';

// mixins
import dynamicPosition from '../../mixins/dynamicPosition';
import detachable from '../../mixins/detachable';
import colorable from '../../mixins/colorable';

// components
import DatePickerHeader from './DatePickerHeader.vue';
import DatePickerControls from './DatePickerControls.vue';
import DatePickerYearMonth from './DatePickerYearMonth.vue';
import DatePickerPresets from './DatePickerPresets.vue';
import DatePickerValidate from './DatePickerValidate.vue';

// functions
import Dates, {
  getWeekDays,
  formatDateWithYearAndMonth,
  isDateToday,
  isBeforeDate,
  isAfterDate,
  isDateAfter,
  formatDate,
  generateMonthAndYear,
  isBetweenDates,
  convertQuarterToMonth,
} from '../../utils/Dates';
import { computeAgendaHeight } from '../../utils/positions';

// constants
import { yearMonthSelectorTypes } from '../../constants';

export default {
  name: 'DatepickerAgenda',
  mixins: [ detachable, colorable, dynamicPosition ],
  directives: { ClickOutside },
  components: {
    DatePickerHeader,
    DatePickerControls,
    DatePickerYearMonth,
    DatePickerPresets,
    DatePickerValidate,
  },
  props: {
    name: { type: String },
    isVisible: { type: Boolean, default: false },
    date: { type: [Date, Object] },
    type: { type: String, default: 'date' },
    validate: { type: Boolean, default: false },
    buttonValidate: { type: String },
    buttonCancel: { type: String },
    range: { type: Boolean, default: false },
    rangePresets: { type: Array, default: undefined },
    rangeHeaderText: { type: String, default: String },
    formatHeader: { type: String },
    rtl: { type: Boolean, default: false },
    locale: { type: Object },
    noHeader: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    fixed: { type: Boolean },
    fullscreenMobile: { type: Boolean, default: false },
    color: { type: String },
    minDate: { type: [String, Number, Date] },
    endDate: { type: [String, Number, Date] },
    zIndex: { type: Number },
  },
  data: () => ({
    height: 'auto',
    isActive: false,
    currentDate: undefined,
    mutableDate: undefined,
    transitionDaysName: 'slide-h-next',
    transitionLabelName: 'slide-v-next',
    shouldShowYearMonthSelector: undefined,
    yearMonthMode: undefined,
    rangeCurrentHoveredDay: undefined,
  }),
  computed: {
    styles () {
      return {
        height: this.height,
        // left, top, orign from @/mixins/dynamicPosition
        left: `${this.left}px`,
        top: `${this.top}px`,
        transformOrigin: this.origin,
        zIndex: this.inline ? null : this.zIndex,
      };
    },
    classes () {
      return {
        'datepicker--rtl': this.rtl,
        'datepicker--inline': this.inline,
        'datepicker--fixed': this.fixed,
        'datepicker--fullscreen-mobile': this.fullscreenMobile,
        'datepicker--no-header': this.noHeader,
        'datepicker--validate': this.validate,
        'datepicker--range': this.range,
        'datepicker--range-selecting': this.range && !this.isRangeSelected,
      };
    },
    weekDays () {
      return getWeekDays(this.locale);
    },
    spaceBeforeFirstDay () {
      return [...Array(this.currentDate.getWeekStart()).keys()];
    },
    classWeeks () {
      // if yearMonth selector is opened, stop changing class
      if (this.shouldShowYearMonthSelector) return;

      if (this.currentDate.getDays().length + this.currentDate.start.weekday() > 35) {
        return `has-6-weeks`;
      }
      return `has-5-weeks`;
    },
    shouldShowAgenda () {
      return this.isVisible || this.inline;
    },
    shouldShowBottomSheet () {
      return this.innerWidth < 480 && this.fullscreenMobile && this.isVisible;
    },
    isRangeSelected () {
      if (!this.range) return false;
      return Object.values(this.mutableDate).every(date => Boolean(date));
    },
  },
  destroyed () {
    clearAllBodyScrollLocks();
  },
  watch: {
    // When date change (after being visibled),
    // should update currentDate & mutableDate
    date: {
      handler: 'updateDate',
    },
    // When type change (after being visibled),
    // should update shouldShowYearMonthSelector
    type (newType) {
      this.shouldShowYearMonthSelector = yearMonthSelectorTypes.includes(newType);
      this.yearMonthMode = newType;
    },
    // When agenda should be visible => init currentDate & mutableDate
    // When agenda should be hidden => reset data
    shouldShowAgenda: {
      async handler (show) {
        if (show) {
          // init data when datepicker is visible
          this.updateDate(this.date);
          this.shouldShowYearMonthSelector = yearMonthSelectorTypes.includes(this.type);
          this.yearMonthMode = this.type;

          // If inline, we don't need to update position
          if (this.inline) return;

          await this.$nextTick();

          this.initDetach(); // from @/mixins/detachable
          this.initResizeListener(); // from @/mixins/dynamicPosition
          this.updatePosition(); // from @/mixins/dynamicPosition
          return;
        };
        // reset data when datepicker is hidden
        this.removeResizeListener();
        Object.assign(this.$data, this.$options.data());
      },
      immediate: true,
    },
    // When bottomSheet is visibled => lock body scroll
    // When bottomSheet is hidden => unlock body scroll
    shouldShowBottomSheet: {
      async handler (show) {
        await this.$nextTick();

        if (show) {
          this.height = `${computeAgendaHeight(this.$refs.content, this.classWeeks)}px`;
          disableBodyScroll(this.$el.querySelector('.datepicker-content'));
          return;
        }
        this.height = 'auto';
        enableBodyScroll();
      },
      immediate: true,
    },
    // When bottomSheet is visibled and visibled mode is 'year'
    // => should keep scroll disabled, but should allow scroll into years list
    yearMonthMode (mode) {
      if (mode === 'year' && this.shouldShowBottomSheet) {
        enableBodyScroll(this.$el.querySelector('.datepicker-content'));
        disableBodyScroll(this.$el.querySelector('.datepicker-year-month'));
      }
    },
  },
  methods: {
    setActive () {
      this.isActive = true;
    },
    isSelected (day) {
      if (this.range) {
        const date = [
          ...(this.mutableDate.start ? [this.mutableDate.start.startOf('day').unix()] : []),
          ...(this.mutableDate.end ? [this.mutableDate.end.startOf('day').unix()] : []),
        ];
        return date.includes(day.unix());
      }
      return this.mutableDate && this.mutableDate.startOf('day').unix() === day.unix();
    },
    isBetween (day) {
      if (!this.mutableDate.start && !this.mutableDate.end) return false;
      return isBetweenDates(day, this.mutableDate.start, this.mutableDate.end);
    },
    isInRange (day) {
      if (!this.rangeCurrentHoveredDay) return;

      if (isBeforeDate(this.rangeCurrentHoveredDay, this.mutableDate.end)) {
        return isBetweenDates(day, this.rangeCurrentHoveredDay, this.mutableDate.end);
      }
      return isBetweenDates(day, this.mutableDate.start, this.rangeCurrentHoveredDay);
    },
    firstInRange (day) {
      return this.mutableDate.start && this.mutableDate.start.startOf('day').unix() === day.unix();
    },
    lastInRange (day) {
      return this.mutableDate.end && this.mutableDate.end.startOf('day').unix() === day.unix();
    },
    isDisabled (day) {
      return isBeforeDate(day, this.minDate) || isAfterDate(day, this.endDate);
    },
    isToday (day) {
      return isDateToday(day);
    },
    selectDate (day) {
      if (this.range) {
        // If rangeIsSelected or no dates selected => should reset, and select start
        if (this.isRangeSelected || (!this.mutableDate.start && !this.mutableDate.end)) {
          this.mutableDate = { start: day.clone(), end: undefined };
          return;
        }
        // else, should update missing range (start or end)
        this.emitSelectedDate({
          ...this.mutableDate,
          ...(this.mutableDate.start && { end: day.clone() }),
          ...(this.mutableDate.end && { start: day.clone() }),
        });
        return;
      }

      const direction = isDateAfter(day, this.mutableDate) ? 'next' : 'prev';
      this.updateTransitions(direction);
      this.emitSelectedDate(day.clone());
    },
    emitSelectedDate (date) {
      this.mutableDate = date;
      this.rangeCurrentHoveredDay = undefined;
      this.$emit('selectDate', this.mutableDate);
    },
    updateDate (date) {
      let newDate = formatDate(this.range ? (date.end || date.start) : date, this.locale);

      // If today's date is after endDate, we should show endDate month
      if (isAfterDate(newDate, this.endDate)) {
        newDate = formatDate(this.endDate, this.locale);
      }

      if (this.range) {
        this.currentDate = new Dates(newDate.month(), newDate.year(), this.locale);
        this.mutableDate = date;
        return;
      }

      let month = this.type === 'quarter' ? convertQuarterToMonth(newDate.month()) : newDate.month();
      this.currentDate = new Dates(month, newDate.year(), this.locale);
      this.mutableDate = date && date.month(month).clone();
    },
    changeMonth (direction) {
      let month = this.currentDate.month + (direction === 'prev' ? -1 : +1);
      let year = this.currentDate.year;
      if (month > 11 || month < 0) {
        year += (direction === 'prev' ? -1 : +1);
        month = (direction === 'prev' ? 11 : 0);
      }
      this.updateTransitions(direction);
      this.currentDate = new Dates(month, year, this.locale);
    },
    changeYear (direction) {
      let year = this.currentDate.year + (direction === 'prev' ? -1 : +1);
      const month = this.currentDate.month;
      this.updateTransitions(direction);
      this.currentDate = new Dates(month, year, this.locale);
    },
    updateTransitions (direction) {
      this.transitionDaysName = `slide-h-${direction}`;
      this.transitionLabelName = `slide-v-${direction}`;
    },
    showYearMonthSelector (mode) {
      this.yearMonthMode = mode;
      this.shouldShowYearMonthSelector = true;
    },
    hideYearMonthSelector () {
      this.yearMonthMode = undefined;
      this.shouldShowYearMonthSelector = false;
    },
    selectedYearMonth (value, mode) {
      const { year, month } = generateMonthAndYear(value, this.currentDate, mode);
      this.currentDate = new Dates(month, year, this.locale);

      if (mode === 'year') {
        this.yearMonthMode = this.type === 'date' ? 'month' : this.type;
        return;
      }

      if (this.type === 'month' || this.type === 'quarter') {
        const newDate = formatDateWithYearAndMonth(this.currentDate.year, this.currentDate.month);
        this.selectDate(newDate);
        return;
      }

      this.hideYearMonthSelector();
    },
    handleMouseMove (event) {
      // Should handle mouse move if :
      // -> not a range mode
      // -> range already selected
      if (!this.range || this.isRangeSelected) return;
      let target = event.target;

      // Should handle mouse move only on those classes
      const CLASSES = ['datepicker-day', 'datepicker-day__effect'];
      if (
        typeof target.className === 'string' &&
        !CLASSES.includes(target.className.split(' ')[0])
      ) return;

      // If tagName is SPAN, it means we should select parent
      if (target.tagName === 'SPAN') {
        target = event.target.parentNode;
      }

      // Don't do anything if we are on the same day
      const isADate = target.dataset.date;
      const isCurrentHoveredDay = target.dataset.date === this.rangeCurrentHoveredDay;
      if (!isADate || isCurrentHoveredDay) return;

      this.rangeCurrentHoveredDay = target.dataset.date;

      // Should update mutableDate if
      // -> hovered day is before or after current selected date
      if (isBeforeDate(this.rangeCurrentHoveredDay, this.mutableDate.start)) {
        this.mutableDate = { start: undefined, end: this.mutableDate.start };
      } else if (isAfterDate(this.rangeCurrentHoveredDay, this.mutableDate.end)) {
        this.mutableDate = { start: this.mutableDate.end, end: undefined };
      }
    },
  },
};
</script>

<style>
  .datepicker  *,
  .datepicker ::before,
  .datepicker ::after {
    box-sizing: border-box;
  }
</style>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss',
            '../../styles/base/animations.scss';

  .datepicker {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: get-size(mobile, width);
    left: 0;
    top: 100%;
    will-change: transform;
    background-color: white;
    border-radius: get-border-radius(2);
    box-shadow: 0 2px 8px rgba(50, 50, 93, 0.2);
    box-sizing: border-box;

    &:focus,
    &:active {
      outline: 0;
    }

    @include mq(tablet) {
      width: get-size(desktop, width);
    }

    &--rtl {
      .datepicker-days .datepicker-day.first .datepicker-day__effect:before,
      .datepicker-days .datepicker-day.select-start:hover:not(.selected) .datepicker-day__effect:before {
          left: auto;
          right: 50%;
        }

      .datepicker-days .datepicker-day.last .datepicker-day__effect:before,
      .datepicker-days .datepicker-day.select-end:hover:not(.selected) .datepicker-day__effect:before {
        left: auto;
        right: -50%;
      }
    }

    &--inline {
      position: relative;
      box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
        0px 2px 2px 0px rgba(0,0,0,0.14),
        0px 1px 5px 0px rgba(0,0,0,0.12);
    }

    &--fixed {
      position: fixed;
    }

    &--fullscreen-mobile {
      @include mq($to: phone) {
        position: fixed;
        top: auto !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100%;
        border-radius: get-border-radius(4) get-border-radius(4) 0 0;

        // Browsers which partially support CSS Environment variables (iOS 11.0-11.2).
        @supports (padding-bottom: constant(safe-area-inset-bottom)) {
          --safe-area-inset-bottom: constant(safe-area-inset-bottom);
          padding-bottom: var(--safe-area-inset-bottom);
        }

        // Browsers which fully support CSS Environment variables (iOS 11.2+).
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          --safe-area-inset-bottom: env(safe-area-inset-bottom);
          padding-bottom: var(--safe-area-inset-bottom);
        }

        .datepicker-header {
          border-radius: 0;
        }
      }
    }

    /* Title
    ---------------------- */
    &-title {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: get-size(mobile, title);
      padding: 0 0 0 $gutter*3;
      border-radius: get-border-radius(4) get-border-radius(4) 0 0;

      @include mq(phone) {
        display: none;
      }

      p {
        margin: 0;
      }

      button {
        position: relative;
        flex: 0 0 40px;
        height: get-size(mobile, controls);
        width: get-size(mobile, controls);
        padding: 0 $gutter*2 0 $gutter;
        border: none;
        outline: none;
        background-color: transparent;
        user-select: none;

        @include mq(tablet) {
          height: get-size(desktop, controls);
          width: get-size(desktop, controls);
        }

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }

    /* Contsnt
    ---------------------- */
    &-content {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
    }

    /* Week
    ---------------------- */
    &-week {
      display: flex;
      font-size: 12px;
      line-height: 12px;
      font-weight: get-font-weight(medium);
      margin: $gutter $gutter*3;
      color: transparentize(black, .62);

      @include mq(tablet) {
        margin: $gutter $gutter*2;
      }

      .datepicker-weekday {
        width: calc((100% / 7) - 0.1px);
        text-align: center;

        @include mq(tablet) {
          width: get-size(desktop, day-width);
        }
      }
    }

    /* Days
    ---------------------- */
    &-days__wrapper {
      position: relative;
      height: get-size(mobile, day-height) * 5;
      margin: 0 $gutter*3 $gutter;
      overflow: hidden;
      transition: height .3s cubic-bezier(0.23, 1, 0.32, 1);

      @include mq(tablet) {
        margin: 0 $gutter*2 $gutter;
        height: get-size(desktop, day-height) * 5;
      }

      &.has-6-weeks {
        height: get-size(mobile, day-height) * 6;

        @include mq(tablet) {
          height: get-size(desktop, day-height) * 6;
        }
      }

      .datepicker--validate & {
        margin: 0 $gutter*3;

        @include mq(tablet) {
          margin: 0 $gutter*2;
        }
      }
    }

    &-days {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      width: 100%;

      .datepicker-day {
        @extend %reset-button;
        position: relative;
        width: calc((100% / 7) - 0.1px);
        height: get-size(mobile, day-height);
        line-height: 1;
        font-size: 12px;
        float: left;
        text-align: center;
        color: transparentize(black, .13);
        font-weight: get-font-weight(medium);
        transition: color 450ms cubic-bezier(0.23, 1, 0.32, 1);
        overflow: hidden;

        @include mq(tablet) {
          width: calc((100% / 7) - 0.1px);
          height: get-size(desktop, day-height);
        }

        &:hover:not(.disabled) {
          color: white;

          .datepicker-day__effect {
            transform: translateX(-50%) scale(1);
            opacity: .5;
          }
        }
        &.in-range:not(.disabled),
        &.between:not(.disabled) {
          color: white;

          .datepicker-day__effect {
            transform: translateX(-50%);
            left: 0;
            width: calc(100% + 1px); // 1 extra pixel to fix weird spaces;
            border-radius: 0;
            opacity: .5;

            &:before {
              opacity: 1;
              left: 50%;
            }
          }
        }
        &.selected {
          color: white;

          &:hover:not(.disabled) {
            .datepicker-day__effect {
              opacity: 1;
            }
          }

          .datepicker-day__effect {
            transform: translateX(-50%);
            opacity: 1;
          }
        }
        &.first,
        &.select-start:hover:not(.selected) {
          .datepicker-day__effect {
            opacity: 1;

            &:before {
              opacity: .5;
              left: 50%;
            }
          }
        }
        &.last,
        &.select-end:hover:not(.selected) {
          .datepicker-day__effect {
            opacity: 1;

            &:before {
              opacity: .5;
              left: -50%;
            }
          }
        }
        &.first.last {
          .datepicker-day__effect {
            &:before {
              opacity: 0;
            }
          }
        }
        &.disabled {
          cursor: default;
          color: rgba(0,0,0,0.26);

          &:hover {
            .datepicker-day__effect,
            .datepicker-day__effect:before {
              opacity: 0 !important;
            }
          }
        }
      }

      .datepicker-day--current {
        position: absolute;
        top: 1px;
        left: 50%;
        transform: translateX(-50%);
        width: #{get-size(mobile, day-height) - 2};
        height: #{get-size(mobile, day-height) - 2};
        border-radius: 50%;
        border: 1px solid currentColor;

        @include mq(tablet) {
          top: 4px;
          width: 36px;
          height: 36px;
        }
      }

      .datepicker-day__effect {
        position: absolute;
        top: 1px;
        left: 50%;
        width: #{get-size(mobile, day-height) - 2};
        height: #{get-size(mobile, day-height) - 2};
        border-radius: 50%;
        transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1);
        transition-property: transform, opacity;
        transform: translateX(-50%) scale(0);

        @include mq(tablet) {
          top: 4px;
          width: 36px;
          height: 36px;
        }

        .datepicker--range & {
          &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: inherit;
            opacity: 0;
          }
        }

        .datepicker--range-selecting & {
          transform: translateX(-50%) scale(0);
          opacity: 0;
          transition: none;
        }
      }

      .datepicker-day__text {
        position: relative;
        vertical-align: sub;
      }
    }

  }
  // ----------------------
  // Transition
  // ----------------------
  .datepicker-transition {
    &-enter-active:not(.datepicker--inline),
    &-leave-active:not(.datepicker--inline) {
      opacity: 1;
      transition: all 300ms;
      transition-property: transform, opacity;
      transform: scale(1);

      @include mq($to: phone) {
        &.datepicker--fullscreen-mobile {
          transform: translateY(0);
        }
      }
    }

    &-leave-to:not(.datepicker--inline) ,
    &-enter:not(.datepicker--inline) {
      opacity: 0;
      transform: scale(0);

      @include mq($to: phone) {
        &.datepicker--fullscreen-mobile {
          transform: translateY(100%);
        }
      }
    }

  }
</style>
