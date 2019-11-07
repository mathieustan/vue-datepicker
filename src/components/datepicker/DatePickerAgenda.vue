<template>
  <div
    ref="datepicker"
    :style="styles"
    :class="classes"
    class="datepicker"
    @mousemove="handleMouseMove"
    @touchstart.stop
  >

    <!-- Title (Only for bottomsheet) -->
    <div
      v-if="activeBottomSheet"
      class="datepicker__title">
      <p>{{ name }}</p>
      <div class="datepicker__title-close">
        <Icon @click="$emit('close')">close</Icon>
      </div>
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
      :max-date="maxDate"
      :color="color"
      :locale="locale"
      @updateRange="emitSelectedDate"
    />

    <div
      ref="body"
      class="datepicker__body">
      <!-- Controls -->
      <DatePickerControls
        :current-date="currentDate"
        :transition-name="transitionLabelName"
        :color="color"
        mode="month"
        @changeVisibleDate="changeMonth"
        @showYearMonthSelector="showYearMonthSelector"
      />

      <!-- Week -->
      <div class="datepicker__week">
        <div
          v-for="(day, index) in weekDays"
          :key="index"
          class="datepicker__weekday">
          {{ day }}
        </div>
      </div>

      <!-- Days -->
      <TransitionGroup
        tag="div"
        class="datepicker__days-wrapper"
        :class="classWeeks"
        :name="transitionDaysName">
        <div
          v-for="dates in [currentDate]"
          :key="dates.month"
          class="datepicker__days">
          <div
            v-for="day in spaceBeforeFirstDay"
            :key="`space-${day}`"
            class="datepicker__day"
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
            class="datepicker__day"
            @click="selectDate(day)"
          >
            <span v-if="isToday(day)" class="datepicker__day--current" />
            <span
              :style="setBackgroundColor(color)"
              class="datepicker__day-effect" />
            <span class="datepicker__day-text">{{day.format('D')}}</span>
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
        :max-date="maxDate"
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
      :range="range"
      :mutable-date="mutableDate"
      @cancel="$emit('close')"
      @validate="$emit('validateDate')"
    />
  </div>
</template>

<script>
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

// mixins
import colorable from '../../mixins/colorable';

// components
import Icon from '../Icon';
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
  name: 'DatePickerAgenda',
  mixins: [colorable],
  components: {
    Icon,
    DatePickerHeader,
    DatePickerControls,
    DatePickerYearMonth,
    DatePickerPresets,
    DatePickerValidate,
  },
  props: {
    name: { type: String },
    date: { type: [Date, Object] },
    type: { type: String, default: 'date' },
    value: { type: Boolean, default: false },
    validate: { type: Boolean, default: false },
    buttonValidate: { type: String },
    buttonCancel: { type: String },
    range: { type: Boolean, default: false },
    rangePresets: { type: Array, default: undefined },
    rangeHeaderText: { type: String, default: String },
    formatHeader: { type: String },
    locale: { type: Object },
    noHeader: { type: Boolean, default: false },
    activeBottomSheet: { type: Boolean, default: false },
    color: { type: String },
    minDate: { type: [String, Number, Date] },
    maxDate: { type: [String, Number, Date] },
    rtl: { type: Boolean, default: false },
  },
  data: () => ({
    height: 'auto',
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
      };
    },
    classes () {
      return {
        'datepicker--rtl': this.rtl,
        'datepicker--bottomsheet': this.activeBottomSheet,
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
    isRangeSelected () {
      if (!this.range) return false;
      return typeof this.mutableDate === 'object' &&
        Object.values(this.mutableDate).every(date => Boolean(date));
    },
  },
  created () {
    this.initAgenda();
  },
  beforeDestroy () {
    clearAllBodyScrollLocks();
  },
  watch: {
    value: 'initAgenda',
    // When, date change (after being visibled),
    // should update currentDate & mutableDate
    date: 'updateDate',
    // When type change (after being visibled),
    // should update shouldShowYearMonthSelector
    type (newType) {
      this.shouldShowYearMonthSelector = yearMonthSelectorTypes.includes(newType);
      this.yearMonthMode = newType;
    },
    // When activeBottomSheet is visibled => lock body scroll
    // When activeBottomSheet is hidden => unlock body scroll
    activeBottomSheet: {
      async handler (show) {
        await this.$nextTick();

        if (show) {
          this.height = `${computeAgendaHeight(this.$refs.datepicker, this.classWeeks)}px`;
          disableBodyScroll(this.$refs.body);
          return;
        }

        this.height = 'auto';
        enableBodyScroll();
      },
      immediate: true,
    },
    // When activeBottomSheet is visibled and visibled mode is 'year'
    // => should keep scroll disabled, but should allow scroll into years list
    yearMonthMode (mode) {
      if (mode === 'year' && this.activeBottomSheet) {
        enableBodyScroll(this.$refs.body);
        disableBodyScroll(this.$el.querySelector('.datepicker-year-month'));
      }
    },
    // When currentHoveredDay change, we need to check
    // if hovered day is before/after first selected date
    // Then we swap start / end date according to the result
    rangeCurrentHoveredDay (newHoveredDay) {
      if (!newHoveredDay) return;
      this.reOrderSelectedDate(newHoveredDay);
    },
  },
  methods: {
    initAgenda () {
      this.updateDate(this.date);
      this.shouldShowYearMonthSelector = yearMonthSelectorTypes.includes(this.type);
      this.yearMonthMode = this.type;
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
      return isBeforeDate(day, this.minDate) || isAfterDate(day, this.maxDate);
    },
    isToday (day) {
      return isDateToday(day);
    },
    reOrderSelectedDate (newDate) {
      if (!this.mutableDate) return;
      // Should update mutableDate if
      // -> hovered day is before or after current selected date
      if (isBeforeDate(newDate, this.mutableDate.start)) {
        this.mutableDate = { start: undefined, end: this.mutableDate.start };
      } else if (isAfterDate(newDate, this.mutableDate.end)) {
        this.mutableDate = { start: this.mutableDate.end, end: undefined };
      }
    },
    selectDate (day) {
      if (this.range) {
        // If rangeIsSelected or no dates selected => should reset, and select start
        if (this.isRangeSelected || (!this.mutableDate.start && !this.mutableDate.end)) {
          this.mutableDate = { start: day.clone(), end: undefined };
          return;
        }
        // else, should update missing range (start or end)
        this.reOrderSelectedDate(day);
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

      // If today's date is after maxDate, we should show maxDate month
      if (isAfterDate(newDate, this.maxDate)) {
        newDate = formatDate(this.maxDate, this.locale);
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
      const CLASSES = ['datepicker__day', 'datepicker__day-effect'];
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
    },
  },
};
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss',
            '../../styles/base/_animations.scss';

  .datepicker,
  .datepicker *,
  .datepicker ::before,
  .datepicker ::after {
    box-sizing: border-box;
  }

  .datepicker {
    display: flex;
    flex-direction: column;
    width: get-size(mobile, width);
    background-color: white;
    border-radius: get-border-radius(2);
    box-shadow: 0 2px 8px rgba(50, 50, 93, 0.2);

    &:focus,
    &:active {
      outline: 0;
    }

    @include mq(tablet) {
      width: get-size(desktop, width);
    }

    &--bottomsheet {
      @include mq($to: phone) {
        width: 100%;

        .datepicker-header {
          border-radius: 0;
        }
      }
    }

    /* Title
    ---------------------- */
    &__title {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: get-size(mobile, title);
      padding: 0 0 0 $gutter*3;
      border-radius: get-border-radius(4) get-border-radius(4) 0 0;

      .datepicker--rtl & {
        direction: rtl;
        padding: 0 $gutter*3 0 0;
      }

      @include mq(phone) {
        display: none;
      }

      p {
        margin: 0;
      }

      &-close {
        position: relative;
        display: flex;
        align-items: center;
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

    /* Body
    ---------------------- */
    &__body {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
    }

    /* Week
    ---------------------- */
    &__week {
      display: flex;
      font-size: 12px;
      line-height: 12px;
      font-weight: get-font-weight(medium);
      margin: $gutter $gutter*3;
      color: transparentize(black, .62);

      @include mq(tablet) {
        margin: $gutter $gutter*2;
      }

      .datepicker--rtl & {
        direction: rtl;
      }
    }

    &__weekday {
      width: calc((100% / 7) - 0.1px);
      text-align: center;

      @include mq(tablet) {
        width: get-size(desktop, day-width);
      }
    }

    /* Days
    ---------------------- */
    &__days-wrapper {
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

    &__days {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      width: 100%;

      .datepicker--rtl & {
        direction: rtl;
      }
    }

    /* Day
    ---------------------- */
    &__day {
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

        .datepicker__day-effect {
          transform: translateX(-50%) scale(1);
          opacity: .5;
        }
      }

      &.in-range:not(.disabled),
      &.between:not(.disabled) {
        color: white;

        .datepicker__day-effect {
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
          .datepicker__day-effect {
            opacity: 1;
          }
        }

        .datepicker__day-effect {
          transform: translateX(-50%);
          opacity: 1;
        }
      }

      &.first,
      &.select-start:hover:not(.selected) {
        .datepicker__day-effect {
          opacity: 1;

          &:before {
            opacity: .5;
            left: 50%;

            .datepicker--rtl & {
              left: -50%;
            }
          }
        }
      }

      &.last,
      &.select-end:hover:not(.selected) {
        .datepicker__day-effect {
          opacity: 1;

          &:before {
            opacity: .5;
            left: -50%;

            .datepicker--rtl & {
              left: 50%;
            }
          }
        }
      }

      &.first.last {
        .datepicker__day-effect {
          &:before {
            opacity: 0;
          }
        }
      }

      &.disabled {
        cursor: default;
        color: rgba(0,0,0,0.26);

        &:hover {
          .datepicker__day-effect,
          .datepicker__day-effect:before {
            opacity: 0 !important;
          }
        }
      }

      &--current {
        position: absolute;
        top: 1px;
        left: 50%;
        transform: translateX(-50%);
        width: #{get-size(mobile, day-height) - 2};
        height: #{get-size(mobile, day-height) - 2};
        border-radius: 50%;
        border: 1px solid currentColor;

        @include mq(tablet) {
          top: 2px;
          width: 36px;
          height: 36px;
        }
      }

      &-effect {
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
          top: 2px;
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

      &-text {
        position: relative;
        vertical-align: sub;
      }
    }
  }
</style>
