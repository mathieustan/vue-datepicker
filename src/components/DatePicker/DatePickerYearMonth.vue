<script>
// mixins
import colorable from '../../mixins/colorable';

// components
import DatePickerControls from './DatePickerControls.vue';

// functions
import {
  formatDateWithYearAndMonth,
  isBeforeDate,
  isAfterDate,
  areSameDates,
} from '../../utils/Dates';

import { computeYearsScrollPosition } from '../../utils/positions';

export default {
  name: 'DatePickerYearMonth',
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
      const selectedDate = formatDateWithYearAndMonth(this.currentDate.year, monthIndex);
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
      const date = formatDateWithYearAndMonth(this.yearFormatted, monthIndex);
      return isBeforeDate(date, this.minDate, 'month') ||
        isAfterDate(date, this.maxDate, 'month');
    },
    // ------------------------------
    // Scroll position
    // ------------------------------
    computeScrollPosition () {
      const activeItem = this.$el.querySelector('button.active');
      if (!activeItem || this.mode !== 'year') return;

      // should scroll to active year
      const containerToScroll = this.$el.querySelector('.vd-selects__years-wrapper');
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
        staticClass: 'vd-selects__years-list',
      }, this.getYears.map(year => this.genYearButton(year)));
      const yearsWrapper = this.$createElement('div', {
        staticClass: 'vd-selects__years-wrapper',
      }, [yearsList]);

      return this.$createElement('div', {
        staticClass: 'vd-selects__years',
      }, [yearsWrapper]);
    },
    genYearButton (year) {
      return this.$createElement('button', {
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
    },
    // -- Month or Quarter
    genMonthOrQuarter () {
      return this.$createElement('div', {
        staticClass: 'vd-selects__wrapper',
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
        staticClass: 'vd-selects__inner',
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
        staticClass: 'vd-selects__months',
        key,
      }, [
        this.getMonths.map((month, index) => this.genMonthQuarterButton(month, mode, index)),
      ]);
    },
    genQuarterList (key, mode) {
      return this.$createElement('div', {
        staticClass: 'vd-selects__quarters',
        key,
      }, [
        this.getQuarters.map((quarter, index) => this.genMonthQuarterButton(quarter, mode, index)),
      ]);
    },
    genMonthQuarterButton (value, mode, index) {
      const selectedIndex = mode === 'quarter' ? index * 3 : index;
      return this.$createElement('button', {
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
    },
  },
  render (h) {
    const children = h('div', { staticClass: 'vd-selects' }, [this.genContent()]);
    return h('transition', {
      props: { name: 'yearMonth' },
    }, [children]);
  },
};
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss',
            '../../styles/base/_transitions.scss';

  .vd-selects {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;

    // Browsers which partially support CSS Environment variables (iOS 11.0-11.2).
    @supports (padding-bottom: constant(safe-area-inset-bottom)) {
      --safe-area-inset-bottom: constant(safe-area-inset-bottom);
      padding-bottom: var(--safe-area-inset-bottom);
    }

    // Browsers which fully support CSS Environment variables (iOS 11.2+).
    @supports (padding-bottom: env(safe-area-inset-bottom)) {
      --safe-area-inset-bottom: env(safe-area-inset-bottom);
      padding-bottom: var(--safe-area-inset-bottom);
    }

    &__years {
      position: relative;
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      width: 100%;
      z-index: 0;
      overflow: hidden;

      .datepicker--validate & {
        border-bottom: 1px solid color(other, light-gray);
      }

      &-wrapper {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        padding: $gutter;
        overflow-y: scroll; /* has to be scroll, not auto */
        -webkit-overflow-scrolling: touch;
      }

      &-list {
        position: relative;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: fit-content;
        grid-gap: $gutter;
        width: 100%;
        align-items: center;

        button {
          position: relative;
          @extend %reset-button;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          padding: 0 20px;
          height: 40px;
          min-height: 40px;
          width: 100%;
          font-size: 15px;
          font-weight: get-font-weight(medium);
          border-radius: 2px;
          outline: none;
          transition: background-color .3s;

          &:hover {
            background-color: color(other, light-gray);
          }

          &:disabled,
          &[disabled] {
            cursor: default;
            color: rgba(0,0,0,0.26);
          }

          .datepicker-month--current {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 100%;
            height: 30px;
            background-color: currentColor;
          }
        }
      }
    }

    &__wrapper {
      height: auto;
      overflow: hidden;
      position: relative;
      z-index: 0;
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
    }

    &__inner {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 0 $gutter $gutter;
    }

    &__months,
    &__quarters {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, 1fr);
      grid-gap: $gutter;
      width: 100%;
      height: 100%;
      justify-items: center;
      align-items: center;

      .datepicker--rtl & {
        direction: rtl;
      }

      button {
        position: relative;
        @extend %reset-button;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        padding: 0 20px;
        height: 30px;
        font-size: 15px;
        font-weight: get-font-weight(medium);
        border-radius: 2px;
        outline: none;
        transition: background-color .3s;

        &:hover {
          background-color: color(other, light-gray);
        }

        &:disabled,
        &[disabled] {
          cursor: default;
          color: rgba(0,0,0,0.26);
        }
      }

      &--current {
        border: 1px solid currentColor !important;
      }
    }

    &__quarters {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);

      button {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
