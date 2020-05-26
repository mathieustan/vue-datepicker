// Styles
import './VDPickerHeader.scss';

// Mixins
import colorable from '../../../mixins/colorable';

// Functions
import { formatDateWithLocale, getRangeDatesFormatted } from '../../../utils/Dates';

// Constants
import { DATE_HEADER_REGEX } from '../../../constants';

export default {
  name: 'VDPickerHeader',
  mixins: [colorable],
  props: {
    color: { type: String },
    formatHeader: { type: String },
    locale: { type: Object },
    mode: { type: String },
    mutableDate: { type: [String, Object] },
    range: { type: Boolean },
    rangeHeaderText: { type: String },
    transitionName: { type: String },
    type: { type: String },
  },
  computed: {
    classes () {
      return {
        'vd-picker__header--range': this.range,
        [`vd-picker__header--${this.type}`]: this.type,
      };
    },
    year () {
      if (!this.mutableDate) return '-';
      return formatDateWithLocale(this.mutableDate, this.locale, 'YYYY');
    },
    dateFormatted () {
      if (this.range && this.rangeHeaderText) {
        const [startDate, endDate] = getRangeDatesFormatted(this.mutableDate, this.locale, this.formatHeader).split(' ~ ');
        const [fromText, toText] = this.rangeHeaderText
          .replace(DATE_HEADER_REGEX, `${startDate}|`)
          .replace(DATE_HEADER_REGEX, `${endDate}|`)
          .split('|');
        return [fromText.trim(), toText.trim()];
      }
      if (!this.mutableDate) return '--';
      return formatDateWithLocale(this.mutableDate, this.locale, this.formatHeader);
    },
    isDateVisible () {
      // Should hide year when type is year
      // we'll show year in date block
      return !this.range && this.type !== 'year';
    },
  },
  methods: {
    // ------------------------------
    // Generate Template
    // ------------------------------
    genYear () {
      const children = this.$createElement('span', {
        staticClass: 'vd-picker__header-year__button',
        on: {
          click: () => this.$emit('showYearMonthSelector', 'year'),
        },
      }, [this.year]);

      const data = {
        staticClass: 'vd-picker__header-year',
        class: {
          'vd-picker__header-year--active': this.mode === 'year',
        },
      };

      return this.$createElement('div', data, [children]);
    },
    genDate () {
      const transitionGroup = this.genTransitionGroup({
        date: this.dateFormatted,
        isActive: this.mode !== 'year',
        onClick: () => this.$emit('hideYearMonthSelector'),
      });

      return this.$createElement('div', {
        staticClass: 'vd-picker__header-wrap',
      }, [transitionGroup]);
    },
    genRangeDate () {
      const transitionGroupStart = this.genTransitionGroup({
        date: this.dateFormatted[0],
        isActive: Boolean(this.mutableDate.start),
      });
      const transitionGroupEnd = this.genTransitionGroup({
        date: this.dateFormatted[1],
        isActive: Boolean(this.mutableDate.end),
      });

      return this.$createElement('div', {
        staticClass: 'vd-picker__header-wrap',
      }, [
        transitionGroupStart,
        transitionGroupEnd,
      ]);
    },
    genTransitionGroup ({ date, isActive, onClick }) {
      const children = (date) => this.$createElement('span', {
        staticClass: 'vd-picker__header-wrap__button',
        key: date,
        on: {
          ...(onClick && { click: onClick }),
        },
      }, [date]);

      return this.$createElement('transition-group', {
        staticClass: 'vd-picker__header-date',
        class: { 'vd-picker__header-date--active': isActive },
        props: {
          name: this.transitionName,
          tag: 'div',
        },
      }, [date].map(key => children(key)));
    },
  },
  render (h) {
    return h('div', this.setBackgroundColor(this.color, {
      staticClass: 'vd-picker__header',
      class: this.classes,
    }), [
      !this.range && this.genYear(),
      this.isDateVisible && this.genDate(),
      this.range && this.genRangeDate(),
    ]);
  },
};
