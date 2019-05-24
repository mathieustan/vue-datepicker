<template>
  <div class="datepicker-controls">
    <button
      :disabled="isPreviousDateDisabled"
      type="button"
      class="datepicker-controls__prev"
      @click="changeVisibleDate('prev')"
    >
      <svg viewBox="0 0 24 24">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
      </svg>
    </button>

    <div class="datepicker-controls__wrapper">
      <TransitionGroup
        v-if="mode === 'month'"
        :name="transitionName"
        tag="span"
        class="datepicker-controls__month">
        <div
          v-for="month in [currentDate.month]"
          :key="month"
          class="datepicker-controls__label">
          <button
            type="button"
            @click="showYearMonthSelector('month')">
            {{ monthFormatted }}
          </button>
        </div>
      </TransitionGroup>
      <TransitionGroup
        :name="transitionName"
        tag="span"
        :class="{ 'datepicker-controls__year--center' : mode === 'year' }"
        class="datepicker-controls__year">
        <div
          v-for="year in [currentDate.year]"
          :key="year"
          class="datepicker-controls__label">
          <button
            :disabled="isYearDisabled"
            type="button"
            @click="showYearMonthSelector('year')">
              {{ yearFormatted }}
            </button>
        </div>
      </TransitionGroup>
    </div>

    <button
      :disabled="isNextDateDisabled"
      type="button"
      class="datepicker-controls__next"
      @click="changeVisibleDate('next')"
    >
      <svg viewBox="0 0 24 24">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
      </svg>
    </button>
  </div>
</template>

<script>
import { isBeforeMinDate, isAfterEndDate } from '@/utils/Dates';

export default {
  name: 'DatePickerControls',
  props: {
    transitionName: { type: String },
    currentDate: { type: Object, required: true },
    mode: { type: String, default: 'month' },
    minDate: { type: [String, Number, Date] },
    endDate: { type: [String, Number, Date] },
  },
  computed: {
    monthFormatted () {
      return this.currentDate.getMonthFormatted();
    },
    yearFormatted () {
      return this.currentDate.getYearFormatted();
    },
    isYearDisabled () {
      return isBeforeMinDate(this.yearFormatted, this.minDate, 'year') ||
        isAfterEndDate(this.yearFormatted, this.endDate, 'year');
    },
    isPreviousDateDisabled () {
      if (this.mode !== 'year') return false;
      return isBeforeMinDate(Number(this.yearFormatted) - 1, this.minDate, 'year');
    },
    isNextDateDisabled () {
      if (this.mode !== 'year') return false;
      return isAfterEndDate(Number(this.yearFormatted) + 1, this.endDate, 'year');
    },
  },
  methods: {
    changeVisibleDate (direction) {
      this.$emit('changeVisibleDate', direction);
    },
    showYearMonthSelector (mode) {
      this.$emit('showYearMonthSelector', mode);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/base/_animations.scss';

  .datepicker-controls {
    position: relative;
    display: flex;
    height: get-size(mobile, controls);
    text-align: center;
    position: relative;
    width: 100%;

    @include mq(tablet) {
      height: get-size(desktop, controls);
    }

    .datepicker-controls__wrapper {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;

      .datepicker-controls__month,
      .datepicker-controls__year {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
      }

      .datepicker-controls__month {
        justify-content: flex-end;
      }
      .datepicker-controls__year {
        justify-content: flex-start;

        &.datepicker-controls__year--center {
          justify-content: center;
        }
      }

      .datepicker-controls__label {
        padding: $gutter $gutter/2;

        button {
          @include reset-button;
          position: relative;
          display: flex;
          font-size: 15px;
          font-weight: 500;
          line-height: 15px;
          padding: 0;
          border: none;
          outline: none;
          cursor: pointer;

          &:disabled,
          &[disabled] {
            cursor: default;
            color: rgba(0,0,0,0.26);
          }
        }
      }
    }

    button.datepicker-controls__prev,
    button.datepicker-controls__next {
      height: get-size(mobile, controls);
      width: get-size(mobile, controls);
      position: relative;
      border: none;
      outline: none;
      background-color: transparent;
      user-select: none;
      cursor: pointer;

      @include mq(tablet) {
        height: get-size(desktop, controls);
        width: get-size(desktop, controls);
      }

      &.datepicker-controls__next {
        flex: 0 0 40px;
      }
      &.datepicker-controls__prev {
        flex: 0 0 40px;
      }
      &:disabled,
      &[disabled] {
        svg {
          fill: rgba(0,0,0,0.26);
        }
        cursor: default;
      }
    }

    svg{
      width: 24px;
      height: 24px;
      fill: rgba(0, 0, 0, 0.87);
      vertical-align: middle;
    }
  }
</style>

