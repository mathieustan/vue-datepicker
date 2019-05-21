<template>
  <div
    v-click-outside="hideDatePicker"
    class="datepicker-container">
    <DatePickerCustomInput
      :name="name"
      :date="date"
      :format="format"
      :locale="locale"
      :color="color"
      :disabled="disabled"
      @toggleDatepicker="toggleDatepicker"
    />
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
import DatePickerCustomInput from './DatePickerCustomInput.vue';
import DatepickerAgenda from './DatePickerAgenda.vue';
import { getDefaultLocale, setLocaleLang } from '@/utils/Dates';

export default {
  name: 'DatePicker',
  directives: { clickOutside },
  components: { DatePickerCustomInput, DatepickerAgenda },
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
  data: () => ({
    date: undefined,
    isVisible: undefined,
  }),
  watch: {
    value: {
      handler (newDate) {
        this.date = dayjs(newDate);
      },
      immediate: true,
    },
    visible: {
      handler (isVisible) {
        this.isVisible = isVisible;
      },
      immediate: true,
    },
  },
  created () {
    setLocaleLang(this.locale);
  },
  methods: {
    toggleDatepicker () {
      if (this.disabled) return;

      if (this.isVisible) {
        this.hideDatePicker();
        return;
      }

      this.isVisible = true;
      setTimeout(() => document.addEventListener('click', this.hideDatePicker), 0);
    },
    hideDatePicker () {
      this.isVisible = false;
      document.removeEventListener('click', this.hideDatePicker);
    },
    changeDate (date) {
      this.date = date;
      this.$emit('input', this.date);
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
  .datepicker-container {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
</style>
