import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

// Styles
import './VDPickerAgenda.scss';

// Mixins
import colorable from '../../../mixins/colorable';
import Overlayable from '../../../mixins/overlayable';
import Localable from '../../../mixins/localable';

// Components
import VDPickerControls from '../VDPickerControls';
import VDPickerHeader from '../VDPickerHeader';
import VDPickerPresets from '../VDPickerPresets';
import VDPickerTableDate from '../VDPickerTableDate';
import VDPickerValidate from '../VDPickerValidate';
import VDPickerMonths from '../VDPickerMonths';
import VDPickerQuarters from '../VDPickerQuarters';
import VDPickerYears from '../VDPickerYears';
import VDIcon from '../../VDIcon';

// Functions
import PickerDate from '../utils/PickerDate';
import {
  generateDates,
  convertQuarterToMonth,
  generateDate,
  generateDateWithYearAndMonth,
  generateMonthAndYear,
  isAfterDate,
  isBeforeDate,
  isDateAfter,
} from '../utils/helpers';

// Constants
import { DATEPICKER_MODES } from '../../../constants';

// Helpers
import mixins from '../../../utils/mixins';

const baseMixins = mixins(
  colorable,
  Overlayable,
  Localable,
);

export default baseMixins.extend({
  name: 'VDPickerAgenda',
  props: {
    allowedDates: { type: Function },
    buttonCancel: { type: String },
    buttonValidate: { type: String },
    color: { type: String },
    date: { type: [Date, Object] },
    headerFormat: { type: String },
    fullscreen: { type: Boolean, default: false },
    maxDate: { type: [String, Number, Date] },
    minDate: { type: [String, Number, Date] },
    name: { type: String },
    noHeader: { type: Boolean, default: false },
    range: { type: Boolean, default: false },
    rangeHeaderText: { type: String, default: String },
    rangePresets: { type: Array, default: undefined },
    rtl: { type: Boolean, default: false },
    type: { type: String, default: 'date' },
    validate: { type: Boolean, default: false },
    value: { type: Boolean, default: false },
    visibleYearsNumber: { type: Number },
  },
  data: () => ({
    height: 'auto',
    // Displayed year/month
    pickerDate: undefined,
    // mutableDate stores selected date
    mutableDate: undefined,
    // Mode switch between date / month / quarter / year table
    mode: DATEPICKER_MODES.date,
    transitionDaysName: 'slide-h-next',
    transitionLabelName: 'slide-v-next',
  }),
  computed: {
    classes () {
      return {
        'vd-picker--rtl': this.rtl,
        'vd-picker--bottomsheet': this.fullscreen,
        'vd-picker--no-header': this.noHeader,
        'vd-picker--validate': this.validate,
        'vd-picker--range': this.range,
        'vd-picker--range-selecting': this.range && !this.isRangeSelected,
      };
    },
    isRangeSelected () {
      if (!this.range) return false;
      return typeof this.mutableDate === 'object' &&
        Object.values(this.mutableDate).every(date => Boolean(date));
    },
    formatters () {
      return generateDates({
        headerFormat: this.headerFormat,
        locale: this.locale,
        maxDate: this.maxDate,
        minDate: this.minDate,
        mutableDate: this.mutableDate,
        range: this.range,
        rangeHeaderText: this.rangeHeaderText,
      });
    },
  },
  created () {
    this.initAgenda();
  },
  beforeDestroy () {
    clearAllBodyScrollLocks();
  },
  watch: {
    value: 'initAgenda',
    // When, date change (after being visibled),
    // should update pickerDate & mutableDate
    date: 'initDatesForPicker',
    // When type change (after being visibled),
    // should update update active mode
    type: 'updateMode',
    // When fullscreen is visibled => lock body scroll
    // When fullscreen is hidden => unlock body scroll
    fullscreen: {
      handler (show) {
        this.$nextTick(() => {
          const targetElement = this.$refs.body;

          if (show) {
            disableBodyScroll(targetElement);
            this.genOverlay();
          } else {
            this.removeOverlay(false);
            enableBodyScroll(targetElement);
          }
        });
      },
      immediate: true,
    },
    // When fullscreen is visibled and visibled mode is 'year'
    // => should keep scroll disabled, but should allow scroll into years list
    mode (mode) {
      if (mode !== 'year' || !this.fullscreen) return;
      enableBodyScroll(this.$refs.body);
      this.$nextTick(() => {
        disableBodyScroll(this.$el.querySelector('.vd-picker__years'));
      });
    },
  },
  methods: {
    initAgenda () {
      this.initDatesForPicker(this.date);
      this.updateMode(this.type);
    },
    updateTransitions (direction) {
      this.transitionDaysName = `slide-h-${direction}`;
      this.transitionLabelName = `slide-v-${direction}`;
    },
    // ------------------------------
    // Handle dates change
    // ------------------------------
    reOrderSelectedDate (newDate) {
      if (!this.mutableDate) return;
      // Should update mutableDate if
      // -> hovered day is before or after current selected date
      if (isBeforeDate(newDate, this.mutableDate.start)) {
        this.mutableDate = { start: undefined, end: this.mutableDate.start };
      } else if (isAfterDate(newDate, this.mutableDate.end)) {
        this.mutableDate = { start: this.mutableDate.end, end: undefined };
      }
    },
    selectDate (day) {
      if (this.range) {
        // If rangeIsSelected or no dates selected => should reset, and select start
        if (this.isRangeSelected || (!this.mutableDate.start && !this.mutableDate.end)) {
          this.mutableDate = { start: day.clone(), end: undefined };
          return;
        }
        // else, should update missing range (start or end)
        this.reOrderSelectedDate(day);
        this.emitSelectedDate({
          ...this.mutableDate,
          ...(this.mutableDate.start && { end: day.clone() }),
          ...(this.mutableDate.end && { start: day.clone() }),
        });
        return;
      }

      const direction = isDateAfter(day, this.mutableDate) ? 'next' : 'prev';
      this.updateTransitions(direction);
      this.emitSelectedDate(day.clone());
    },
    emitSelectedDate (date) {
      // If range, when a preset is selected,
      // should transition to end date month
      if (this.range) {
        this.pickerDate = new PickerDate(date.end.month(), date.end.year(), this.currentLocale);
      }

      this.mutableDate = date;
      this.$emit('selectDate', this.mutableDate);
    },
    initDatesForPicker (date) {
      let newDate = generateDate({
        date: this.range ? (date.end || date.start) : date,
        locale: this.currentLocale,
      });

      // If today's date is after maxDate, we should show maxDate month
      if (isAfterDate(newDate, this.maxDate)) {
        newDate = generateDate({ date: this.maxDate, locale: this.currentLocale });
      }

      if (this.range) {
        this.pickerDate = new PickerDate(newDate.month(), newDate.year(), this.currentLocale);
        this.mutableDate = date;
        return;
      }

      // When type is quarter && date is not defined -> newDate equals today's date
      // So we need to convert it to quarter month -> for example : 2020-11-20 => 2020-4
      if (date == null && this.type === 'quarter') {
        newDate = newDate.month(newDate.quarter());
      }

      // When type is quarter && date is defined -> newDate will convert quarter date to month
      // For example : 2020-2 => 2020-02-01 but quarter 2 should be 2020-04-01
      if (date != null && this.type === 'quarter') {
        newDate = newDate.month(convertQuarterToMonth(newDate.month()));
      }

      this.pickerDate = new PickerDate(newDate.month(), newDate.year(), this.currentLocale);
      this.mutableDate = date && date.month(newDate.month()).clone();
    },
    changeMonth (direction) {
      let month = this.pickerDate.month + (direction === 'prev' ? -1 : +1);
      let year = this.pickerDate.year;
      if (month > 11 || month < 0) {
        year += (direction === 'prev' ? -1 : +1);
        month = (direction === 'prev' ? 11 : 0);
      }
      this.updateTransitions(direction);
      this.pickerDate = new PickerDate(month, year, this.currentLocale);
    },
    changeYear (direction) {
      let year = this.pickerDate.year + (direction === 'prev' ? -1 : +1);
      const month = this.pickerDate.month;
      this.updateTransitions(direction);
      this.pickerDate = new PickerDate(month, year, this.currentLocale);
    },
    // ------------------------------
    // Handle Year/Month/Quarter
    // ------------------------------
    updateMode (mode) {
      this.mode = mode;
    },
    updateSelectedYearMonth (value, mode) {
      const { year, month } = generateMonthAndYear(value, this.pickerDate, mode);
      this.pickerDate = new PickerDate(month, year, this.currentLocale);

      // When mode is year, we'll show month/quarter (unless type is year)
      if (mode === DATEPICKER_MODES.year && this.type !== 'year') {
        const nextActiveMode = this.type === 'quarter' ? 'quarter' : 'month';
        return this.updateMode(nextActiveMode);
      }

      // When type is month|quarter|year
      // Should emit date selected if it's not type date
      if (this.type !== 'date') {
        const newDate = generateDateWithYearAndMonth({
          year: this.pickerDate.year,
          month: this.pickerDate.month,
          locale: this.currentLocale,
        });
        this.selectDate(newDate);
        return;
      }

      this.updateMode('date');
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genTitle () {
      const title = this.$createElement('p', this.name);
      const icon = this.$createElement(VDIcon, {
        on: {
          click: () => this.$emit('close'),
        },
      }, ['close']);

      return this.$createElement('div', {
        staticClass: 'vd-picker__title',
      }, [
        title,
        this.$createElement('div', {
          staticClass: 'vd-picker__title-close',
        }, [icon]),
      ]);
    },
    genHeader () {
      return this.$createElement(VDPickerHeader, {
        props: {
          ...this.formatters,
          color: this.color,
          mode: this.yearMonthMode,
          mutableDate: this.mutableDate,
          range: this.range,
          transitionName: this.transitionLabelName,
          type: this.type,
        },
        on: {
          'update-mode': this.updateMode,
        },
      });
    },
    genPresets () {
      return this.$createElement(VDPickerPresets, {
        props: {
          rangePresets: this.rangePresets,
          mutableDate: this.mutableDate,
          minDate: this.minDate,
          maxDate: this.maxDate,
          color: this.color,
          locale: this.locale,
        },
        on: {
          'update-range': this.emitSelectedDate,
        },
      });
    },
    genBody () {
      const children = [
        this.mode !== DATEPICKER_MODES.year && this.genControls(),
        this.mode === DATEPICKER_MODES.date && this.genTableDate(),
        this.mode === DATEPICKER_MODES.month && this.genMonths(),
        this.mode === DATEPICKER_MODES.quarter && this.genQuarters(),
        this.mode === DATEPICKER_MODES.year && this.genYears(),
      ];

      return this.$createElement('div', {
        staticClass: 'vd-picker__body',
        ref: 'body',
      }, children);
    },
    genControls () {
      return this.$createElement(VDPickerControls, {
        props: {
          pickerDate: this.pickerDate,
          transitionName: this.transitionLabelName,
          color: this.color,
          min: this.minDate,
          max: this.maxDate,
          mode: this.mode,
        },
        on: {
          'on-navigation-click': this.mode === DATEPICKER_MODES.date ? this.changeMonth : this.changeYear,
          'update-mode': this.updateMode,
        },
      });
    },
    genTableDate () {
      return this.$createElement(VDPickerTableDate, {
        props: {
          allowedDates: this.allowedDates,
          color: this.color,
          pickerDate: this.pickerDate,
          isRangeSelected: this.isRangeSelected,
          locale: this.currentLocale,
          maxDate: this.maxDate,
          minDate: this.minDate,
          mutableDate: this.mutableDate,
          range: this.range,
          transitionName: this.transitionDaysName,
        },
        on: {
          'update-month': this.changeMonth,
          'update-hovered-day': this.reOrderSelectedDate,
          'select-date': this.selectDate,
        },
      });
    },
    genMonths () {
      const { minMonth, maxMonth } = this.formatters;

      return this.$createElement(VDPickerMonths, {
        props: {
          active: this.mode === DATEPICKER_MODES.month,
          allowedDates: this.type === DATEPICKER_MODES.month ? this.allowedDates : undefined,
          color: this.color,
          locale: this.currentLocale,
          max: maxMonth,
          min: minMonth,
          mutableDate: this.mutableDate,
          pickerDate: this.pickerDate,
          range: this.range,
          transitionName: this.transitionDaysName,
        },
        on: {
          input: this.updateSelectedYearMonth,
        },
      });
    },
    genQuarters () {
      const { minMonth, maxMonth } = this.formatters;

      return this.$createElement(VDPickerQuarters, {
        props: {
          active: this.mode === DATEPICKER_MODES.quarter,
          allowedDates: this.type === DATEPICKER_MODES.quarter ? this.allowedDates : undefined,
          color: this.color,
          locale: this.currentLocale,
          max: maxMonth,
          min: minMonth,
          mutableDate: this.mutableDate,
          pickerDate: this.pickerDate,
          transitionName: this.transitionDaysName,
        },
        on: {
          input: this.updateSelectedYearMonth,
        },
      });
    },
    genYears () {
      const { minYear, maxYear } = this.formatters;

      return this.$createElement(VDPickerYears, {
        props: {
          active: this.mode === DATEPICKER_MODES.year,
          allowedDates: this.type === DATEPICKER_MODES.year ? this.allowedDates : undefined,
          color: this.color,
          max: maxYear,
          min: minYear,
          mutableDate: this.mutableDate,
          pickerDate: this.pickerDate,
          range: this.range,
          visibleYearsNumber: this.visibleYearsNumber,
        },
        on: {
          input: this.updateSelectedYearMonth,
        },
      });
    },
    genValidate () {
      return this.$createElement(VDPickerValidate, {
        props: {
          buttonValidate: this.buttonValidate,
          buttonCancel: this.buttonCancel,
          color: this.color,
          mutableDate: this.mutableDate,
          range: this.range,
        },
        on: {
          cancel: () => this.$emit('close'),
          validate: () => this.$emit('validateDate'),
        },
      });
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'vd-picker',
      class: this.classes,
      ref: 'datepicker',
    }, [
      // -- Title should be visible only on fullscreen mode
      this.fullscreen && this.genTitle(),
      // -- Hide header if no-header sets
      !this.noHeader && this.genHeader(),
      // -- Presets available only for range
      this.range && this.genPresets(),
      // -- Body
      this.genBody(),
      // -- validate available only if sets
      this.validate && this.genValidate(),
    ]);
  },
});
