<template>
  <div class="datepicker_controls">
    <button
      type="button"
      class="datepicker_controls_prev"
      @click="changeMonth('prev')"
    >
      <svg viewBox="0 0 24 24">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
      </svg>
    </button>

    <div class="datepicker_controls_container">
      <TransitionGroup
        v-if="mode === 'month'"
        :name="transitionName"
        tag="span"
        class="datepicker_controls_month">
        <div
          v-for="month in [currentDate.month]"
          :key="month"
          class="datepicker_controls_label">
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
        :class="{ 'datepicker_controls_year--center' : mode === 'year' }"
        class="datepicker_controls_year">
        <div
          v-for="year in [currentDate.year]"
          :key="year"
          class="datepicker_controls_label">
          <button
            type="button"
            @click="showYearMonthSelector('year')">
              {{ yearFormatted }}
            </button>
        </div>
      </TransitionGroup>
    </div>

    <button
      type="button"
      class="datepicker_controls_next"
      @click="changeMonth('next')"
    >
      <svg viewBox="0 0 24 24">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'DatePickerControls',
  props: {
    transitionName: { type: String },
    currentDate: { type: Object, required: true },
    mode: { type: String, default: 'month' },
  },
  computed: {
    monthFormatted () {
      return this.currentDate.getMonthFormatted();
    },
    yearFormatted () {
      return this.currentDate.getYearFormatted();
    },
  },
  methods: {
    changeMonth (direction) {
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

  .datepicker_controls {
    position: relative;
    display: flex;
    height: get-size(controls);
    text-align: center;
    position: relative;
    width: 100%;

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

        &.datepicker_controls_year--center {
          justify-content: center;
        }
      }

      .datepicker_controls_label {
        padding: $gutter $gutter/2;

        button {
          position: relative;
          display: flex;
          font-size: 15px;
          line-height: 15px;
          padding: 0;
          border: none;
          outline: none;
          cursor: pointer;
        }
      }
    }

    button.datepicker_controls_prev,
    button.datepicker_controls_next {
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
</style>

