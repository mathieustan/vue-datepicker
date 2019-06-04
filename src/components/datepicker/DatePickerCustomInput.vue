<template>
  <div
    :class="{ 'disabled' : disabled }"
    class="datepicker-input"
    @mousedown="$emit('toggleDatepicker')">
    <DatePickerCalendarIcon
      :id="id"
      :color="date && !disabled ? color : 'rgba(0,0,0,0.6)'"
      :disabled="disabled" />
    <input
      :id="id"
      :name="id"
      :style="{ color: !disabled ? color : 'rgba(0,0,0,0.6)' }"
      :value="dateFormatted"
      :disabled="disabled"
      :placeholder="placeholder"
      type="text"
      tabindex="1"
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
    type: { type: String },
    locale: { type: Object },
    placeholder: { type: String },
    color: { type: String },
    disabled: { type: Boolean },
  },
  computed: {
    // Displayed Date
    dateFormatted () {
      if (!this.date) return;
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

    &.disabled {
      cursor: not-allowed;
    }
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

    &:focus,
    &:active {
      outline: 0;
      box-shadow: none;
    }

    &:disabled,
    &[disabled] {
      cursor: not-allowed;
    }

    @include input-placeholder {
      color: transparentize(black, .6)
    }
  }
</style>
