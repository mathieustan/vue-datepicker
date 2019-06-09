<template>
  <transition name="datepicker-slide" appear @after-enter="setActive">
    <div
      v-click-outside="{ handler : () => $emit('hide'), isActive: !inline && isActive }"
      v-if="shouldShowAgenda"
      ref="content"
      :style="styles"
      :class="{
        'inline' : inline,
        'bottom-sheet': fullscreenMobile,
      }"
      class="datepicker"
      name="datepicker-slide"
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
            <path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
          </svg>
        </button>
      </div>

      <!-- Header -->
      <DatePickerHeader
        :mutable-date="mutableDate"
        :transition-name="transitionLabelName"
        :color="color"
        :locale="locale"
        :format-header="formatHeader"
        :mode="yearMonthMode"
      />

      <div class="datepicker-content">
        <!-- Controls -->
        <DatePickerControls
          :current-date="currentDate"
          :transition-name="transitionLabelName"
          :locale="locale"
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
                'disabled': isDisabled(day),
              }"
              :disabled="isDisabled(day)"
              type="button"
              class="datepicker-day"
              @click="selectDate(day)"
            >
              <span v-if="isToday(day)" class="datepicker-day--current" />
              <span
                :style="{ backgroundColor: color }"
                class="datepicker-day__effect" />
              <span class="datepicker-day__text">{{day.format('D')}}</span>
            </button>
          </div>
        </TransitionGroup>

        <DatePickerYearMonth
          v-if="shouldShowYearMonthSelector"
          :mode="yearMonthMode"
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
    </div>
  </transition>
</template>

<script>
import Dates, {
  getWeekDays,
  formatDateWithYearAndMonth,
  isDateToday,
  isBeforeMinDate,
  isAfterEndDate,
  isDateAfter,
  generateMonthAndYear,
  convertMonthToQuarter,
} from '@/utils/Dates';
import { yearMonthSelectorTypes } from '@/constants';

import { directive as clickOutside } from 'v-click-outside';

import dynamicPosition from '@/mixins/dynamicPosition';
import detachable from '@/mixins/detachable';

import DatePickerHeader from './DatePickerHeader.vue';
import DatePickerControls from './DatePickerControls.vue';
import DatePickerYearMonth from './DatePickerYearMonth.vue';

export default {
  name: 'DatepickerAgenda',
  mixins: [ detachable, dynamicPosition ],
  directives: { clickOutside },
  components: { DatePickerHeader, DatePickerControls, DatePickerYearMonth },
  props: {
    name: { type: String },
    date: { type: [Date, Object], required: true },
    isVisible: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    fullscreenMobile: { type: Boolean, default: false },
    locale: { type: Object },
    color: { type: String },
    formatHeader: { type: String },
    close: { type: Function },
    minDate: { type: [String, Number, Date] },
    endDate: { type: [String, Number, Date] },
    type: { type: String },
  },
  data: () => ({
    isActive: false,
    currentDate: undefined,
    mutableDate: undefined,
    transitionDaysName: 'slide-h-next',
    transitionLabelName: 'slide-v-next',
    shouldShowYearMonthSelector: undefined,
    yearMonthMode: undefined,
  }),
  computed: {
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
  },
  methods: {
    setActive () {
      this.isActive = true;
    },
    isSelected (day) {
      return this.mutableDate.unix() === day.unix();
    },
    isDisabled (day) {
      return isBeforeMinDate(day, this.minDate) || isAfterEndDate(day, this.endDate);
    },
    isToday (day) {
      return isDateToday(day);
    },
    selectDate (day) {
      const direction = isDateAfter(day, this.mutableDate) ? 'next' : 'prev';
      this.updateTransitions(direction);

      this.mutableDate = day.clone();
      this.$emit('selectDate', this.mutableDate);
      this.close();
    },
    updateDate (date) {
      const month = this.type === 'quarter' ? convertMonthToQuarter(date.month()) : date.month();
      this.currentDate = new Dates(month, date.year(), this.locale);
      this.mutableDate = date.month(month).clone();
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
  },
};
</script>

<style lang="scss" scoped>
  @import '@/styles/base/_animations.scss';

  .datepicker {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: get-size(mobile, width);
    left: 0;
    top: 100%;
    will-change: transform;
    z-index: 5;
    background-color: white;
    box-shadow: 0 14px 45px rgba(0,0,0,.25), 0 10px 18px rgba(0,0,0,.22);
    z-index: 2;

    &:focus,
    &:active {
      outline: 0;
    }

    @include mq(tablet) {
      width: get-size(desktop, width);
    }

    &.datepicker-slide-enter-active,
    &.datepicker-slide-leave-active {
      opacity: 1;
      transition: all 300ms;
      transition-property: transform, opacity;
      transform: scale(1);
    }
    &.datepicker-slide-leave-to, &.datepicker-slide-enter{
      opacity: 0;
      transform: scale(0);
    }

    &.inline {
      position: relative;
      box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
        0px 2px 2px 0px rgba(0,0,0,0.14),
        0px 1px 5px 0px rgba(0,0,0,0.12);
      z-index: 1;
    }

    &.bottom-sheet {
      $height: get-size(mobile, title) +
        get-size(mobile, header) +
        get-size(mobile, controls) +
        (get-size(mobile, day-height) * 6) +
        30px;
      @include mq($to: phone) {
        position: fixed;
        top: auto !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: $height;
        width: 100%;
        border-radius: 12px 12px 0 0;
        z-index: 4;

        &.datepicker-slide-enter-active,
        &.datepicker-slide-leave-active {
          opacity: 1;
          transition: all 300ms;
          transition-property: transform, opacity;
          transform: translateY(0);
        }
        &.datepicker-slide-leave-to, &.datepicker-slide-enter{
          opacity: 0;
          transform: translateY(100%);
        }

        // CF https://medium.com/@draganeror/iphone-x-layout-features-with-css-environment-variables-d57423433dec
        // Browsers which partially support CSS Environment variables (iOS 11.0-11.2).
        @supports (padding-bottom: constant(safe-area-inset-bottom)) {
          --safe-area-inset-bottom: constant(safe-area-inset-bottom);
          height: calc(#{$height} + var(--safe-area-inset-bottom));
        }

        // Browsers which fully support CSS Environment variables (iOS 11.2+).
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          --safe-area-inset-bottom: env(safe-area-inset-bottom);
          height: calc(#{$height} + var(--safe-area-inset-bottom));
        }
      }
    }
  }

  // ----------------------
  // Title
  // ----------------------
  .datepicker-title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: get-size(mobile, title);
    padding: 0 $gutter*2;
    border-radius: 12px 12px 0 0;

    @include mq(phone) {
      display: none;
    }

    p {
      margin: 0;
    }

    button {
      @include reset-button;
      width: 24px;
      height: 24px;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  .datepicker-content {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  // ----------------------
  // Week
  // ----------------------
  .datepicker-week {
    font-size: 12px;
    line-height: 12px;
    font-weight: get-font-weight(medium);
    padding: $gutter 12px;
    color: rgba(0,0,0,0.38);

    @include mq(tablet) {
      padding: $gutter 14px;
    }

    .datepicker-weekday {
      float: left;
      width: calc(100% / 7);
      text-align: center;

      @include mq(tablet) {
        width: get-size(desktop, day-width);
      }
    }
  }

  // ----------------------
  // Days
  // ----------------------
  .datepicker-days__wrapper {
    position: relative;
    height: get-size(mobile, day-height) * 5;
    margin: 0 12px 12px;
    overflow: hidden;
    transition: height .3s cubic-bezier(0.23, 1, 0.32, 1);

    @include mq(tablet) {
      margin: 0 14px 14px;
      height: get-size(desktop, day-height) * 5;
    }

    &.has-6-weeks {
      height: get-size(mobile, day-height) * 6;

      @include mq(tablet) {
        height: get-size(desktop, day-height) * 6;
      }
    }
  }

  .datepicker-days {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;

    .datepicker-day {
      @include reset-button;
      position: relative;
      width: calc(100% / 7);
      height: get-size(mobile, day-height);
      line-height: 1;
      font-size: 12px;
      float: left;
      text-align: center;
      color: rgba(0,0,0,0.87);
      font-weight: get-font-weight(medium);
      cursor: pointer;
      transition: color 450ms cubic-bezier(0.23, 1, 0.32, 1);

      @include mq(tablet) {
        width: calc(100% / 7);
        height: get-size(desktop, day-height);
      }

      &:hover:not(.disabled) {
        color: white;

        .datepicker-day__effect {
          transform: translateX(-50%) scale(1);
          opacity: .6;
        }
      }
      &.selected{
        color: white;
        .datepicker-day__effect {
          transform: translateX(-50%) scale(1);
          opacity: 1;
        }
      }
      &.disabled {
        cursor: default;
        color: rgba(0,0,0,0.26);
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
      transition-property: transform;
      transform: translateX(-50%) scale(0);

      @include mq(tablet) {
        top: 4px;
        width: 36px;
        height: 36px;
      }
    }
    .datepicker-day__text {
      position: relative;
      vertical-align: sub;
    }
  }
</style>
