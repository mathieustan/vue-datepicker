// Styles
import './VDPickerQuarters.scss';

// Mixins
import colorable from '../../../mixins/colorable';
import Localable from '../../../mixins/localable';

// Functions
import {
  convertQuarterToMonth,
  areSameDates,
  generateDateWithYearAndMonth,
  isDateAllowed,
} from '../utils/helpers';

// Helpers
import mixins from '../../../utils/mixins';

const baseMixins = mixins(
  colorable,
  Localable,
);

export default baseMixins.extend({
  name: 'VDPickerQuarters',
  props: {
    active: { type: Boolean, default: false },
    allowedDates: { type: Function },
    color: { type: String, default: String },
    pickerDate: { type: Object, default: Object },
    max: { type: [String, Number, Date] },
    min: { type: [String, Number, Date] },
    mutableDate: { type: Object, default: undefined },
    transitionName: { type: String, default: String },
  },
  computed: {
    getQuarters () {
      return this.pickerDate.getQuarters();
    },
  },
  methods: {
    // ------------------------------
    // States
    // ------------------------------
    isSelected (monthIndex) {
      if (!this.mutableDate) return false;

      const selectedDate = generateDateWithYearAndMonth({
        year: this.pickerDate.year,
        month: monthIndex,
        locale: this.currentLocale,
      });

      return areSameDates(
        this.mutableDate.format('YYYY-MM'),
        selectedDate.format('YYYY-MM'),
        'quarter'
      );
    },
    isAllowed (monthIndex) {
      const date = generateDateWithYearAndMonth({
        year: this.pickerDate.year,
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
        staticClass: 'vd-picker__quarters-inner',
        props: {
          tag: 'div',
          name: this.transitionName,
        },
      }, [this.pickerDate.year].map(this.genQuarterList));
    },
    genQuarterList (key) {
      return this.$createElement('div', {
        staticClass: 'vd-picker__quarters-list',
        key,
      }, [
        this.getQuarters.map(this.genQuarterButton),
      ]);
    },
    genQuarterButton (value, index) {
      const selectedIndex = convertQuarterToMonth(index);

      const button = this.$createElement('button', {
        key: index,
        staticClass: 'vd-picker__quarters-button',
        style: {
          ...(this.isSelected(selectedIndex) && this.setTextColor('#fff')),
          ...(this.isSelected(selectedIndex) && this.setBackgroundColor(this.color)),
        },
        attrs: {
          type: 'button',
          disabled: !this.isAllowed(index),
        },
        on: {
          click: () => this.$emit('input', index, 'quarter'),
        },
      }, [value]);

      return this.$createElement('div', {
        staticClass: 'vd-picker__quarters-button__wrapper',
      }, [button]);
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'vd-picker__quarters',
    }, [this.genTransition()]);
  },
});
