// Styles
import './DatePickerControls.scss';

// Mixins
import colorable from '../../mixins/colorable';

// Components
import VDIcon from '../VDIcon';

// Functions
import { isBeforeDate, isAfterDate } from '../../utils/Dates';

export default {
  name: 'DatePickerControls',
  mixins: [colorable],
  props: {
    currentDate: { type: Object, required: true },
    transitionName: { type: String },
    color: { type: String },
    mode: { type: String, default: 'month' },
    minDate: { type: [String, Number, Date] },
    maxDate: { type: [String, Number, Date] },
  },
  computed: {
    monthFormatted () {
      return this.currentDate.getMonthFormatted();
    },
    yearFormatted () {
      return this.currentDate.getYearFormatted();
    },
    isYearDisabled () {
      return isBeforeDate(this.yearFormatted, this.minDate, 'year') ||
        isAfterDate(this.yearFormatted, this.maxDate, 'year');
    },
    isPreviousDateDisabled () {
      if (this.mode !== 'year') return false;
      return isBeforeDate(Number(this.yearFormatted) - 1, this.minDate, 'year');
    },
    isNextDateDisabled () {
      if (this.mode !== 'year') return false;
      return isAfterDate(Number(this.yearFormatted) + 1, this.maxDate, 'year');
    },
  },
  methods: {
    // ------------------------------
    // Events
    // ------------------------------
    changeVisibleDate (direction) {
      this.$emit('changeVisibleDate', direction);
    },
    showYearMonthSelector (mode) {
      this.$emit('showYearMonthSelector', mode);
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genContent () {
      return [
        this.genPrevButton(),
        this.genSelectors(),
        this.genNextButton(),
      ];
    },
    genPrevButton () {
      const icon = this.$createElement(VDIcon, 'chevronLeft');

      return this.$createElement('button', {
        staticClass: 'vd-picker__controls-prev',
        attrs: {
          disabled: this.isPreviousDateDisabled,
          type: 'button',
        },
        on: {
          click: () => this.changeVisibleDate('prev'),
        },
      }, [icon]);
    },
    genNextButton () {
      const icon = this.$createElement(VDIcon, 'chevronRight');

      return this.$createElement('button', {
        staticClass: 'vd-picker__controls-next',
        attrs: {
          disabled: this.isNextDateDisabled,
          type: 'button',
        },
        on: {
          click: () => this.changeVisibleDate('next'),
        },
      }, [icon]);
    },
    genSelectors () {
      return this.$createElement('div', {
        staticClass: 'vd-picker__controls-wrapper',
      }, [
        this.mode === 'month' && this.genMonthSelector(),
        this.genYearSelector(),
      ]);
    },
    genChildrenSelectors ({ value, key, type, disabled }) {
      return this.$createElement('div', this.setTextColor(this.color, {
        key,
        staticClass: 'vd-picker__controls-label',
      }), [this.$createElement('button', {
        attrs: { type: 'button', disabled },
        on: { click: () => this.showYearMonthSelector(type) },
      }, [value])]);
    },
    genMonthSelector () {
      return this.$createElement('transition-group', {
        staticClass: 'vd-picker__controls-month',
        props: {
          name: this.transitionName,
          tag: 'span',
        },
      }, [this.currentDate.month].map(key =>
        this.genChildrenSelectors({
          value: this.monthFormatted,
          key,
          type: 'month',
        }))
      );
    },
    genYearSelector () {
      return this.$createElement('transition-group', {
        staticClass: 'vd-picker__controls-year',
        class: {
          'vd-picker__controls-year--center': this.mode === 'year',
        },
        props: {
          name: this.transitionName,
          tag: 'span',
        },
      }, [this.currentDate.year].map(key =>
        this.genChildrenSelectors({
          value: this.yearFormatted,
          key,
          type: 'year',
          disabled: this.isYearDisabled,
        }))
      );
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'vd-picker__controls',
    }, this.genContent());
  },
};
