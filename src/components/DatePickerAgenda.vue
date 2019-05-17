<template>
  <transition name="datepicker-slide">
    <div
      v-if="isVisible"
      class="datepicker"
      name="datepicker-slide"
      @click.stop>

      <!-- Header -->
      <DatePickerHeader
        :mutable-date="mutableDate"
        :color="color"
      />

      <!-- Controls -->
      <DatePickerControls
        :current-date="currentDate"
        :transition-name="transitionLabelName"
        @changeMonth="changeMonth"
      />

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

import DatePickerHeader from './DatePickerHeader.vue';
import DatePickerControls from './DatePickerControls.vue';

export default {
  name: 'DatepickerAgenda',
  components: { DatePickerHeader, DatePickerControls },
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
    changeMonth (direction) {
      let month = this.currentDate.month + (direction === 'prev' ? -1 : +1);
      let year = this.currentDate.year;
      if (month > 11 || month < 0) {
        year += (direction === 'prev' ? -1 : +1);
        month = (direction === 'prev' ? 11 : 0);
      }
      this.transitionDaysName = `slide-h-${direction}`;
      this.transitionLabelName = `slide-v-${direction}`;
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
