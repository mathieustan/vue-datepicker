<template>
  <transition name="yearMonth" appear>
    <div class="datepicker_year_month">
      <div
        v-if="mode === 'year'"
        class="datepicker_years">
        <ul class="datepicker_years_list">
          <li
            v-for="year in getYears"
            :key="year"
            :class="{ 'active' : isSelectedYear(year) }">
            <button type="button" @click="onSelect(year)">{{ year }}</button>
          </li>
        </ul>
      </div>
      <div
        v-if="mode === 'month'"
        class="datepicker_months">

        <DatePickerControls
          :current-date="currentDate"
          :transition-name="transitionName"
          mode="year"
          @changeVisibleDate="changeYear"
          @showYearMonthSelector="showYearMonthSelector"
        />

        <TransitionGroup
          tag="div"
          class="datepicker_months_wrapper"
          :name="transitionName">
          <div
            v-for="year in [currentDate.year]"
            :key="year"
            class="datepicker_months_list">
            <button
              v-for="(month, index) in getMonths"
              :key="index"
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

import { computeYearsScrollPosition } from '../utils';

export default {
  name: 'DatePickerYearMonth',
  components: { DatePickerControls },
  props: {
    transitionName: { type: String, default: String },
    color: { type: String, default: String },
    mode: { type: String, default: String },
    currentDate: { type: Object, default: Object },
    isVisible: { type: Boolean, default: false },
    showYearMonthSelector: { type: Function },
  },
  computed: {
    yearFormatted () {
      return this.currentDate.getYearFormatted();
    },
    getYears () {
      const year = this.currentDate.year;
      return this.currentDate.generateYearMonthRange(year, 10, 'year');
    },
    getMonths () {
      return this.currentDate.getMonths();
    },
  },
  mounted () {
    const activeItem = this.$el.querySelector('li.active');
    if (!activeItem || this.mode !== 'year') return;

    // should scroll to active year
    const containerToScroll = this.$el.querySelector('.datepicker_years_list');
    containerToScroll.scrollTop = computeYearsScrollPosition(containerToScroll, activeItem);
  },
  methods: {
    isSelectedYear (year) {
      return this.currentDate.year === year;
    },
    isSelectedMonth (monthIndex) {
      return this.currentDate.month === monthIndex;
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

  .datepicker_year_month {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background: white;
    overflow: hidden;
  }

  .datepicker_years {
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

        &.active {
          button {
            font-size: 26px;
            font-weight: 500;
            padding: $gutter 0;
          }
        }

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
      }
    }
  }

  .datepicker_months {
    height: auto;
    overflow: hidden;
    position: relative;
    z-index: 0;
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .datepicker_months_wrapper {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 0 $gutter $gutter;
    }

    .datepicker_months_list {
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
      }
    }
  }
</style>
