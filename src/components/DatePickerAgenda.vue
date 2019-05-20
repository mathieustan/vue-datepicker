<template>
  <transition name="datepicker-slide" appear>
    <div
      v-if="isVisible"
      class="datepicker"
      name="datepicker-slide"
      @click.stop>

      <!-- Header -->
      <DatePickerHeader
        :mutable-date="mutableDate"
        :color="color"
        :locale="locale"
      />

      <div class="datepicker__content">
        <!-- Controls -->
        <DatePickerControls
          :current-date="currentDate"
          :transition-name="transitionLabelName"
          mode="month"
          @changeVisibleDate="changeMonth"
          @showYearMonthSelector="showYearMonthSelector"
        />

        <!-- Week -->
        <div class="datepicker_week">
          <div
            v-for="(day, index) in locale.weekDays"
            :key="index"
            class="datepicker_weekday">
            {{ day }}
          </div>
        </div>

        <!-- Days -->
        <TransitionGroup
          tag="div"
          class="datepicker_days__wrapper"
          :class="classWeeks"
          :name="transitionDaysName">
          <div
            v-for="dates in [currentDate]"
            :key="dates.month"
            class="datepicker_days">
            <div
              class="datepicker_day"
              :style="{ width: `${currentDate.getWeekStart() * 41}px` }"
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
              class="datepicker_day"
              @click="selectDate(day)"
            >
              <span v-if="isToday(day)" class="datepicker_day--current" />
              <span
                :style="{ backgroundColor: color }"
                class="datepicker_day_effect" />
              <span class="datepicker_day_text">{{day.format('D')}}</span>
            </button>
          </div>
        </TransitionGroup>

        <DatePickerYearMonth
          v-if="shouldShowYearMonthSelector"
          :mode="yearMonthMode"
          :current-date="currentDate"
          :transition-name="transitionDaysName"
          :show-year-month-selector="showYearMonthSelector"
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
import Dates, { isDateToday, isBeforeMinDate, isAfterEndDate } from '../utils/Dates';

import DatePickerHeader from './DatePickerHeader.vue';
import DatePickerControls from './DatePickerControls.vue';
import DatePickerYearMonth from './DatePickerYearMonth.vue';

export default {
  name: 'DatepickerAgenda',
  components: { DatePickerHeader, DatePickerControls, DatePickerYearMonth },
  props: {
    date: { type: [Date, Object], required: true },
    isVisible: { type: Boolean, default: false },
    locale: { type: Object },
    color: { type: String },
    close: { type: Function },
    minDate: { type: [String, Date, Object] },
    endDate: { type: [String, Date, Object] },
  },
  data: () => ({
    currentDate: undefined,
    mutableDate: undefined,
    transitionDaysName: 'slide-h-next',
    transitionLabelName: 'slide-v-next',
    shouldShowYearMonthSelector: false,
    yearMonthMode: undefined,
  }),
  computed: {
    classWeeks () {
      // if yearMonth selector is opened, stop changing class
      if (this.shouldShowYearMonthSelector) return;

      if (this.currentDate.getDays().length + this.currentDate.start.weekday() > 35) {
        return `has-6-weeks`;
      }
      return `has-5-weeks`;
    },
  },
  watch: {
    isVisible: {
      handler (bool) {
        if (bool) {
          // init data when datepicker is visible
          this.currentDate = new Dates(this.date.month(), this.date.year());
          this.mutableDate = this.date.clone();
          return;
        };
        // reset data when datepicker is hidden
        Object.assign(this.$data, this.$options.data());
      },
      immediate: true,
    },
  },
  methods: {
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
      this.mutableDate = day.clone();
      this.$emit('selectDate', this.mutableDate);
      this.close();
    },
    changeMonth (direction) {
      let month = this.currentDate.month + (direction === 'prev' ? -1 : +1);
      let year = this.currentDate.year;
      if (month > 11 || month < 0) {
        year += (direction === 'prev' ? -1 : +1);
        month = (direction === 'prev' ? 11 : 0);
      }
      this.updateTransitions(direction);
      this.currentDate = new Dates(month, year);
    },
    changeYear (direction) {
      let year = this.currentDate.year + (direction === 'prev' ? -1 : +1);
      const month = this.currentDate.month;
      this.updateTransitions(direction);
      this.currentDate = new Dates(month, year);
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
      if (mode === 'year') {
        this.currentDate = new Dates(this.currentDate.month, value);
        this.yearMonthMode = 'month';
        return;
      }
      this.currentDate = new Dates(value, this.currentDate.year);
      this.hideYearMonthSelector();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/base/_animations.scss';

  .datepicker {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 315px;
    top: 100%;
    z-index: 5;
    background-color: white;
    box-shadow: 0 14px 45px rgba(0,0,0,.25), 0 10px 18px rgba(0,0,0,.22);
  }

  .datepicker__content {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  // ----------------------
  // Week
  // ----------------------
  .datepicker_week {
    font-size: 12px;
    line-height: 12px;
    font-weight: 600;
    padding: $gutter 14px;
    color: rgba(0,0,0,0.38);

    .datepicker_weekday {
      float: left;
      width: get-size(day);
      text-align: center;
    }
  }

  // ----------------------
  // Days
  // ----------------------
  .datepicker_days__wrapper {
    position: relative;
    height: get-size(day) * 5;
    margin: 0 14px 14px;
    overflow: hidden;
    transition: height .3s cubic-bezier(0.23, 1, 0.32, 1);

    &.has-6-weeks {
      height: get-size(day) * 6;
    }
  }

  .datepicker_days {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;

    .datepicker_day {
      @include reset-button;
      position: relative;
      width: get-size(day);
      height: get-size(day);
      font-size: 12px;
      line-height: get-size(day);
      float: left;
      text-align: center;
      color: rgba(0,0,0,0.87);
      font-weight: bold;
      cursor: pointer;
      transition: color 450ms cubic-bezier(0.23, 1, 0.32, 1);

      &:hover:not(.disabled) {
        color: white;
        .datepicker_day_effect{
          transform: scale(1);
          opacity: .6;
        }
      }
      &.selected{
        color: white;
        .datepicker_day_effect {
          transform: scale(1);
          opacity: 1;
        }
      }
      &.disabled {
        cursor: default;
        color: rgba(0,0,0,0.26);
      }
    }

    .datepicker_day--current {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid currentColor;
    }

    .datepicker_day_effect {
      position: absolute;
      top: 4px;
      left: 2px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1);
      transition-property: transform;
      transform: scale(0);
    }
    .datepicker_day_text {
      position: relative;
      vertical-align: sub;
    }

  }

  .datepicker-slide-enter-active,
  .datepicker-slide-leave-active{
    opacity: 1;
    transition: all 300ms;
    transition-property: transform, opacity;
    transform: translateY(0);
  }
  .datepicker-slide-leave-to, .datepicker-slide-enter{
    opacity: 0;
    transform: translateY(-15px);
  }
</style>
