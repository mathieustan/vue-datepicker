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
        v-if="mode === 'month' || mode === 'quarter'"
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

        <template v-if="mode === 'month'">
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
                :disabled="isMonthOrQuarterDisabled(index)"
                :style="{
                  color: isSelectedMonthOrQuarter(index) ? '#fff' : '',
                  backgroundColor: isSelectedMonthOrQuarter(index) ? color : '',
                }"
                type="button"
                @click="onSelect(index)"
              >
              {{ month }}
              </button>
            </div>
          </TransitionGroup>
        </template>

        <template v-if="mode === 'quarter'">
          <TransitionGroup
            tag="div"
            class="datepicker-months__wrapper"
            :name="transitionName">
            <div
              v-for="year in [currentDate.year]"
              :key="year"
              class="datepicker-quarters__list">
              <button
                v-for="(quarter, index) in getQuarters"
                :key="index"
                :disabled="isMonthOrQuarterDisabled(index)"
                :style="{
                  color: isSelectedMonthOrQuarter(index * 3) ? '#fff' : '',
                  backgroundColor: isSelectedMonthOrQuarter(index * 3) ? color : '',
                }"
                type="button"
                @click="onSelect(index)"
              >
              {{ quarter }}
              </button>
            </div>
          </TransitionGroup>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import DatePickerControls from './DatePickerControls.vue';

import {
  formatDateWithYearAndMonth,
  isBeforeMinDate,
  isAfterEndDate,
  areSameDates,
} from '@/utils/Dates';

import { computeYearsScrollPosition } from '@/utils/positions';

export default {
  name: 'DatePickerYearMonth',
  components: { DatePickerControls },
  props: {
    mode: { type: String, default: String },
    currentDate: { type: Object, default: Object },
    mutableDate: { type: Object, default: Object },
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
    getQuarters () {
      return this.currentDate.getQuarters();
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
    isSelectedMonthOrQuarter (monthIndex) {
      const selectedDate = formatDateWithYearAndMonth(this.currentDate.year, monthIndex);
      return areSameDates(
        this.mutableDate.format('YYYY-MM'),
        selectedDate.format('YYYY-MM'),
        this.mode
      );
    },
    isYearDisabled (year) {
      return isBeforeMinDate(year, this.minDate, this.mode) ||
        isAfterEndDate(year, this.endDate, this.mode);
    },
    isMonthOrQuarterDisabled (monthIndex) {
      const date = formatDateWithYearAndMonth(this.yearFormatted, monthIndex);
      return isBeforeMinDate(date, this.minDate, this.mode) ||
        isAfterEndDate(date, this.endDate, this.mode);
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
  @import '@/styles/base/_animations.scss';

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
      font-weight: get-font-weight(normal);
      list-style-type: none;
      overflow-y: scroll; /* has to be scroll, not auto */
      -webkit-overflow-scrolling: touch;
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
            font-weight: get-font-weight(medium);
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

    .datepicker-months__list,
    .datepicker-quarters__list {
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
        justify-content: center;
        align-items: center;
        font-size: 12px;
        padding: 0 20px;
        height: 30px;
        font-size: 15px;
        font-weight: get-font-weight(medium);
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

    .datepicker-quarters__list {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);

      button {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
