// Styles
import './VDPickerControls.scss';

// Mixins
import colorable from '../../../mixins/colorable';

// Components
import VDIcon from '../../VDIcon';

// Functions
import {
  isBeforeDate,
  isAfterDate,
} from '../utils/helpers';

// Helpers
import mixins from '../../../utils/mixins';

const baseMixins = mixins(
  colorable,
);

export default baseMixins.extend({
  name: 'VDPickerControls',
  props: {
    pickerDate: { type: Object, required: true },
    transitionName: { type: String },
    color: { type: String },
    mode: { type: String, default: 'date' },
    min: { type: [String, Number, Date] },
    max: { type: [String, Number, Date] },
  },
  computed: {
    monthFormatted () {
      return this.pickerDate.getMonthFormatted();
    },
    yearFormatted () {
      return this.pickerDate.getYearFormatted();
    },
    isPreviousDateDisabled () {
      const compareYears = ['month', 'quarter'].includes(this.mode);
      // If active mode is month or quater, controls will show year.
      // If active mode is date, controls will show month - year
      const previousYear = parseInt(this.yearFormatted, 10) - 1;
      const previousDate = compareYears ? previousYear : `${this.yearFormatted}-${this.pickerDate.month}`;

      return isBeforeDate(previousDate, this.min, compareYears ? 'year' : 'month');
    },
    isNextDateDisabled () {
      const compareYears = ['month', 'quarter'].includes(this.mode);
      // If active mode is month or quater, controls will show year.
      // If active mode is date, controls will show month - year
      const nextYear = parseInt(this.yearFormatted, 10) + 1;
      const nextDate = compareYears ? nextYear : `${this.yearFormatted}-${this.pickerDate.month + 2}`;
      return isAfterDate(nextDate, this.max, compareYears ? 'year' : 'month');
    },
  },
  methods: {
    // ------------------------------
    // Events
    // ------------------------------
    onNavigationClick (direction) {
      this.$emit('on-navigation-click', direction);
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genPrevButton () {
      const icon = this.$createElement(VDIcon, 'chevronLeft');

      return this.$createElement('button', {
        staticClass: 'vd-picker__controls-prev',
        attrs: {
          disabled: this.isPreviousDateDisabled,
          type: 'button',
        },
        on: {
          click: () => this.onNavigationClick('prev'),
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
          click: () => this.onNavigationClick('next'),
        },
      }, [icon]);
    },
    genSelectors () {
      return this.$createElement('div', {
        staticClass: 'vd-picker__controls-wrapper',
      }, [
        this.mode === 'date' && this.genMonthSelector(),
        this.genYearSelector(),
      ]);
    },
    genChildrenSelectors ({ value, key, type }) {
      return this.$createElement('div', this.setTextColor(this.color, {
        key,
        staticClass: 'vd-picker__controls-label',
      }), [this.$createElement('button', {
        attrs: { type: 'button' },
        on: { click: () => this.$emit('update-mode', type) },
      }, [value])]);
    },
    genMonthSelector () {
      return this.$createElement('transition-group', {
        staticClass: 'vd-picker__controls-month',
        props: {
          name: this.transitionName,
          tag: 'span',
        },
      }, [this.pickerDate.month].map(key =>
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
          'vd-picker__controls-year--center': ['month', 'quarter'].includes(this.mode),
        },
        props: {
          name: this.transitionName,
          tag: 'span',
        },
      }, [this.pickerDate.year].map(key =>
        this.genChildrenSelectors({
          value: this.yearFormatted,
          key,
          type: 'year',
        }))
      );
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'vd-picker__controls',
    }, [
      this.genPrevButton(),
      this.genSelectors(),
      this.genNextButton(),
    ]);
  },
});
