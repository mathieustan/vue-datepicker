<template>
  <div
    :class="classes"
    class="datepicker-input"
    @mousedown="$emit('toggleDatepicker')">
    <DatePickerCalendarIcon
      :id="id"
      :color="date && !disabled ? color : 'rgba(93, 106, 137, 0.5)'"
      :disabled="disabled" />
    <input
      :id="id"
      :name="id"
      :style="{ color: !disabled ? color : 'rgba(93, 106, 137, 0.5)' }"
      :value="dateFormatted"
      :disabled="disabled"
      :placeholder="placeholder"
      :tabindex="tabindex"
      type="text"
      readonly
      @focus="$emit('focus')"
    >
  </div>
</template>

<script>
import DatePickerCalendarIcon from './DatePickerCalendarIcon.vue';
import { formatDateWithLocale, getRangeDatesFormatted } from '../../utils/Dates';

export default {
  name: 'DatePickerCustomInput',
  components: { DatePickerCalendarIcon },
  props: {
    id: { type: String },
    name: { type: String },
    date: { type: Object },
    format: { type: String },
    type: { type: String },
    range: { type: Boolean },
    locale: { type: Object },
    placeholder: { type: String },
    color: { type: String },
    disabled: { type: Boolean },
    tabindex: { type: [String, Number] },
  },
  computed: {
    classes () {
      return {
        'datepicker-input--disabled': this.disabled,
        'datepicker-input--range': this.range,
      };
    },
    // Displayed Date
    dateFormatted () {
      if (!this.date) return;
      if (this.range) {
        return getRangeDatesFormatted(this.date, this.locale, this.format);
      }
      return formatDateWithLocale(this.date, this.locale, this.format);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/variables',
            '../../styles/abstracts/mixins';

  .datepicker-input {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    &--disabled {
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

    .datepicker-input--range & {
      min-width: 280px;
    }
  }
</style>
