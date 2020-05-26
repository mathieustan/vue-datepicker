// Styles
import './DatePickerTableDate.scss';

// Directives
import Touch from '../../directives/touch';

// Mixins
import colorable from '../../mixins/colorable';

// Functions
import {
  getWeekDays,
  isBeforeDate,
  isBetweenDates,
  isDateAllowed,
  isDateToday,
} from '../../utils/Dates';

export default {
  name: 'DatePickerTableDate',
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
    genDay (day, key) {
      const current = this.$createElement('span', { staticClass: 'vd-picker__table-day--current' });
      const effect = this.$createElement('span', this.setBackgroundColor(this.color, {
        staticClass: 'vd-picker__table-day-effect',
      }));
      const text = this.$createElement('span', {
        domProps: {
          innerHTML: day.format('D'),
        },
        staticClass: 'vd-picker__table-day-text',
      });

      return this.$createElement('button', {
        key,
        staticClass: 'vd-picker__table-day',
        class: {
          'selected': this.isSelected(day) && !this.isDisabled(day),
          'between': this.range && this.isBetween(day),
          'in-range': this.range && this.isInRange(day),
          'first': this.range && this.firstInRange(day),
          'last': this.range && this.lastInRange(day) && Boolean(this.mutableDate.end),
          'select-start': this.range && !this.mutableDate.start,
          'select-end': this.range && this.mutableDate.start && !this.mutableDate.end,
          'disabled': this.isDisabled(day),
        },
        attrs: {
          type: 'button',
          disabled: this.isDisabled(day),
          'data-date': day.format('YYYY-MM-DD'),
        },
        on: {
          click: () => this.onDayClick(day),
        },
      }, [
        this.isToday(day) && current,
        effect,
        text,
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
