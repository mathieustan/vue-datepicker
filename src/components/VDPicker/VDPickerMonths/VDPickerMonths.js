// Styles
import './VDPickerMonths.scss';

// Mixins
import colorable from '../../../mixins/colorable';
import Localable from '../../../mixins/localable';

// Functions
import {
  areSameDates,
  generateDateWithYearAndMonth,
  isCurrent,
  isDateAllowed,
} from '../utils/helpers';

// Helpers
import mixins from '../../../utils/mixins';

const baseMixins = mixins(
  colorable,
  Localable,
);

export default baseMixins.extend({
  name: 'VDPickerMonths',
  props: {
    active: { type: Boolean, default: false },
    allowedDates: { type: Function },
    color: { type: String, default: String },
    pickerDate: { type: Object, default: Object },
    max: { type: [String, Number, Date] },
    min: { type: [String, Number, Date] },
    mutableDate: { type: Object, default: undefined },
    range: { type: Boolean, default: false },
    transitionName: { type: String, default: String },
    type: { type: String },
    visibleYearsNumber: { type: Number, default: 10 },
  },
  computed: {
    yearFormatted () {
      return this.pickerDate.getYearFormatted();
    },
    getMonths () {
      return this.pickerDate.getMonths();
    },
  },
  methods: {
    // ------------------------------
    // States
    // ------------------------------
    isCurrent (monthIndex) {
      const selectedDate = generateDateWithYearAndMonth({
        year: this.pickerDate.year,
        month: monthIndex,
        locale: this.currentLocale,
      });

      return isCurrent({
        date: selectedDate,
        type: 'month',
        locale: this.currentLocale,
      });
    },
    isSelected (monthIndex) {
      if (this.range || !this.mutableDate) return false;

      const selectedDate = generateDateWithYearAndMonth({
        year: this.pickerDate.year,
        month: monthIndex,
        locale: this.currentLocale,
      });
      return areSameDates(
        this.mutableDate.format('YYYY-MM'),
        selectedDate.format('YYYY-MM'),
        'month'
      );
    },
    isAllowed (monthIndex) {
      const date = generateDateWithYearAndMonth({
        year: this.yearFormatted,
        month: monthIndex,
        locale: this.currentLocale,
      });

      return isDateAllowed({
        date,
        min: this.min,
        max: this.max,
        type: 'month',
        allowedFn: this.allowedDates,
      });
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genTransition () {
      return this.$createElement('transition-group', {
        staticClass: 'vd-picker__months-inner',
        props: {
          tag: 'div',
          name: this.transitionName,
        },
      }, [this.pickerDate.year].map(this.genMonthList));
    },
    genMonthList (key) {
      return this.$createElement('div', {
        staticClass: 'vd-picker__months-list',
        key,
      }, [
        this.getMonths.map(this.genMonthButton),
      ]);
    },
    genMonthButton (value, index) {
      const isCurrent = this.isCurrent(index) && !this.isSelected(index);
      const isSelected = this.isSelected(index);

      const button = this.$createElement('button', {
        key: index,
        staticClass: 'vd-picker__months-button',
        style: {
          ...(isCurrent && {
            'border-color': this.color,
          }),
          ...(isSelected && {
            ...this.setTextColor('#fff'),
            ...this.setBackgroundColor(this.color),
          }),
        },
        attrs: {
          type: 'button',
          disabled: !this.isAllowed(index),
        },
        on: {
          click: () => this.$emit('input', index, 'month'),
        },
      }, [value]);

      return this.$createElement('div', {
        staticClass: 'vd-picker__months-button__wrapper',
      }, [button]);
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'vd-picker__months',
    }, [this.genTransition()]);
  },
});
