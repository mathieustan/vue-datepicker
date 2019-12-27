<script>
// mixins
import colorable from '../../mixins/colorable';

// functions
import { formatDateWithLocale, getRangeDatesFormatted } from '../../utils/Dates';

// constants
import { DATE_HEADER_REGEX } from '../../constants';

export default {
  name: 'DatePickerHeader',
  mixins: [colorable],
  props: {
    mutableDate: { type: [String, Object] },
    transitionName: { type: String },
    color: { type: String },
    locale: { type: Object },
    formatHeader: { type: String },
    mode: { type: String },
    range: { type: Boolean },
    rangeHeaderText: { type: String },
  },
  computed: {
    classes () {
      return {
        'datepicker-header--range': this.range,
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
  },
  methods: {
    // ------------------------------
    // Generate Template
    // ------------------------------
    genYear () {
      const children = this.$createElement('span', {
        staticClass: 'datepicker-header__year-button',
        on: {
          click: () => this.$emit('showYearMonthSelector', 'year'),
        },
      }, [this.year]);

      const data = {
        staticClass: 'datepicker-header__year',
        class: {
          'datepicker-header__year--active': this.mode === 'year',
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
        staticClass: 'datepicker-header__wrap',
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
        staticClass: 'datepicker-header__wrap',
      }, [
        transitionGroupStart,
        transitionGroupEnd,
      ]);
    },
    genTransitionGroup ({ date, isActive, onClick }) {
      const children = (date) => this.$createElement('span', {
        staticClass: 'datepicker-header__wrap-button',
        key: date,
        on: {
          ...(onClick && { click: onClick }),
        },
      }, [date]);

      return this.$createElement('transition-group', {
        staticClass: 'datepicker-header__date',
        class: { 'datepicker-header__date--active': isActive },
        props: {
          name: this.transitionName,
          tag: 'div',
        },
      }, [date].map(key => children(key)));
    },
  },
  render (h) {
    return h('div', this.setBackgroundColor(this.color, {
      staticClass: 'datepicker-header',
      class: this.classes,
    }), [
      !this.range && this.genYear(),
      !this.range && this.genDate(),
      this.range && this.genRangeDate(),
    ]);
  },
};
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss',
            '../../styles/base/_transitions.scss';

  .datepicker-header {
    color: white;
    padding: ($gutter*2);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    line-height: 1;
    min-height: get-size(mobile, header);
    max-height: get-size(mobile, header);
    border-radius: get-border-radius(2) get-border-radius(2) 0 0;

    .datepicker--rtl & {
      direction: rtl;
    }

    @include mq(tablet) {
      min-height: get-size(desktop, header);
      max-height: get-size(desktop, header);
    }

    &--range {
      .datepicker-header__wrap {
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: space-between;
      }
      .datepicker-header__date {
        font-size: 18px;
        height: calc(18px + #{$gutter});

        @include mq(tablet) {
          font-size: 22px;
          height: calc(22px + #{$gutter});
        }
      }
    }

    &__year {
      align-items: center;
      display: inline-flex;
      font-size: 14px;
      margin-bottom: $gutter;
      opacity: 0.6;
      transition: opacity .3s;

      &:hover:not(&--active),
      &:focus:not(&--active) {
        cursor: pointer;
        opacity: 1;
      }

      &--active {
        opacity: 1;
        cursor: default;
      }
    }

    &__wrap {
      position: relative;
      display: flex;
      width: 100%;
    }

    &__date {
      position: relative;
      display: flex;
      width: 100%;
      font-size: 22px;
      height: calc(22px + #{$gutter});
      text-align: left;
      overflow: hidden;
      padding-bottom: $gutter;
      margin-bottom: -#{$gutter};
      opacity: 0.6;
      transition: opacity .3s;

      &:hover:not(&--active),
      &:focus:not(&--active) {
        cursor: pointer;
        opacity: 1;
      }

      &--active {
        opacity: 1;
        cursor: default;
      }

      @include mq(tablet) {
        font-size: 24px;
        height: calc(24px + #{$gutter});
      }
    }
  }
</style>
