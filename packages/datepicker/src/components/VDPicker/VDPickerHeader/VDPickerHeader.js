// Styles
import './VDPickerHeader.scss';

// Mixins
import colorable from '../../../mixins/colorable';

import mixins from '../../../utils/mixins';

const baseMixins = mixins(
  colorable,
);

export default baseMixins.extend({
  name: 'VDPickerHeader',
  props: {
    formattedHeaderYear: { type: String },
    formattedHeaderDate: { type: [Array, String] },
    color: { type: String },
    mode: { type: String },
    mutableDate: { type: [String, Object] },
    range: { type: Boolean },
    transitionName: { type: String },
    type: { tpye: Boolean },
  },
  computed: {
    classes () {
      return {
        'vd-picker-header--range': this.range,
        [`vd-picker-header--${this.type}`]: this.type,
      };
    },
    year () {
      if (!this.mutableDate) return '-';
      return this.formattedHeaderYear;
    },
    dateFormatted () {
      return this.formattedHeaderDate;
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
        staticClass: 'vd-picker-header__year-button',
        on: {
          click: () => this.$emit('update-mode', 'year'),
        },
      }, [this.year]);

      const data = {
        staticClass: 'vd-picker-header__year',
        class: {
          'vd-picker-header__year--active': this.mode === 'year',
        },
      };

      return this.$createElement('div', data, [children]);
    },
    genDate () {
      const transitionGroup = this.genTransitionGroup({
        date: this.dateFormatted,
        isActive: this.mode !== 'year',
        onClick: () => this.$emit('update-mode', 'date'),
      });

      return this.$createElement('div', {
        staticClass: 'vd-picker-header__wrap',
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
        staticClass: 'vd-picker-header__wrap',
      }, [
        transitionGroupStart,
        transitionGroupEnd,
      ]);
    },
    genTransitionGroup ({ date, isActive, onClick }) {
      const children = (date) => this.$createElement('span', {
        staticClass: 'vd-picker-header__wrap-button',
        key: date,
        on: {
          ...(onClick && { click: onClick }),
        },
      }, [date]);

      return this.$createElement('transition-group', {
        staticClass: 'vd-picker-header__date',
        class: { 'vd-picker-header__date--active': isActive },
        props: {
          name: this.transitionName,
          tag: 'div',
        },
      }, [date].map(key => children(key)));
    },
  },
  render (h) {
    return h('div', this.setBackgroundColor(this.color, {
      staticClass: 'vd-picker-header',
      class: this.classes,
    }), [
      !this.range && this.genYear(),
      this.isDateVisible && this.genDate(),
      this.range && this.genRangeDate(),
    ]);
  },
});
