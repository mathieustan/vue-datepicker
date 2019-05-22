<template>
  <transition name="datepicker-slide" appear>
    <div
      v-if="shouldShowAgenda"
      :style="styles"
      :class="{ 'inline' : inline }"
      class="datepicker"
      name="datepicker-slide"
      @click.stop>

      <!-- Header -->
      <DatePickerHeader
        :mutable-date="mutableDate"
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
              class="datepicker-day"
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
import Dates, { getWeekDays, isDateToday, isBeforeMinDate, isAfterEndDate } from '@/utils/Dates';

import agendaPositionMixin from '@/mixins/agendaPositionMixin';

import DatePickerHeader from './DatePickerHeader.vue';
import DatePickerControls from './DatePickerControls.vue';
import DatePickerYearMonth from './DatePickerYearMonth.vue';

export default {
  name: 'DatepickerAgenda',
  mixins: [ agendaPositionMixin ],
  components: { DatePickerHeader, DatePickerControls, DatePickerYearMonth },
  props: {
    date: { type: [Date, Object], required: true },
    isVisible: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    locale: { type: Object },
    color: { type: String },
    formatHeader: { type: String },
    close: { type: Function },
    minDate: { type: [String, Number, Date] },
    endDate: { type: [String, Number, Date] },
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
    weekDays () {
      return getWeekDays(this.locale);
    },
    classWeeks () {
      // if yearMonth selector is opened, stop changing class
      if (this.shouldShowYearMonthSelector) return;

      if (this.currentDate.getDays().length + this.currentDate.start.weekday() > 35) {
        return `has-6-weeks`;
      }
      return `has-5-weeks`;
    },
    styles () {
      return {
        left: `${this.left}px`,
        top: `${this.top}px`,
        transformOrigin: this.origin,
      };
    },
    shouldShowAgenda () {
      return this.isVisible || this.inline;
    },
  },
  watch: {
    // When date change (after being visibled),
    // should update currentDate & mutableDate
    date (newDate) {
      this.currentDate = new Dates(newDate.month(), newDate.year(), this.locale);
      this.mutableDate = newDate.clone();
    },
    // When agenda should be visible => init currentDate & mutableDate
    // When agenda should be hidden => reset data
    shouldShowAgenda: {
      async handler (show) {
        if (show) {
          // init data when datepicker is visible
          this.currentDate = new Dates(this.date.month(), this.date.year(), this.locale);
          this.mutableDate = this.date.clone();

          // If inline, we don't need to update position
          if (this.inline) return;

          await this.$nextTick();
          // from @/mixins/agendaPositionMixin
          this.updatePosition();
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
      if (mode === 'year') {
        this.currentDate = new Dates(this.currentDate.month, value, this.locale);
        this.yearMonthMode = 'month';
        return;
      }
      this.currentDate = new Dates(value, this.currentDate.year, this.locale);
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
    left: 0;
    top: 100%;
    will-change: transform;
    z-index: 5;
    background-color: white;
    box-shadow: 0 14px 45px rgba(0,0,0,.25), 0 10px 18px rgba(0,0,0,.22);

    &.inline {
      position: relative;
      box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    }
  }

  .datepicker-slide-enter-active,
  .datepicker-slide-leave-active {
    opacity: 1;
    transition: all 300ms;
    transition-property: transform, opacity;
    transform: scale(1);
  }
  .datepicker-slide-leave-to, .datepicker-slide-enter{
    opacity: 0;
    transform: scale(0);
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
    font-weight: 600;
    padding: $gutter 14px;
    color: rgba(0,0,0,0.38);

    .datepicker-weekday {
      float: left;
      width: get-size(day);
      text-align: center;
    }
  }

  // ----------------------
  // Days
  // ----------------------
  .datepicker-days__wrapper {
    position: relative;
    height: get-size(day) * 5;
    margin: 0 14px 14px;
    overflow: hidden;
    transition: height .3s cubic-bezier(0.23, 1, 0.32, 1);

    &.has-6-weeks {
      height: get-size(day) * 6;
    }
  }

  .datepicker-days {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;

    .datepicker-day {
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
        .datepicker-day__effect {
          transform: scale(1);
          opacity: .6;
        }
      }
      &.selected{
        color: white;
        .datepicker-day__effect {
          transform: scale(1);
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

    .datepicker-day__effect {
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
    .datepicker-day__text {
      position: relative;
      vertical-align: sub;
    }
  }
</style>
