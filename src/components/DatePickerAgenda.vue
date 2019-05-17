<template>
  <transition name="datepicker-slide">
    <div
      v-if="isVisible"
      class="datepicker"
      name="datepicker-slide"
      @click.stop>

      <!-- Header -->
      <div
        :style="{ backgroundColor: color }"
        class="datepicker_header">
        <div class="datepicker_year">{{ year }}</div>
        <div class="datepicker_date">{{ dateFormatted }}</div>
      </div>

      <!-- Controls -->
      <div class="datepicker_controls">
        <button class="datepicker_controls_prev" @click="prevMonth">
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </svg>
        </button>
        <div class="datepicker_controls_container">
          <TransitionGroup
            :name="transitionLabelName"
            tag="span"
            class="datepicker_controls_month">
            <div
              v-for="dates in [currentDate]"
              :key="dates.month"
              class="datepicker_controls_label">
              {{ monthFormatted }}
            </div>
          </TransitionGroup>
          <TransitionGroup
            :name="transitionLabelName"
            tag="span"
            class="datepicker_controls_year">
            <div
              v-for="year in [currentDate.year]"
              :key="year"
              class="datepicker_controls_label">
              {{ yearFormatted }}
            </div>
          </TransitionGroup>
        </div>
        <button class="datepicker_controls_next" @click="nextMonth">
          <svg viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </button>
      </div>

      <!-- Week -->
      <div class="datepicker_week">
        <div
          v-for="(day, index) in locale.days"
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
          <div
            v-for="(day, index) in currentDate.getDays()"
            :key="index"
            :class="{selected : isSelected(day)}"
            class="datepicker_day"
            @click="selectDate(day)"
          >
            <span v-if="isToday(day)" class="datepicker_day--current" />
            <span
              :style="{ backgroundColor: color }"
              class="datepicker_day_effect" />
            <span class="datepicker_day_text">{{day.format('D')}}</span>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </transition>
</template>

<script>
import dayjs from 'dayjs';
import Dates from '../utils/Dates';

export default {
  name: 'DatepickerAgenda',
  props: {
    date: { type: [Date, Object], required: true },
    isVisible: { type: Boolean, default: false },
    locale: { type: Object },
    color: { type: String },
    close: { type: Function },
  },
  data () {
    return {
      currentDate: new Dates(this.date.month(), this.date.year()),
      mutableDate: this.date.clone(),
      transitionDaysName: 'slide-h-next',
      transitionLabelName: 'slide-v-next',
    };
  },
  computed: {
    year () {
      return this.mutableDate.format('YYYY');
    },
    dateFormatted () {
      return this.mutableDate.format('dddd DD MMM');
    },
    monthFormatted () {
      return this.currentDate.getMonthFormatted();
    },
    yearFormatted () {
      return this.currentDate.getYearFormatted();
    },
    classWeeks () {
      if (this.currentDate.getDays().length + this.currentDate.start.weekday() > 35) {
        return `has-6-weeks`;
      }
      return `has-5-weeks`;
    },
  },
  methods: {
    isSelected (day) {
      return this.mutableDate.unix() === day.unix();
    },
    isToday (day) {
      return dayjs(day.format('YYYY-MM-DD')).isSame(dayjs().format('YYYY-MM-DD'));
    },
    selectDate (day) {
      this.mutableDate = day.clone();
      this.$emit('selectDate', this.mutableDate);
      this.close();
    },
    nextMonth () {
      let month = this.currentDate.month + 1;
      let year = this.currentDate.year;
      if (month > 11) {
        month = 0;
        year += 1;
      }
      this.transitionDaysName = 'slide-h-next';
      this.transitionLabelName = 'slide-v-next';
      this.currentDate = new Dates(month, year);
    },
    prevMonth () {
      let month = this.currentDate.month - 1;
      let year = this.currentDate.year;
      if (month < 0) {
        month = 11;
        year -= 1;
      }
      this.transitionDaysName = 'slide-h-prev';
      this.transitionLabelName = 'slide-v-prev';
      this.currentDate = new Dates(month, year);
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

  // ----------------------
  // Header
  // ----------------------
  .datepicker_header{
    color: white;
    padding: ($gutter*2);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    line-height: 1;

    .datepicker_year {
      align-items: center;
      display: inline-flex;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .datepicker_date {
      font-size: 28px;
      text-align: left;
      font-weight: 500;
      position: relative;
      overflow: hidden;
      padding-bottom: $gutter;
      margin-bottom: -#{$gutter};
      opacity: 0.6;
      transition: opacity .3s;

      &:hover {
        opacity: 1;
      }
    }
  }

  // ----------------------
  // Controls
  // ----------------------
  .datepicker_controls {
    position: relative;
    display: flex;
    height: get-size(controls);
    text-align: center;
    position: relative;

    .datepicker_controls_container {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;

      .datepicker_controls_month,
      .datepicker_controls_year {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
      }

      .datepicker_controls_month {
        justify-content: flex-end;
      }
      .datepicker_controls_year {
        justify-content: flex-start;
      }

      .datepicker_controls_label {
        padding: $gutter $gutter/2;
      }
    }

    button {
      height: get-size(controls);
      width: get-size(controls);
      position: relative;
      border: none;
      outline: none;
      background-color: transparent;
      user-select: none;
      cursor: pointer;

      &.datepicker_controls_next {
        flex: 0 0 40px;
      }
      &.datepicker_controls_prev {
        flex: 0 0 40px;
      }
    }

    svg{
      width: 24px;
      height: 24px;
      fill: rgba(0, 0, 0, 0.87);
      vertical-align: middle;
    }
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

      &:hover{
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
