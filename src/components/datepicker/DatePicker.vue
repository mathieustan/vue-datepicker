<template>
  <div
    :class="{ 'datepicker-container--active' : isVisible }"
    class="datepicker-container">
    <DatePickerCustomInput
      v-if="!inline"
      :id="componentId"
      :name="name"
      :date="value ? date : value"
      :format="inputFormat"
      :type="type"
      :locale="locale"
      :placeholder="placeholder"
      :color="color"
      :disabled="disabled"
      :tabindex="tabindex"
      @toggleDatepicker="toggleDatepicker"
      @focus="showDatePicker"
    />
    <DatePickerOverlay
      :isVisible="isVisible"
      :fullscreen-mobile="fullscreenMobile"
      :attach-to="attachTo"
      @close="hideDatePicker"
    />
    <DatepickerAgenda
      :name="name"
      :isVisible="isVisible"
      :inline="inline"
      :fullscreen-mobile="fullscreenMobile"
      :date="date"
      :locale="locale"
      :format-header="headerFormat"
      :color="color"
      :close="hideDatePicker"
      :min-date="minDate"
      :end-date="endDate"
      :type="type"
      :attach-to="attachTo"
      @selectDate="changeDate"
      @close="hideDatePicker"
      @hide="hideDatePicker"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import DatePickerCustomInput from './DatePickerCustomInput.vue';
import DatePickerOverlay from './DatePickerOverlay.vue';
import DatepickerAgenda from './DatePickerAgenda.vue';
import { generateRandomId } from '@/utils/helpers';
import {
  getDefaultLocale,
  setLocaleLang,
  getDefaultInputFormat,
  getDefaultHeaderFormat,
  getDefaultOutputFormat,
} from '@/utils/Dates';

export default {
  name: 'DatePicker',
  components: { DatePickerCustomInput, DatePickerOverlay, DatepickerAgenda },
  props: {
    id: { type: String, default: 'datepicker' },
    name: { type: String, default: 'datepicker' },
    // type (date, month, quarter or year picker)
    type: { type: String, default: 'date' },
    // Current Value from v-model
    value: { type: [String, Number, Date] },
    // Format
    format: { type: String, default: undefined },
    formatHeader: { type: String, default: undefined },
    formatOutput: { type: String, default: undefined },
    // Show/hide datepicker
    visible: { type: Boolean, default: false },
    // Sets the locale.
    locale: {
      type: Object,
      default: () => ({ lang: getDefaultLocale() }),
    },
    placeholder: { type: String, default: 'YYYY-MM-DD' },
    // Applies specified color to the control
    color: { type: String, default: '#4f88ff' },
    // Allowed dates
    minDate: { type: [String, Number, Date] },
    endDate: { type: [String, Number, Date] },
    // Disabled all datepicker
    disabled: { type: Boolean, default: false },
    // Inline
    inline: { type: Boolean, default: false },
    // Responsive bottom sheet
    fullscreenMobile: { type: Boolean, default: false },
    // tabindex
    tabindex: { type: [String, Number], default: '0' },
    // attachTo
    attachTo: { type: String, default: '#app' },
  },
  data: () => ({
    date: undefined,
    isVisible: undefined,
  }),
  computed: {
    // use a computed to have a dynamicId for each instance
    componentId () {
      return `${this.id}${generateRandomId()}`;
    },
    // If format isnt specificed, select default format from type
    inputFormat () {
      if (!this.format) return getDefaultInputFormat(this.type);
      return this.format;
    },
    headerFormat () {
      if (!this.formatHeader) return getDefaultHeaderFormat(this.type);
      return this.formatHeader;
    },
    outputFormat () {
      if (!this.formatOutput) return getDefaultOutputFormat(this.type);
      return this.formatOutput;
    },
  },
  watch: {
    value: {
      handler (newDate = Date.now()) {
        this.date = dayjs(newDate, this.outputFormat);
      },
      immediate: true,
    },
    visible: {
      handler (isVisible) {
        this.isVisible = isVisible;
      },
      immediate: true,
    },
    locale: {
      handler (newLocale) {
        setLocaleLang(newLocale);
      },
      immediate: true,
    },
  },
  beforeDestroy () {
    this.$emit('onDestroy');
  },
  methods: {
    toggleDatepicker () {
      if (this.isVisible) {
        this.hideDatePicker();
        return;
      }
      this.showDatePicker();
    },
    showDatePicker () {
      if (this.disabled) return;
      this.isVisible = true;
      this.$emit('onOpen');
    },
    hideDatePicker () {
      if (!this.isVisible) return;
      this.isVisible = false;
      clearAllBodyScrollLocks();
      this.$emit('onClose');
    },
    changeDate (date) {
      this.date = date;
      this.$emit('input', this.date.format(this.outputFormat));
      this.$emit('onChange');
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
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    &:focus,
    &:active {
      outline: 0;
    }
  }
</style>
