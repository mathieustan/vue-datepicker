<template>
  <transition name="yearMonth" appear>
    <div class="datepicker-year-month">
      <div
        v-if="mode === 'year'"
        class="datepicker-years">
        <ul class="datepicker-years__list">
          <li
            v-for="year in getYears"
            :key="year"
            :class="{
              'active' : isSelectedYear(year),
              'disabled' : isYearDisabled(year)
            }">
            <button
              :disabled="isYearDisabled(year)"
              type="button"
              @click="onSelect(year)">
              {{ year }}
            </button>
          </li>
        </ul>
      </div>
      <div
        v-if="mode === 'month'"
        class="datepicker-months">

        <DatePickerControls
          :current-date="currentDate"
          :transition-name="transitionName"
          :min-date="minDate"
          :end-date="endDate"
          mode="year"
          @changeVisibleDate="changeYear"
          @showYearMonthSelector="showYearMonthSelector"
        />

        <TransitionGroup
          tag="div"
          class="datepicker-months__wrapper"
          :name="transitionName">
          <div
            v-for="year in [currentDate.year]"
            :key="year"
            class="datepicker-months__list">
            <button
              v-for="(month, index) in getMonths"
              :key="index"
              :disabled="isMonthDisabled(index)"
              :style="{
                color: isSelectedMonth(index) ? '#fff' : '',
                backgroundColor: isSelectedMonth(index) ? color : '',
              }"
              type="button"
              @click="onSelect(index)"
            >
            {{ month }}
            </button>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </transition>
</template>

<script>
import DatePickerControls from './DatePickerControls.vue';

import { isBeforeMinDate, isAfterEndDate, initDateWithMonthAndYear } from '@/utils/Dates';
import { computeYearsScrollPosition } from '../utils';

export default {
  name: 'DatePickerYearMonth',
  components: { DatePickerControls },
  props: {
    mode: { type: String, default: String },
    currentDate: { type: Object, default: Object },
    transitionName: { type: String, default: String },
    showYearMonthSelector: { type: Function },
    color: { type: String, default: String },
    minDate: { type: [String, Date, Object] },
    endDate: { type: [String, Date, Object] },
  },
  computed: {
    yearFormatted () {
      return this.currentDate.getYearFormatted();
    },
    getYears () {
      const year = this.currentDate.year;
      return this.currentDate.generateYearsRange(year, 10, 'year');
    },
    getMonths () {
      return this.currentDate.getMonths();
    },
  },
  watch: {
    async mode (currentMode) {
      await this.$nextTick();
      const activeItem = this.$el.querySelector('li.active');
      if (!activeItem || currentMode !== 'year') return;

      // should scroll to active year
      const containerToScroll = this.$el.querySelector('.datepicker-years__list');
      containerToScroll.scrollTop = computeYearsScrollPosition(containerToScroll, activeItem);
    },
  },
  mounted () {
    const activeItem = this.$el.querySelector('li.active');
    if (!activeItem || this.mode !== 'year') return;

    // should scroll to active year
    const containerToScroll = this.$el.querySelector('.datepicker-years__list');
    containerToScroll.scrollTop = computeYearsScrollPosition(containerToScroll, activeItem);
  },
  methods: {
    isSelectedYear (year) {
      return this.currentDate.year === year;
    },
    isSelectedMonth (monthIndex) {
      return this.currentDate.month === monthIndex;
    },
    isYearDisabled (year) {
      return isBeforeMinDate(year, this.minDate, 'year') ||
        isAfterEndDate(year, this.endDate, 'year');
    },
    isMonthDisabled (monthIndex) {
      const date = initDateWithMonthAndYear(monthIndex, this.yearFormatted);
      return isBeforeMinDate(date, this.minDate) ||
        isAfterEndDate(date, this.endDate);
    },
    changeYear (direction) {
      this.$emit('changeYear', direction);
    },
    onSelect (value) {
      this.$emit('selectedYearMonth', value, this.mode);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/base/_animations.scss';

  .datepicker-year-month {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background: white;
    overflow: hidden;
  }

  .datepicker-years {
    height: auto;
    overflow: hidden;
    position: relative;
    z-index: 0;
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    ul {
      width: 100%;
      font-size: 16px;
      font-weight: 400;
      list-style-type: none;
      overflow: auto;
      padding: 0;
      margin: 0;
      text-align: center;

      li {
        cursor: pointer;
        transition: none;

        &:hover,
        &:focus {
          background-color: color(other, light-gray);
        }

        button {
          position: relative;
          @include reset-button;
          width: 100%;
          padding: $gutter 0;
          cursor: pointer;
        }

        &.active {
          button {
            font-size: 26px;
            font-weight: 500;
            padding: $gutter 0;
          }
        }

        &.disabled {
          button {
            cursor: default;
            color: rgba(0,0,0,0.26);
          }
        }
      }
    }
  }

  .datepicker-months {
    height: auto;
    overflow: hidden;
    position: relative;
    z-index: 0;
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .datepicker-months__wrapper {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 0 $gutter $gutter;
    }

    .datepicker-months__list {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, 1fr);
      grid-gap: $gutter;
      width: 100%;
      height: 100%;
      justify-items: center;
      align-items: center;

      button {
        position: relative;
        @include reset-button;
        display: flex;
        font-size: 12px;
        padding: 0 20px;
        height: 30px;
        font-size: 15px;
        font-weight: 500;
        border-radius: 2px;
        outline: none;
        cursor: pointer;
        transition: background-color .3s;

        &:hover {
          background-color: color(other, light-gray);
        }

        &:disabled,
        &[disabled] {
          cursor: default;
          color: rgba(0,0,0,0.26);
        }

        .datepicker-month--current {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 100%;
          height: 30px;
          background-color: currentColor;
        }
      }
    }
  }
</style>
