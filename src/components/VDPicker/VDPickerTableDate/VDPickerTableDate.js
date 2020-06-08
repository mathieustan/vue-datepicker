// Styles
import './VDPickerTableDate.scss';

// Directives
import Touch from '../../../directives/touch';

// Mixins
import colorable from '../../../mixins/colorable';

// Functions
import {
  getWeekDays,
  isBeforeDate,
  isBetweenDates,
  isDateAllowed,
  isDateToday,
} from '../../../utils/Dates';

// Helpers
import { getSlot } from '../../../utils/helpers';

export default {
  name: 'VDPickerTableDate',
  inject: ['VDPicker'],
  directives: { Touch },
  mixins: [colorable],
  props: {
    allowedDates: { type: Function },
    color: { type: String },
    currentDate: { type: [String, Object] },
    isRangeSelected: { type: Boolean },
    locale: { type: Object },
    maxDate: { type: [String, Number, Date] },
    minDate: { type: [String, Number, Date] },
    mutableDate: { type: [String, Object] },
    range: { type: Boolean },
    rtl: { type: Boolean },
    shouldShowYearMonthSelector: { type: Boolean },
    transitionName: { type: String },
  },
  data: () => ({
    rangeCurrentHoveredDay: undefined,
  }),
  computed: {
    weekDays () {
      return getWeekDays(this.locale);
    },
    spaceBeforeFirstDay () {
      return [...Array(this.currentDate.getWeekStart()).keys()];
    },
    classWeeks () {
      // if yearMonth selector is opened, stop changing class
      if (this.shouldShowYearMonthSelector) return;

      if (this.currentDate.getDays().length + this.currentDate.start.weekday() > 35) {
        return `has-6-weeks`;
      }
      return `has-5-weeks`;
    },
    scopedSlotDay () {
      return getSlot(this.VDPicker, 'day');
    },
  },
  watch: {
    // When currentHoveredDay change, we need to check
    // if hovered day is before/after first selected date
    // Then we swap start / end date according to the result
    rangeCurrentHoveredDay (newHoveredDay) {
      if (!newHoveredDay) return;
      this.$emit('reOrderSelectedDate', newHoveredDay);
    },
  },
  methods: {
    // ------------------------------
    // Set design for day
    // ------------------------------
    isSelected (day) {
      if (this.range) {
        const date = [
          ...(this.mutableDate.start ? [this.mutableDate.start.startOf('day').unix()] : []),
          ...(this.mutableDate.end ? [this.mutableDate.end.startOf('day').unix()] : []),
        ];
        return date.includes(day.unix());
      }
      return this.mutableDate && this.mutableDate.startOf('day').unix() === day.unix();
    },
    isBetween (day) {
      if (!this.mutableDate.start && !this.mutableDate.end) return false;
      return isBetweenDates(day, this.mutableDate.start, this.mutableDate.end);
    },
    isInRange (day) {
      if (!this.rangeCurrentHoveredDay) return;

      if (isBeforeDate(this.rangeCurrentHoveredDay, this.mutableDate.end)) {
        return isBetweenDates(day, this.rangeCurrentHoveredDay, this.mutableDate.end);
      }
      return isBetweenDates(day, this.mutableDate.start, this.rangeCurrentHoveredDay);
    },
    firstInRange (day) {
      return this.mutableDate.start && this.mutableDate.start.startOf('day').unix() === day.unix();
    },
    lastInRange (day) {
      return this.mutableDate.end && this.mutableDate.end.startOf('day').unix() === day.unix();
    },
    isDateAllowed (day) {
      return isDateAllowed({
        date: day,
        min: this.minDate,
        max: this.maxDate,
        allowedFn: this.allowedDates,
      });
    },
    isDisabled (day) {
      return !this.isDateAllowed(day);
    },
    isToday (day) {
      return isDateToday(day);
    },
    // ------------------------------
    // Events
    // ------------------------------
    onDayClick (day) {
      // Should reset current hovered days when selecting a date
      this.rangeCurrentHoveredDay = undefined;
      this.$emit('selectDate', day);
    },
    handleMouseMove (event) {
      // Should handle mouse move if :
      // -> not a range mode
      // -> range already selected
      if (!this.range || this.isRangeSelected) return;
      let target = event.target;

      // Should handle mouse move only on those classes
      const CLASSES = ['vd-picker__table-day', 'vd-picker__table-day-effect'];
      if (
        typeof target.className === 'string' &&
        !CLASSES.includes(target.className.split(' ')[0])
      ) return;

      // If tagName is SPAN, it means we should select parent
      if (target.tagName === 'SPAN') {
        target = event.target.parentNode;
      }

      // Don't do anything if we are on the same day
      const isADate = target.dataset.date;
      const isCurrentHoveredDay = target.dataset.date === this.rangeCurrentHoveredDay;
      /* istanbul ignore next */
      if (!isADate || isCurrentHoveredDay) return;

      this.rangeCurrentHoveredDay = target.dataset.date;
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genContent () {
      return [
        this.genWeek(),
        this.genDaysWrapper(),
      ];
    },
    genWeek () {
      const weekDay = (day, key) => this.$createElement('div', {
        key,
        domProps: {
          innerHTML: day,
        },
        staticClass: 'vd-picker__table-weekday',
      });

      return this.$createElement('div', {
        staticClass: 'vd-picker__table-week',
      }, this.weekDays.map(weekDay));
    },
    genDaysWrapper () {
      return this.$createElement('transition-group', {
        staticClass: 'vd-picker__table-days__wrapper',
        class: this.classWeeks,
        props: {
          name: this.transitionName,
          tag: 'div',
        },
      }, [this.currentDate].map(this.genDays));
    },
    genDays (dates) {
      const blankDay = (day) => this.$createElement('div', {
        staticClass: 'vd-picker__table-day',
        key: `space-${day}`,
      });

      return this.$createElement('div', {
        staticClass: 'vd-picker__table-days',
        key: dates.month,
      }, [
        // Generate blank days
        this.spaceBeforeFirstDay.map(blankDay),
        // Generate days
        this.currentDate.getDays().map(this.genDay),
      ]);
    },
    getDayHelpers (day) {
      const formattedDay = day.format('D');
      const isCurrent = this.isToday(day);
      const isSelected = this.isSelected(day) && !this.isDisabled(day);
      const isBetween = this.range && this.isBetween(day);
      const isInRange = this.range && this.isInRange(day);
      const isFirstRangeDay = this.range && this.firstInRange(day);
      const isLastRangeDay = this.range && this.lastInRange(day) && Boolean(this.mutableDate.end);
      const isFirstSelectedDay = this.range && !this.mutableDate.start;
      const isLastSelectedDay = this.range && this.mutableDate.start && !this.mutableDate.end;
      const isDisabled = this.isDisabled(day);

      return {
        classes: {
          'vd-picker__table-day--selected': isSelected,
          'vd-picker__table-day--between': isBetween,
          'vd-picker__table-day--in-range': isInRange,
          'vd-picker__table-day--first': isFirstRangeDay,
          'vd-picker__table-day--last': isLastRangeDay,
          'vd-picker__table-day--select-start': isFirstSelectedDay,
          'vd-picker__table-day--select-end': isLastSelectedDay,
          'vd-picker__table-day--disabled': isDisabled,
        },
        formattedDay,
        isCurrent,
        isSelected,
        isBetween,
        isInRange,
        isFirstRangeDay,
        isLastRangeDay,
        isFirstSelectedDay,
        isLastSelectedDay,
        isDisabled,
      };
    },
    genDay (day, key) {
      const { classes, ...helpers } = this.getDayHelpers(day);
      // -------------------------------------
      // -- Generate 3 divs
      // 1- Current day effect (bordered circle)
      // 2- Selected day effect  (filled circle)
      // 3- Day number in text
      // -------------------------------------
      const current = this.$createElement('div', { staticClass: 'vd-picker__table-day__current' });
      const effect = this.$createElement('div', { staticClass: 'vd-picker__table-day__effect' });
      const text = this.$createElement('span', { staticClass: 'vd-picker__table-day__text' }, [helpers.formattedDay]);
      // -------------------------------------
      // -- Generate data
      // -------------------------------------
      const dayData = {
        key,
        staticClass: 'vd-picker__table-day',
        class: classes,
        attrs: {
          type: 'button',
          disabled: helpers.isDisabled,
          'data-date': day.format('YYYY-MM-DD'),
        },
        on: {
          click: () => this.onDayClick(day),
        },
      };
      // -------------------------------------
      // -- If there is not scopedSlots date
      // => Show default date style
      // -------------------------------------
      if (!this.scopedSlotDay) {
        const wrapper = this.$createElement('div', {
          staticClass: 'vd-picker__table-day__wrapper',
        }, [
          this.isToday(day) && current,
          effect,
          text,
        ]);
        return this.$createElement('button', this.setTextColor(this.color, dayData), [wrapper]);
      }
      // -------------------------------------
      // -- Else show day scoped slot
      // -------------------------------------
      const scopedSlot = this.VDPicker.$scopedSlots.day({
        day: helpers.formattedDay,
        ...helpers,
        attrs: {
          ...dayData.attrs,
          ...dayData.props,
        },
        on: dayData.on,
      });

      return this.$createElement('button', dayData, [
        scopedSlot,
      ]);
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'vd-picker__table',
      directives: [{
        name: 'touch',
        value: {
          left: () => this.$emit('changeMonth', this.rtl ? 'prev' : 'next'),
          right: () => this.$emit('changeMonth', this.rtl ? 'next' : 'prev'),
        },
      }],
      on: {
        mousemove: this.handleMouseMove,
        touchstart: (event) => event.stopPropagation(),
      },
    }, this.genContent());
  },
};
