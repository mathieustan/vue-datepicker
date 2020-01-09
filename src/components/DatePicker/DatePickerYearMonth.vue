<template>
  <transition name="yearMonth" appear>
    <div class="datepicker-year-month">

      <div
        v-if="mode === 'year'"
        class="datepicker-years"
      >
        <div class="datepicker-years__wrapper">
          <div class="datepicker-years__list">
            <button
              v-for="year in getYears"
              :key="year"
              :disabled="isYearDisabled(year)"
              :style="{
                ...(isSelectedYear(year) && setTextColor('#fff')),
                ...(isSelectedYear(year) && setBackgroundColor(color)),
              }"
              :class="{ 'active': isSelectedYear(year) }"
              type="button"
              @click="onSelect(year)"
            >
            {{ year }}
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="mode === 'month' || mode === 'quarter'"
        class="datepicker-months"
      >
        <DatePickerControls
          :current-date="currentDate"
          :transition-name="transitionName"
          :min-date="minDate"
          :max-date="maxDate"
          :color="color"
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
                  ...(isSelectedMonthOrQuarter(index) && setTextColor('#fff')),
                  ...(isSelectedMonthOrQuarter(index) && setBackgroundColor(color)),
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
                  ...(isSelectedMonthOrQuarter(index*3) && setTextColor('#fff')),
                  ...(isSelectedMonthOrQuarter(index*3) && setBackgroundColor(color)),
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
// mixins
import colorable from '../../mixins/colorable';

// components
import DatePickerControls from './DatePickerControls.vue';

// functions
import {
  formatDateWithYearAndMonth,
  isBeforeDate,
  isAfterDate,
  areSameDates,
} from '../../utils/Dates';

import { computeYearsScrollPosition } from '../../utils/positions';

export default {
  name: 'DatePickerYearMonth',
  mixins: [colorable],
  components: { DatePickerControls },
  props: {
    active: { type: Boolean, default: false },
    color: { type: String, default: String },
    currentDate: { type: Object, default: Object },
    maxDate: { type: [String, Date, Object] },
    minDate: { type: [String, Date, Object] },
    mode: { type: String, default: String },
    mutableDate: { type: Object, default: undefined },
    range: { type: Boolean, default: false },
    showYearMonthSelector: { type: Function },
    transitionName: { type: String, default: String },
    visibleYearsNumber: { type: Number, default: 10 },
  },
  data: () => ({
    activeYear: undefined,
  }),
  computed: {
    yearFormatted () {
      return this.currentDate.getYearFormatted();
    },
    getYears () {
      return this.currentDate.generateYearsRange(this.activeYear, this.visibleYearsNumber, 'year');
    },
    getMonths () {
      return this.currentDate.getMonths();
    },
    getQuarters () {
      return this.currentDate.getQuarters();
    },
    shouldComputeYearPosition () {
      return this.active && this.mode === 'year' && this.visibleYearsNumber;
    },
  },
  watch: {
    shouldComputeYearPosition: {
      handler (value) {
        if (!value) return;
        this.$nextTick(this.computeScrollPosition);
      },
      immediate: true,
    },
  },
  created () {
    this.activeYear = this.currentDate.year;
  },
  methods: {
    isSelectedYear (year) {
      return this.currentDate.year === year;
    },
    isSelectedMonthOrQuarter (monthIndex) {
      if (this.range || !this.mutableDate) return false;
      const selectedDate = formatDateWithYearAndMonth(this.currentDate.year, monthIndex);
      return areSameDates(
        this.mutableDate.format('YYYY-MM'),
        selectedDate.format('YYYY-MM'),
        this.mode
      );
    },
    isYearDisabled (year) {
      return isBeforeDate(year, this.minDate, this.mode) ||
        isAfterDate(year, this.maxDate, this.mode);
    },
    isMonthOrQuarterDisabled (monthIndex) {
      const date = formatDateWithYearAndMonth(this.yearFormatted, monthIndex);
      return isBeforeDate(date, this.minDate, 'month') ||
        isAfterDate(date, this.maxDate, 'month');
    },
    changeYear (direction) {
      this.$emit('changeYear', direction);
    },
    onSelect (value) {
      this.$emit('selectedYearMonth', value, this.mode);
    },
    computeScrollPosition () {
      const activeItem = this.$el.querySelector('button.active');
      if (!activeItem || this.mode !== 'year') return;

      // should scroll to active year
      const containerToScroll = this.$el.querySelector('.datepicker-years__wrapper');
      containerToScroll.scrollTop = computeYearsScrollPosition(containerToScroll, activeItem);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss',
            '../../styles/base/_transitions.scss';

  .datepicker-year-month {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;

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
  }

  .datepicker-years {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    width: 100%;
    z-index: 0;
    overflow: hidden;

    .datepicker--validate & {
      border-bottom: 1px solid color(other, light-gray);
    }

    &__wrapper {
      position: relative;
      display: flex;
      flex: 1 1 auto;
      padding: $gutter;
      overflow-y: scroll; /* has to be scroll, not auto */
      -webkit-overflow-scrolling: touch;
    }

    &__list {
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: fit-content;
      grid-gap: $gutter;
      width: 100%;
      align-items: center;

      button {
        position: relative;
        @extend %reset-button;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        padding: 0 20px;
        height: 40px;
        min-height: 40px;
        width: 100%;
        font-size: 15px;
        font-weight: get-font-weight(medium);
        border-radius: 2px;
        outline: none;
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

      .datepicker--rtl & {
        direction: rtl;
      }

      button {
        position: relative;
        @extend %reset-button;
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
