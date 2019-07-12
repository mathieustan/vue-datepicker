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
import { isBeforeDate, isAfterDate } from '../../utils/Dates';

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
      return isBeforeDate(this.yearFormatted, this.minDate, 'year') ||
        isAfterDate(this.yearFormatted, this.endDate, 'year');
    },
    isPreviousDateDisabled () {
      if (this.mode !== 'year') return false;
      return isBeforeDate(Number(this.yearFormatted) - 1, this.minDate, 'year');
    },
    isNextDateDisabled () {
      if (this.mode !== 'year') return false;
      return isAfterDate(Number(this.yearFormatted) + 1, this.endDate, 'year');
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
  @import   '../../styles/abstracts/functions',
            '../../styles/abstracts/variables',
            '../../styles/abstracts/mixins',
            '../../styles/base/_animations.scss';

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

    &__wrapper {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }

    &__month,
    &__year {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
    }

    &__month {
      justify-content: flex-end;
    }

    &__year {
      justify-content: flex-start;

      &.datepicker-controls__year--center {
        justify-content: center;
      }
    }

    &__label {
      padding: $gutter $gutter/2;

      button {
        @extend %reset-button;
        position: relative;
        display: flex;
        font-size: 15px;
        font-weight: get-font-weight(medium);
        line-height: 15px;
        padding: 0;
        border: none;
        outline: none;

        &:disabled,
        &[disabled] {
          cursor: default;
          color: rgba(0,0,0,0.26);
        }
      }
    }

    button.datepicker-controls__prev,
    button.datepicker-controls__next {
      position: relative;
      flex: 0 0 40px;
      height: get-size(mobile, controls);
      width: get-size(mobile, controls);
      padding: 0 0 0 $gutter*3;
      border: none;
      outline: none;
      background-color: transparent;
      user-select: none;
      cursor: pointer;

      @include mq(tablet) {
        padding: 0 $gutter 0 $gutter;
        height: get-size(desktop, controls);
        width: get-size(desktop, controls);
      }

      &:disabled,
      &[disabled] {
        svg {
          fill: rgba(0,0,0,0.26);
        }
        cursor: default;
      }
    }

    button.datepicker-controls__next {
      padding: 0 $gutter*3 0 0;

      @include mq(tablet) {
        padding: 0 $gutter 0 $gutter;
      }
    }

    svg {
      width: 24px;
      height: 24px;
      fill: rgba(0, 0, 0, 0.87);
      vertical-align: middle;
    }
  }
</style>

