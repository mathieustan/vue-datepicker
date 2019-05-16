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
      type="text"
      @click="showDatepicker">
    <DatepickerAgenda
      :isVisible="isVisible"
      :date="date"
      :local="local"
      :color="color"
      :close="hideDatePicker"
      @selectDate="changeDate"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { directive as clickOutside } from 'vue-clickaway';

import 'dayjs/locale/fr';

import DatepickerAgenda from './DatePickerAgenda.vue';

dayjs.locale('fr');

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
    local: {
      type: Object,
      default: () => ({
        days: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      }),
    },
    // Applies specified color to the control
    color: { type: String, default: '#4f88ff' },

    // TODO : Props to add
    // allowedDates / max & min
    // disabled
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
      return this.date.format(this.format);
    },
    // Date which will be send
    dateRaw () {
      return this.date.format('YYYY-MM-DD');
    },
  },
  methods: {
    showDatepicker () {
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

<style lang="scss" scoped>
  *, ::before, ::after {
    box-sizing: border-box;
  }

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
    }
  }
</style>
