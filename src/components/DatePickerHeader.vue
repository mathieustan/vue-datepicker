<template>
  <div
    :style="{ backgroundColor: color }"
    class="datepicker-header">
    <div
      :class="{ 'datepicker-header__year--active' : mode === 'year' }"
      class="datepicker-header__year">
      {{ year }}
    </div>
    <div
      :class="{ 'datepicker-header__date--active' : mode !== 'year' }"
      class="datepicker-header__date">
      {{ dateFormatted }}
    </div>
  </div>
</template>

<script>
import { formatDateWithLocale } from '../utils/Dates';

export default {
  name: 'DatePickerHeader',
  props: {
    color: { type: String },
    mutableDate: { type: [String, Object] },
    locale: { type: Object },
    mode: { type: String },
  },
  computed: {
    year () {
      return formatDateWithLocale(this.mutableDate, this.locale, 'YYYY');
    },
    dateFormatted () {
      return formatDateWithLocale(this.mutableDate, this.locale, 'dddd DD MMM');
    },
  },
};
</script>

<style lang="scss" scoped>
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

    .datepicker-header__date {
      font-size: 28px;
      text-align: left;
      font-weight: 500;
      position: relative;
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
