// Styles
import './VDPickerTableDate.scss';

// Directives
import Touch from '../../../directives/touch';

// Components
import VDPickerTableDay from '../VDPickerTableDay/VDPickerTableDay';

// Helpers
import { getWeekDays } from '../../../utils/Dates';

export default {
  name: 'VDPickerTableDate',
  directives: { Touch },
  components: { VDPickerTableDay },
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
    // Events
    // ------------------------------
    onDayClick (day) {
      // Should reset current hovered days when selecting a date
      this.rangeCurrentHoveredDay = undefined;
      this.$emit('selectDate', day);
    },
    handleMouseMove (event) {
      let target = event.target;
      // Should handle mouse move if :
      // -> not a range mode
      // -> range already selected
      // -> target is table-days
      const isTableDays = typeof target.className === 'string' &&
        target.className.split(' ')[0] === 'vd-picker__table-days';
      if (!this.range || this.isRangeSelected || isTableDays) return;

      // if there is no date, we should select parent to find dataset.date
      const dateSetDate = target.dataset.date;
      if (!dateSetDate) return this.handleMouseMove({ target: target.parentNode });

      // Don't do anything if we are on the same day
      const isCurrentHoveredDay = dateSetDate === this.rangeCurrentHoveredDay;
      /* istanbul ignore next */
      if (!dateSetDate || isCurrentHoveredDay) return;

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
        on: {
          mousemove: this.handleMouseMove,
        },
      }, [
        // Generate blank days
        this.spaceBeforeFirstDay.map(blankDay),
        // Generate days
        this.currentDate.getDays().map(this.genDay),
      ]);
    },
    genDay (day, key) {
      return this.$createElement(VDPickerTableDay, {
        key,
        props: {
          allowedDates: this.allowedDates,
          color: this.color,
          day,
          maxDate: this.maxDate,
          minDate: this.minDate,
          mutableDate: this.mutableDate,
          range: this.range,
          rangeCurrentHoveredDay: this.rangeCurrentHoveredDay,
        },
        on: {
          selectDate: this.onDayClick,
        },
      });
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
        touchstart: (event) => event.stopPropagation(),
      },
    }, this.genContent());
  },
};
