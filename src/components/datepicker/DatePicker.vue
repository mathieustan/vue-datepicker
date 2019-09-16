<template>
  <div
    :class="{
      'datepicker-container--active': isVisible,
      'datepicker-container--rtl': rtl,
    }"
    class="datepicker-container">
    <DatePickerCustomInput
      v-if="!inline"
      :id="componentId"
      :name="name"
      :date="dateFormatted"
      :type="type"
      :format="inputFormat"
      :range="range"
      :range-input-text="rangeInputText"
      :locale="locale"
      :placeholder="placeholder"
      :color="color"
      :disabled="disabled"
      :tabindex="tabindex"
      :no-input="noInput"
      :no-calendar-icon="noCalendarIcon"
      @toggleDatepicker="toggleDatepicker"
      @focus="showDatePicker"
    />
    <DatePickerOverlay
      :isVisible="isVisible"
      :fullscreen-mobile="fullscreenMobile"
      :attach-to="attachTo"
      :z-index="zIndex"
      @close="hideDatePicker"
    />
    <DatepickerAgenda
      :name="name"
      :isVisible="isVisible"
      :date="date"
      :type="type"
      :validate="validate"
      :button-cancel="textsFormat.buttonCancel"
      :button-validate="textsFormat.buttonValidate"
      :range="range"
      :range-header-text="textsFormat.rangeHeaderText"
      :range-presets="rangePresets"
      :format-header="headerFormat"
      :rtl="rtl"
      :locale="locale"
      :no-header="noHeader"
      :inline="inline"
      :fixed="fixed"
      :fullscreen-mobile="fullscreenMobile"
      :color="color"
      :min-date="minDate"
      :max-date="maxDate"
      :attach-to="attachTo"
      :z-index="zIndex + 1"
      @selectDate="changeDate"
      @validateDate="validateDate"
      @close="hideDatePicker"
    />
  </div>
</template>

<script>
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import DatePickerCustomInput from './DatePickerCustomInput.vue';
import DatePickerOverlay from './DatePickerOverlay.vue';
import DatepickerAgenda from './DatePickerAgenda.vue';
import { generateRandomId, validateAttachTarget } from '../../utils/helpers';
import {
  getLocale,
  getDefaultLocale,
  setLocaleLang,
  getDefaultInputFormat,
  getDefaultHeaderFormat,
  getDefaultOutputFormat,
  formatDateToSend,
  initDate,
} from '../../utils/Dates';

export default {
  name: 'DatePicker',
  components: { DatePickerCustomInput, DatePickerOverlay, DatepickerAgenda },
  props: {
    id: { type: String, default: undefined },
    name: { type: String, default: 'datepicker' },
    // Validation Buttons
    validate: { type: Boolean, default: false },
    buttonValidate: { type: String, default: undefined },
    buttonCancel: { type: String, default: undefined },
    // type (date, month, quarter, year picker)
    type: { type: String, default: 'date' },
    // Range
    range: { type: Boolean, default: false },
    rangeInputText: { type: String, default: '%d ~ %d' },
    rangeHeaderText: { type: String, default: undefined },
    rangePresets: { type: Array, default: undefined },
    // Current Value from v-model
    value: { type: [String, Object, Number, Date] },
    // Format
    format: { type: String, default: undefined },
    formatHeader: { type: String, default: undefined },
    formatOutput: { type: String, default: undefined },
    // Show/hide datepicker
    visible: { type: Boolean, default: false },
    // Right-to-Left
    rtl: { type: Boolean, default: false },
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
    maxDate: { type: [String, Number, Date] },
    // Disabled all datepicker
    disabled: { type: Boolean, default: false },
    // Inline
    inline: { type: Boolean, default: false },
    // fixed
    fixed: { type: Boolean, default: false },
    // Set if header in agenda should be visible
    noHeader: { type: Boolean, default: false },
    // Allow to hide input (to use a button instead)
    noInput: { type: Boolean, default: false },
    // Allow to hide calendar icon
    noCalendarIcon: { type: Boolean, default: false },
    // Responsive bottom sheet
    fullscreenMobile: { type: Boolean, default: false },
    // tabindex
    tabindex: { type: [String, Number], default: '0' },
    // Specificy a z-index for agenda & overlay
    zIndex: { type: Number, default: 1 },
    // attachTo
    attachTo: { validator: validateAttachTarget, default: 'body' },
  },
  data: () => ({
    date: undefined,
    isVisible: undefined,
  }),
  computed: {
    // use a computed to have a dynamicId for each instance
    componentId () {
      return this.id || `datepicker_${generateRandomId()}`;
    },
    // If format isnt specificed, select default format from type
    inputFormat () {
      if (!this.format) return getDefaultInputFormat(this.range ? 'range' : this.type);
      return this.format;
    },
    headerFormat () {
      if (!this.formatHeader) return getDefaultHeaderFormat(this.range ? 'range' : this.type);
      return this.formatHeader;
    },
    outputFormat () {
      if (!this.formatOutput) return getDefaultOutputFormat(this.range ? 'range' : this.type);
      return this.formatOutput;
    },
    textsFormat () {
      const { buttonValidate, buttonCancel, rangeHeaderText } = getLocale(this.locale.lang);
      return {
        buttonValidate: this.buttonValidate || buttonValidate,
        buttonCancel: this.buttonCancel || buttonCancel,
        rangeHeaderText: this.rangeHeaderText || rangeHeaderText,
      };
    },
    dateFormatted () {
      return initDate(this.value, {
        isRange: this.range,
        locale: this.locale,
        format: this.outPutFormat,
      });
    },
  },
  watch: {
    value: {
      handler: 'initDate',
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
    this.hideDatePicker();
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

      this.initDate(this.value);
      this.isVisible = true;
      this.$emit('onOpen');
    },
    hideDatePicker () {
      if (!this.isVisible) return;

      this.isVisible = false;
      clearAllBodyScrollLocks();
      this.$emit('onClose');
    },
    initDate (date) {
      this.date = initDate(date, {
        isRange: this.range,
        locale: this.locale,
        format: this.outPutFormat,
      });
    },
    changeDate (date) {
      this.date = date;
      if (this.validate) return;
      this.validateDate(date);
    },
    validateDate () {
      this.$emit('input', formatDateToSend(this.date, this.outputFormat, this.range));
      this.$emit('onChange');
      this.hideDatePicker();
    },
  },
};
</script>

<style>
  .datepicker-container  *,
  .datepicker-container ::before,
  .datepicker-container ::after {
    box-sizing: border-box;
  }
</style>

<style lang="scss" scoped>
  .datepicker-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    cursor: pointer;
    box-sizing: border-box;

    &:focus,
    &:active {
      outline: 0;
    }
  }
</style>
