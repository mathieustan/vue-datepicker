// Styles
import './VDPickerYearMonth.scss';

// Mixins
import colorable from '../../../mixins/colorable';

// Components
import DatePickerControls from '../VDPickerControls/VDPickerControls';

// Functions
import {
  generateDateWithYearAndMonth,
  isBeforeDate,
  isAfterDate,
  areSameDates,
} from '../../../utils/Dates';

import { computeYearsScrollPosition } from '../../../utils/positions';

export default {
  name: 'VDPickerYearMonth',
  mixins: [colorable],
  components: { DatePickerControls },
  props: {
    active: { type: Boolean, default: false },
    color: { type: String, default: String },
    currentDate: { type: Object, default: Object },
    maxDate: { type: [String, Date, Object] },
    minDate: { type: [String, Date, Object] },
    mode: { type: String, default: String },
    mutableDate: { type: Object, default: undefined },
    range: { type: Boolean, default: false },
    showYearMonthSelector: { type: Function },
    transitionName: { type: String, default: String },
    visibleYearsNumber: { type: Number, default: 10 },
  },
  data: () => ({
    activeYear: undefined,
  }),
  computed: {
    isYearMode () {
      return this.mode === 'year';
    },
    isMonthOrQuarterMode () {
      return this.mode === 'month' || this.mode === 'quarter';
    },
    yearFormatted () {
      return this.currentDate.getYearFormatted();
    },
    getYears () {
      return this.currentDate.generateYearsRange(this.activeYear, this.visibleYearsNumber, 'year');
    },
    getMonths () {
      return this.currentDate.getMonths();
    },
    getQuarters () {
      return this.currentDate.getQuarters();
    },
    shouldComputeYearPosition () {
      return this.active && this.isYearMode && this.visibleYearsNumber;
    },
  },
  watch: {
    shouldComputeYearPosition: {
      handler (value) {
        if (!value) return;
        this.$nextTick(this.computeScrollPosition);
      },
      immediate: true,
    },
  },
  created () {
    this.activeYear = this.currentDate.year;
  },
  methods: {
    // ------------------------------
    // Year/Month/Quarter states
    // ------------------------------
    isSelectedYear (year) {
      return this.currentDate.year === year;
    },
    isSelectedMonthOrQuarter (monthIndex) {
      if (this.range || !this.mutableDate) return false;
      const selectedDate = generateDateWithYearAndMonth(this.currentDate.year, monthIndex);
      return areSameDates(
        this.mutableDate.format('YYYY-MM'),
        selectedDate.format('YYYY-MM'),
        this.mode
      );
    },
    isYearDisabled (year) {
      return isBeforeDate(year, this.minDate, this.mode) ||
        isAfterDate(year, this.maxDate, this.mode);
    },
    isMonthOrQuarterDisabled (monthIndex) {
      const date = generateDateWithYearAndMonth(this.yearFormatted, monthIndex);
      return isBeforeDate(date, this.minDate, 'month') ||
        isAfterDate(date, this.maxDate, 'month');
    },
    // ------------------------------
    // Scroll position
    // ------------------------------
    computeScrollPosition () {
      const activeItem = this.$el.querySelector('button.active');
      /* istanbul ignore next */
      if (!activeItem || this.mode !== 'year') return;

      // should scroll to active year
      const containerToScroll = this.$el.querySelector('.vd-picker__selects-years__wrapper');
      containerToScroll.scrollTop = computeYearsScrollPosition(containerToScroll, activeItem);
    },
    // ------------------------------
    // Events
    // ------------------------------
    changeYear (direction) {
      this.$emit('changeYear', direction);
    },
    onSelect (value) {
      this.$emit('selectedYearMonth', value, this.mode);
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genContent () {
      return [
        this.isYearMode && this.genYearMode(),
        this.isMonthOrQuarterMode && this.genMonthOrQuarter(),
      ];
    },
    // -- Years
    genYearMode () {
      const yearsList = this.$createElement('div', {
        staticClass: 'vd-picker__selects-years__list',
      }, this.getYears.map(year => this.genYearButton(year)));
      const yearsWrapper = this.$createElement('div', {
        staticClass: 'vd-picker__selects-years__wrapper',
      }, [yearsList]);

      return this.$createElement('div', {
        staticClass: 'vd-picker__selects-years',
      }, [yearsWrapper]);
    },
    genYearButton (year) {
      const button = this.$createElement('button', {
        key: year,
        class: {
          'active': this.isSelectedYear(year),
        },
        style: {
          ...(this.isSelectedYear(year) && this.setTextColor('#fff')),
          ...(this.isSelectedYear(year) && this.setBackgroundColor(this.color)),
        },
        attrs: {
          disabled: this.isYearDisabled(year),
        },
        on: {
          click: () => this.onSelect(year),
        },
      }, [year]);
      return this.$createElement('div', {
        staticClass: 'vd-picker__selects-years__button',
      }, [button]);
    },
    // -- Month or Quarter
    genMonthOrQuarter () {
      return this.$createElement('div', {
        staticClass: 'vd-picker__selects-wrapper',
      }, [
        this.genDatePickerControls(),
        this.genMonthQuarterTransition(this.mode),
      ]);
    },
    genDatePickerControls () {
      return this.$createElement(DatePickerControls, {
        props: {
          color: this.color,
          currentDate: this.currentDate,
          maxDate: this.maxDate,
          minDate: this.minDate,
          mode: 'year',
          transitionName: this.transitionName,
        },
        on: {
          changeVisibleDate: this.changeYear,
          showYearMonthSelector: this.showYearMonthSelector,
        },
      });
    },
    genMonthQuarterTransition (mode) {
      return this.$createElement('transition-group', {
        staticClass: 'vd-picker__selects-inner',
        props: {
          tag: 'div',
          name: this.transitionName,
        },
      }, [this.currentDate.year].map(year => {
        if (mode === 'month') return this.genMonthList(year, mode);
        return this.genQuarterList(year, mode);
      }));
    },
    genMonthList (key, mode) {
      return this.$createElement('div', {
        staticClass: 'vd-picker__selects-months',
        key,
      }, [
        this.getMonths.map((month, index) => this.genMonthQuarterButton(month, mode, index)),
      ]);
    },
    genQuarterList (key, mode) {
      return this.$createElement('div', {
        staticClass: 'vd-picker__selects-quarters',
        key,
      }, [
        this.getQuarters.map((quarter, index) => this.genMonthQuarterButton(quarter, mode, index)),
      ]);
    },
    genMonthQuarterButton (value, mode, index) {
      const selectedIndex = mode === 'quarter' ? index * 3 : index;
      const button = this.$createElement('button', {
        key: index,
        style: {
          ...(this.isSelectedMonthOrQuarter(selectedIndex) && this.setTextColor('#fff')),
          ...(this.isSelectedMonthOrQuarter(selectedIndex) && this.setBackgroundColor(this.color)),
        },
        attrs: {
          type: 'button',
          disabled: this.isMonthOrQuarterDisabled(index),
        },
        on: {
          click: () => this.onSelect(index),
        },
      }, [value]);
      return this.$createElement('div', {
        staticClass: `vd-picker__selects-${mode}s__button`,
      }, [button]);
    },
  },
  render (h) {
    const children = h('div', { staticClass: 'vd-picker__selects' }, [this.genContent()]);
    return h('transition', {
      props: { name: 'yearMonth' },
    }, [children]);
  },
};
