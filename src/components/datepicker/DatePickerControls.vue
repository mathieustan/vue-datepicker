<script>
// mixins
import colorable from '../../mixins/colorable';

// components
import Icon from '../Icon';

// functions
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
      const icon = this.$createElement(Icon, 'chevronLeft');

      return this.$createElement('button', {
        staticClass: 'datepicker__controls-prev',
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
      const icon = this.$createElement(Icon, 'chevronRight');

      return this.$createElement('button', {
        staticClass: 'datepicker__controls-next',
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
        staticClass: 'datepicker__controls-wrapper',
      }, [
        this.mode === 'month' && this.genMonthSelector(),
        this.genYearSelector(),
      ]);
    },
    genChildrenSelectors ({ value, key, type, disabled }) {
      return this.$createElement('div', this.setTextColor(this.color, {
        key,
        staticClass: 'datepicker__controls-label',
      }), [this.$createElement('button', {
        attrs: { type: 'button', disabled },
        on: { click: () => this.showYearMonthSelector(type) },
      }, [value])]);
    },
    genMonthSelector () {
      return this.$createElement('transition-group', {
        staticClass: 'datepicker__controls-month',
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
        staticClass: 'datepicker__controls-year',
        class: {
          'datepicker__controls-year--center': this.mode === 'year',
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
      staticClass: 'datepicker__controls',
    }, this.genContent());
  },
};
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss',
            '../../styles/base/_animations.scss';

  .datepicker__controls {
    position: relative;
    display: flex;
    height: get-size(mobile, controls);
    text-align: center;
    position: relative;
    width: 100%;

    @include mq(tablet) {
      height: get-size(desktop, controls);
    }

    &-wrapper {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }

    &-month,
    &-year {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
    }

    &-month {
      justify-content: flex-end;
    }

    &-year {
      justify-content: flex-start;

      &.datepicker__controls-year--center {
        justify-content: center;
      }
    }

    &-label {
      padding: $gutter $gutter/2;

      button {
        @extend %reset-button;
        position: relative;
        display: flex;
        font-size: 15px;
        font-weight: get-font-weight(medium);
        line-height: 15px;
        padding: 0;
        border: none;
        outline: none;
        transition: color 300ms;

        &:not(:hover):not(:focus) {
          color: rgba(0,0,0,.87);
        }

        &:disabled,
        &[disabled] {
          cursor: default;
          color: rgba(0,0,0,0.26);
        }
      }
    }

    button.datepicker__controls-prev,
    button.datepicker__controls-next {
      position: relative;
      flex: 0 0 40px;
      height: get-size(mobile, controls);
      width: get-size(mobile, controls);
      padding: 0 0 0 $gutter*3;
      border: none;
      outline: none;
      color: rgba(0, 0, 0, 0.87);
      background-color: transparent;
      user-select: none;
      cursor: pointer;

      @include mq(tablet) {
        padding: 0 $gutter 0 $gutter;
        height: get-size(desktop, controls);
        width: get-size(desktop, controls);
      }

      &:disabled,
      &[disabled] {
        svg {
          color: rgba(0,0,0,0.26);
        }
        cursor: default;
      }

      .datepicker--rtl & {
        transform: rotate(180deg);
      }
    }

    button.datepicker__controls-next {
      padding: 0 $gutter*3 0 0;

      @include mq(tablet) {
        padding: 0 $gutter 0 $gutter;
      }
    }

    svg {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
  }
</style>

