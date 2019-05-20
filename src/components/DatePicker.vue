<template>
  <div
    v-click-outside="hideDatePicker"
    class="datepicker_container">
    <input
      type="hidden"
      :name="name"
      :value="dateRaw">
    <input
      :style="{ color: color }"
      :value="dateFormatted"
      :disabled="disabled"
      type="text"
      readonly
      @click="showDatepicker">
    <DatepickerAgenda
      :isVisible="isVisible"
      :date="date"
      :locale="locale"
      :color="color"
      :close="hideDatePicker"
      :min-date="minDate"
      :end-date="endDate"
      @selectDate="changeDate"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { directive as clickOutside } from 'vue-clickaway';
import DatepickerAgenda from './DatePickerAgenda.vue';
import { getDefaultLocale, setLocaleLang, formatDateWithLocale } from '../utils/Dates';

export default {
  name: 'DatePicker',
  directives: { clickOutside },
  components: { DatepickerAgenda },
  props: {
    name: { type: String, default: 'datepicker' },
    // Current Value from v-model
    value: { type: [String, Number, Date, Object], required: true, default: Date.now() },
    // Input selected date format
    format: { type: String, default: 'DD MMMM YYYY' },
    // Show/hide datepicker
    visible: { type: Boolean, default: false },
    // Sets the locale.
    locale: {
      type: Object,
      default: () => ({
        lang: getDefaultLocale(),
        weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      }),
    },
    // Applies specified color to the control
    color: { type: String, default: '#4f88ff' },
    // Allowed dates
    minDate: { type: [String, Date, Object] },
    endDate: { type: [String, Date, Object] },
    // Disabled all datepicker
    disabled: { type: Boolean, default: false },

    // TODO : Props to add
    // type (date, month or year picker)
  },
  data () {
    return {
      date: dayjs(this.value),
      isVisible: this.visible,
    };
  },
  computed: {
    // Displayed Date
    dateFormatted () {
      return formatDateWithLocale(this.date, this.locale, this.format);
    },
    // Date which will be send
    dateRaw () {
      return formatDateWithLocale(this.date, this.locale, 'YYYY-MM-DD');
    },
  },
  created () {
    setLocaleLang(this.locale);
  },
  methods: {
    showDatepicker () {
      if (this.disabled) return;

      this.isVisible = true;
      setTimeout(() => document.addEventListener('click', this.hideDatePicker), 0);
    },
    hideDatePicker () {
      this.isVisible = false;
      document.removeEventListener('click', this.hideDatePicker);
    },
    changeDate (date) {
      this.date = date;
    },
  },
};
</script>

<style>
  *, ::before, ::after {
    box-sizing: border-box;
  }
</style>

<style lang="scss" scoped>
  .datepicker_container {
    position: relative;
    display: flex;

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

      &:disabled,
      &[disabled] {
        cursor: default;
      }
    }
  }
</style>
