// Styles
import './VDPickerYears.scss';

// Mixins
import colorable from '../../../mixins/colorable';

// Functions
import {
  generateDateWithYearAndMonth,
  isCurrent,
  isDateAllowed,
} from '../utils/helpers';
import { computeYearsScrollPosition } from '../../../utils/positions';

// Helpers
import mixins from '../../../utils/mixins';

const baseMixins = mixins(
  colorable,
);

export default baseMixins.extend({
  name: 'VDPickerYears',
  props: {
    active: { type: Boolean, default: false },
    allowedDates: { type: Function },
    color: { type: String, default: String },
    mutableDate: { type: Object, default: undefined },
    pickerDate: { type: Object, default: Object },
    max: { type: [String, Number, Date] },
    min: { type: [String, Number, Date] },
    visibleYearsNumber: { type: Number, default: 10 },
    range: { type: Boolean, default: false },
  },
  computed: {
    yearFormatted () {
      return this.pickerDate.getYearFormatted();
    },
    activeYear () {
      if (this.range) return;
      return this.mutableDate && this.mutableDate.format('YYYY');
    },
    getYears () {
      return this.pickerDate.generateYearsRange({
        activeYear: this.activeYear,
        visibleYearsNumber: this.visibleYearsNumber,
        min: this.min,
        max: this.max,
      });
    },
  },
  watch: {
    active: {
      handler (value) {
        if (!value || this.range) return;
        setTimeout(this.computeScrollPosition);
      },
      immediate: true,
    },
  },
  methods: {
    // ------------------------------
    // States
    // ------------------------------
    isCurrent (year) {
      const selectedDate = generateDateWithYearAndMonth({
        year,
        month: 0,
        locale: this.currentLocale,
      });

      return isCurrent({
        date: selectedDate,
        type: 'year',
        locale: this.currentLocale,
      });
    },
    isSelected (year) {
      return this.activeYear === String(year);
    },
    isAllowed (year) {
      const date = generateDateWithYearAndMonth({ year, month: 0, locale: this.currentLocale });
      return isDateAllowed({
        date,
        min: this.min,
        max: this.max,
        type: 'year',
        allowedFn: this.allowedDates,
      });
    },
    // ------------------------------
    // Scroll position
    // ------------------------------
    computeScrollPosition () {
      const activeItem = this.$el.getElementsByClassName('active')[0];
      this.$el.scrollTop = computeYearsScrollPosition({
        activeItem,
        container: this.$el,
        min: this.min,
        max: this.max,
      });
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genYearButton (year) {
      const isCurrent = this.isCurrent(year) && !this.isSelected(year);
      const isSelected = this.isSelected(year);

      return this.$createElement('li', {
        key: year,
        staticClass: 'vd-picker__years-button',
        class: {
          'active': this.isSelected(year),
        },
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
          disabled: !this.isAllowed(year),
        },
        on: {
          click: () => this.$emit('input', year, 'year'),
        },
      }, [year]);
    },
  },
  render (h) {
    return h('ul', {
      staticClass: 'vd-picker__years',
    }, this.getYears.map(year => this.genYearButton(year)));
  },
});
