<script>
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

// mixins
import colorable from '../../mixins/colorable';

// components
import DatePickerControls from './DatePickerControls.vue';
import DatePickerHeader from './DatePickerHeader.vue';
import DatePickerPresets from './DatePickerPresets.vue';
import DatePickerTableDate from './DatePickerTableDate.vue';
import DatePickerValidate from './DatePickerValidate.vue';
import DatePickerYearMonth from './DatePickerYearMonth.vue';
import VDIcon from '../VDIcon';

// functions
import Dates, {
  formatDateWithYearAndMonth,
  isBeforeDate,
  isAfterDate,
  isDateAfter,
  formatDate,
  generateMonthAndYear,
  convertQuarterToMonth,
} from '../../utils/Dates';
import { computeAgendaHeight } from '../../utils/positions';

// constants
import { yearMonthSelectorTypes } from '../../constants';

export default {
  name: 'DatePickerAgenda',
  mixins: [colorable],
  props: {
    activeBottomSheet: { type: Boolean, default: false },
    allowedDates: { type: Function },
    buttonCancel: { type: String },
    buttonValidate: { type: String },
    color: { type: String },
    date: { type: [Date, Object] },
    formatHeader: { type: String },
    locale: { type: Object },
    maxDate: { type: [String, Number, Date] },
    minDate: { type: [String, Number, Date] },
    name: { type: String },
    noHeader: { type: Boolean, default: false },
    range: { type: Boolean, default: false },
    rangeHeaderText: { type: String, default: String },
    rangePresets: { type: Array, default: undefined },
    rtl: { type: Boolean, default: false },
    type: { type: String, default: 'date' },
    validate: { type: Boolean, default: false },
    value: { type: Boolean, default: false },
    visibleYearsNumber: { type: Number },
  },
  data: () => ({
    height: 'auto',
    // currentDate stores start & end date for showed month
    currentDate: undefined,
    // mutableDate stores selected date
    mutableDate: undefined,
    transitionDaysName: 'slide-h-next',
    transitionLabelName: 'slide-v-next',
    shouldShowYearMonthSelector: undefined,
    yearMonthMode: undefined,
  }),
  computed: {
    styles () {
      return {
        height: this.height,
      };
    },
    classes () {
      return {
        'datepicker--rtl': this.rtl,
        'datepicker--bottomsheet': this.activeBottomSheet,
        'datepicker--no-header': this.noHeader,
        'datepicker--validate': this.validate,
        'datepicker--range': this.range,
        'datepicker--range-selecting': this.range && !this.isRangeSelected,
      };
    },
    isRangeSelected () {
      if (!this.range) return false;
      return typeof this.mutableDate === 'object' &&
        Object.values(this.mutableDate).every(date => Boolean(date));
    },
  },
  created () {
    this.initAgenda();
  },
  beforeDestroy () {
    clearAllBodyScrollLocks();
  },
  watch: {
    value: 'initAgenda',
    // When, date change (after being visibled),
    // should update currentDate & mutableDate
    date: 'updateDate',
    // When type change (after being visibled),
    // should update shouldShowYearMonthSelector
    type (newType) {
      this.shouldShowYearMonthSelector = yearMonthSelectorTypes.includes(newType);
      this.yearMonthMode = newType;
    },
    // When activeBottomSheet is visibled => lock body scroll
    // When activeBottomSheet is hidden => unlock body scroll
    activeBottomSheet: {
      async handler (show) {
        await this.$nextTick();

        if (show) {
          this.height = `${computeAgendaHeight(this.$refs.datepicker, this.classWeeks)}px`;
          disableBodyScroll(this.$refs.body);
          return;
        }

        this.height = 'auto';
        enableBodyScroll();
      },
      immediate: true,
    },
    // When activeBottomSheet is visibled and visibled mode is 'year'
    // => should keep scroll disabled, but should allow scroll into years list
    yearMonthMode (mode) {
      if (mode === 'year' && this.activeBottomSheet) {
        enableBodyScroll(this.$refs.body);
        disableBodyScroll(this.$el.querySelector('.datepicker-year-month'));
      }
    },
  },
  methods: {
    initAgenda () {
      this.updateDate(this.date);
      this.shouldShowYearMonthSelector = yearMonthSelectorTypes.includes(this.type);
      this.yearMonthMode = this.type;
    },
    updateTransitions (direction) {
      this.transitionDaysName = `slide-h-${direction}`;
      this.transitionLabelName = `slide-v-${direction}`;
    },
    // ------------------------------
    // Handle dates change
    // ------------------------------
    reOrderSelectedDate (newDate) {
      if (!this.mutableDate) return;
      // Should update mutableDate if
      // -> hovered day is before or after current selected date
      if (isBeforeDate(newDate, this.mutableDate.start)) {
        this.mutableDate = { start: undefined, end: this.mutableDate.start };
      } else if (isAfterDate(newDate, this.mutableDate.end)) {
        this.mutableDate = { start: this.mutableDate.end, end: undefined };
      }
    },
    selectDate (day) {
      if (this.range) {
        // If rangeIsSelected or no dates selected => should reset, and select start
        if (this.isRangeSelected || (!this.mutableDate.start && !this.mutableDate.end)) {
          this.mutableDate = { start: day.clone(), end: undefined };
          return;
        }
        // else, should update missing range (start or end)
        this.reOrderSelectedDate(day);
        this.emitSelectedDate({
          ...this.mutableDate,
          ...(this.mutableDate.start && { end: day.clone() }),
          ...(this.mutableDate.end && { start: day.clone() }),
        });
        return;
      }

      const direction = isDateAfter(day, this.mutableDate) ? 'next' : 'prev';
      this.updateTransitions(direction);
      this.emitSelectedDate(day.clone());
    },
    emitSelectedDate (date) {
      // If range, when a preset is selected,
      // should transition to end date month
      if (this.range) {
        this.currentDate = new Dates(date.end.month(), date.end.year(), this.locale);
      }

      this.mutableDate = date;
      this.$emit('selectDate', this.mutableDate);
    },
    updateDate (date) {
      let newDate = formatDate(this.range ? (date.end || date.start) : date, this.locale);

      // If today's date is after maxDate, we should show maxDate month
      if (isAfterDate(newDate, this.maxDate)) {
        newDate = formatDate(this.maxDate, this.locale);
      }

      if (this.range) {
        this.currentDate = new Dates(newDate.month(), newDate.year(), this.locale);
        this.mutableDate = date;
        return;
      }

      let month = this.type === 'quarter' ? convertQuarterToMonth(newDate.month()) : newDate.month();
      this.currentDate = new Dates(month, newDate.year(), this.locale);
      this.mutableDate = date && date.month(month).clone();
    },
    changeMonth (direction) {
      let month = this.currentDate.month + (direction === 'prev' ? -1 : +1);
      let year = this.currentDate.year;
      if (month > 11 || month < 0) {
        year += (direction === 'prev' ? -1 : +1);
        month = (direction === 'prev' ? 11 : 0);
      }
      this.updateTransitions(direction);
      this.currentDate = new Dates(month, year, this.locale);
    },
    changeYear (direction) {
      let year = this.currentDate.year + (direction === 'prev' ? -1 : +1);
      const month = this.currentDate.month;
      this.updateTransitions(direction);
      this.currentDate = new Dates(month, year, this.locale);
    },
    // ------------------------------
    // Handle Year/Month/Quarter
    // ------------------------------
    showYearMonthSelector (mode) {
      this.yearMonthMode = mode;
      this.shouldShowYearMonthSelector = true;
    },
    hideYearMonthSelector () {
      this.yearMonthMode = undefined;
      this.shouldShowYearMonthSelector = false;
    },
    selectedYearMonth (value, mode) {
      const { year, month } = generateMonthAndYear(value, this.currentDate, mode);
      this.currentDate = new Dates(month, year, this.locale);

      // When selecting a year, it should show month selector
      // unless type is year
      if (mode === 'year' && this.type !== 'year') {
        this.yearMonthMode = this.type === 'date' ? 'month' : this.type;
        return;
      }

      // When type is month|quarter|year
      // Should emit date selected if it's not type date
      if (this.type !== 'date') {
        const newDate = formatDateWithYearAndMonth(this.currentDate.year, this.currentDate.month);
        this.selectDate(newDate);
        return;
      }

      // Should hide yearMonth panels when type is date
      this.hideYearMonthSelector();
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genContent () {
      return [
        this.activeBottomSheet && this.genTitle(),
        !this.noHeader && this.genHeader(),
        this.range && this.genPresets(),
        this.genBody(),
        this.validate && this.genValidate(),
      ];
    },
    genTitle () {
      const title = this.$createElement('p', this.name);
      const icon = this.$createElement(VDIcon, {
        on: {
          click: () => this.$emit('close'),
        },
      }, ['close']);

      return this.$createElement('div', {
        staticClass: 'datepicker__title',
      }, [
        title,
        this.$createElement('div', {
          staticClass: 'datepicker__title-close',
        }, [icon]),
      ]);
    },
    genHeader () {
      return this.$createElement(DatePickerHeader, {
        props: {
          color: this.color,
          formatHeader: this.formatHeader,
          locale: this.locale,
          mode: this.yearMonthMode,
          mutableDate: this.mutableDate,
          range: this.range,
          rangeHeaderText: this.rangeHeaderText,
          transitionName: this.transitionLabelName,
          type: this.type,
        },
        on: {
          hideYearMonthSelector: this.hideYearMonthSelector,
          showYearMonthSelector: this.showYearMonthSelector,
        },
      });
    },
    genPresets () {
      return this.$createElement(DatePickerPresets, {
        props: {
          rangePresets: this.rangePresets,
          mutableDate: this.mutableDate,
          minDate: this.minDate,
          maxDate: this.maxDate,
          color: this.color,
          locale: this.locale,
        },
        on: {
          updateRange: this.emitSelectedDate,
        },
      });
    },
    genBody () {
      const children = [
        this.genControls(),
        this.genTableDate(),
        this.shouldShowYearMonthSelector && this.genYearMonth(),
      ];

      return this.$createElement('div', {
        staticClass: 'datepicker__body',
        ref: 'body',
      }, children);
    },
    genControls () {
      return this.$createElement(DatePickerControls, {
        props: {
          currentDate: this.currentDate,
          transitionName: this.transitionLabelName,
          color: this.color,
          mode: 'month',
        },
        on: {
          changeVisibleDate: this.changeMonth,
          showYearMonthSelector: this.showYearMonthSelector,
        },
      });
    },
    genTableDate () {
      return this.$createElement(DatePickerTableDate, {
        props: {
          allowedDates: this.allowedDates,
          color: this.color,
          currentDate: this.currentDate,
          isRangeSelected: this.isRangeSelected,
          locale: this.locale,
          maxDate: this.maxDate,
          minDate: this.minDate,
          mutableDate: this.mutableDate,
          range: this.range,
          rtl: this.rtl,
          shouldShowYearMonthSelector: this.shouldShowYearMonthSelector,
          transitionName: this.transitionDaysName,
        },
        on: {
          changeMonth: this.changeMonth,
          reOrderSelectedDate: this.reOrderSelectedDate,
          selectDate: this.selectDate,
        },
      });
    },
    genYearMonth () {
      return this.$createElement(DatePickerYearMonth, {
        props: {
          active: this.shouldShowYearMonthSelector,
          color: this.color,
          currentDate: this.currentDate,
          maxDate: this.maxDate,
          minDate: this.minDate,
          mode: this.yearMonthMode,
          mutableDate: this.mutableDate,
          range: this.range,
          showYearMonthSelector: this.showYearMonthSelector,
          transitionName: this.transitionDaysName,
          visibleYearsNumber: this.visibleYearsNumber,
        },
        on: {
          changeYear: this.changeYear,
          selectedYearMonth: this.selectedYearMonth,
        },
      });
    },
    genValidate () {
      return this.$createElement(DatePickerValidate, {
        props: {
          buttonValidate: this.buttonValidate,
          buttonCancel: this.buttonCancel,
          color: this.color,
          mutableDate: this.mutableDate,
          range: this.range,
        },
        on: {
          cancel: () => this.$emit('close'),
          validate: () => this.$emit('validateDate'),
        },
      });
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'datepicker',
      class: this.classes,
      style: this.styles,
      ref: 'datepicker',
    }, this.genContent());
  },
};
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss',
            '../../styles/base/_transitions.scss';

  .datepicker,
  .datepicker *,
  .datepicker ::before,
  .datepicker ::after {
    box-sizing: border-box;
  }

  .datepicker {
    display: flex;
    flex-direction: column;
    width: get-size(mobile, width);
    background-color: white;
    border-radius: get-border-radius(2);
    box-shadow: 0 2px 8px rgba(50, 50, 93, 0.2);

    &:focus,
    &:active {
      outline: 0;
    }

    @include mq(tablet) {
      width: get-size(desktop, width);
    }

    &--bottomsheet {
      @include mq($to: phone) {
        width: 100%;

        .datepicker-header {
          border-radius: 0;
        }
      }
    }

    /* Title
    ---------------------- */
    &__title {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: get-size(mobile, title);
      padding: 0 0 0 $gutter*3;
      border-radius: get-border-radius(4) get-border-radius(4) 0 0;

      .datepicker--rtl & {
        direction: rtl;
        padding: 0 $gutter*3 0 0;
      }

      @include mq(phone) {
        display: none;
      }

      p {
        margin: 0;
      }

      &-close {
        position: relative;
        display: flex;
        align-items: center;
        flex: 0 0 40px;
        height: get-size(mobile, controls);
        width: get-size(mobile, controls);
        padding: 0 $gutter*2 0 $gutter;
        border: none;
        outline: none;
        background-color: transparent;
        user-select: none;

        @include mq(tablet) {
          height: get-size(desktop, controls);
          width: get-size(desktop, controls);
        }

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }

    /* Body
    ---------------------- */
    &__body {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
    }
  }
</style>
