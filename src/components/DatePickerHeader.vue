<template>
  <div
    :style="{ backgroundColor: color }"
    class="datepicker_header">
    <div class="datepicker_year">{{ year }}</div>
    <div class="datepicker_date">{{ dateFormatted }}</div>
  </div>
</template>

<script>
export default {
  name: 'DatePickerHeader',
  props: {
    color: { type: String },
    mutableDate: { type: [String, Object] },
  },
  computed: {
    year () {
      return this.mutableDate.format('YYYY');
    },
    dateFormatted () {
      return this.mutableDate.format('dddd DD MMM');
    },
  },
};
</script>

<style lang="scss" scoped>
  .datepicker_header{
    color: white;
    padding: ($gutter*2);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    line-height: 1;

    .datepicker_year {
      align-items: center;
      display: inline-flex;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .datepicker_date {
      font-size: 28px;
      text-align: left;
      font-weight: 500;
      position: relative;
      overflow: hidden;
      padding-bottom: $gutter;
      margin-bottom: -#{$gutter};
      opacity: 0.6;
      transition: opacity .3s;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
