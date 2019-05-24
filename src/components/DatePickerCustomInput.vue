<template>
  <div
    class="datepicker-input"
    @mousedown="$emit('toggleDatepicker')">
    <DatePickerCalendarIcon
      :id="id"
      :color="color" />
    <input
      :id="id"
      :name="id"
      :style="{ color: color }"
      :value="dateFormatted"
      :disabled="disabled"
      type="text"
      readonly
      @focus="$emit('focus')"
    >
  </div>
</template>

<script>
import DatePickerCalendarIcon from './DatePickerCalendarIcon.vue';
import { formatDateWithLocale } from '@/utils/Dates';

export default {
  name: 'DatePickerCustomInput',
  components: { DatePickerCalendarIcon },
  props: {
    id: { type: String },
    name: { type: String },
    date: { type: Object },
    format: { type: String },
    locale: { type: Object },
    color: { type: String },
    disabled: { type: Boolean },
  },
  computed: {
    // Displayed Date
    dateFormatted () {
      return formatDateWithLocale(this.date, this.locale, this.format);
    },
  },
};
</script>

<style lang="scss" scoped>
  .datepicker-input {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  input[type='hidden'] {
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 1px;
    width: 1px;
    border: 0;
    clip: rect(0 0 0 0);
    margin: -1px;
    padding: 0;
    outline: 0;
    -webkit-appearance: none;
    overflow: hidden;
  }

  input[type="text"] {
    cursor: pointer;
    border: none;
    box-shadow: none;
    outline: 0;
    font-size: 16px;
    line-height: 19px;
    margin-left: $gutter;

    &:disabled,
    &[disabled] {
      cursor: default;
    }
  }
</style>
