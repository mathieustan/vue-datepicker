<template>
  <div
    :style="{ backgroundColor: color }"
    class="datepicker-header">
    <div
      :class="{ 'datepicker-header__year--active' : mode === 'year' }"
      class="datepicker-header__year">
      {{ year }}
    </div>
    <div class="datepicker-header__wrap">
      <TransitionGroup
        :name="transitionName"
        :class="{ 'datepicker-header__date--active' : mode !== 'year' }"
        class="datepicker-header__date">
        <span
          v-for="dateFormatted in [dateFormatted]"
          :key="dateFormatted">
          {{ dateFormatted }}
        </span>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import { formatDateWithLocale } from '../utils/Dates';

export default {
  name: 'DatePickerHeader',
  props: {
    mutableDate: { type: [String, Object] },
    transitionName: { type: String },
    color: { type: String },
    locale: { type: Object },
    formatHeader: { type: String },
    mode: { type: String },
  },
  computed: {
    year () {
      return formatDateWithLocale(this.mutableDate, this.locale, 'YYYY');
    },
    dateFormatted () {
      return formatDateWithLocale(this.mutableDate, this.locale, this.formatHeader);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/base/_animations.scss';

  .datepicker-header {
    color: white;
    padding: ($gutter*2);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    line-height: 1;

    .datepicker-header__year {
      align-items: center;
      display: inline-flex;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      opacity: 0.6;
      transition: opacity .3s;

      &.datepicker-header__year--active {
        opacity: 1;
      }
    }

    .datepicker-header__wrap {
      position: relative;
      display: flex;
      width: 100%;
    }

    .datepicker-header__date {
      position: relative;
      display: flex;
      width: 100%;
      font-size: 28px;
      height: calc(28px + #{$gutter});
      text-align: left;
      font-weight: 500;
      overflow: hidden;
      padding-bottom: $gutter;
      margin-bottom: -#{$gutter};
      opacity: 0.6;
      transition: opacity .3s;

      &:hover,
      &.datepicker-header__date--active {
        opacity: 1;
      }
    }
  }
</style>
