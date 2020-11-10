// Styles
import './VDPickerTableDate.scss';

// Directives
import Touch from '../../../directives/touch';

// Mixins
import colorable from '../../../mixins/colorable';

// Components
import VDPickerTableDay from '../VDPickerTableDay/VDPickerTableDay';

// Helpers
import mixins from '../../../utils/mixins';

const baseMixins = mixins(
  colorable,
);

export default baseMixins.extend({
  name: 'VDPickerTableDate',
  directives: { Touch },
  props: {
    allowedDates: { type: Function },
    color: { type: String },
    pickerDate: { type: [String, Object] },
    isRangeSelected: { type: Boolean },
    maxDate: { type: [String, Number, Date] },
    minDate: { type: [String, Number, Date] },
    mutableDate: { type: [String, Object] },
    range: { type: Boolean },
    transitionName: { type: String },
  },
  data: () => ({
    rangeCurrentHoveredDay: undefined,
  }),
  computed: {
    weekDays () {
      return this.pickerDate.getWeekDays();
    },
    spaceBeforeFirstDay () {
      return [...Array(this.pickerDate.getWeekStart()).keys()];
    },
  },
  watch: {
    // When currentHoveredDay change, we need to check
    // if hovered day is before/after first selected date
    // Then we swap start / end date according to the result
    rangeCurrentHoveredDay (newHoveredDay) {
      if (!newHoveredDay) return;
      this.$emit('update-hovered-day', newHoveredDay);
    },
  },
  methods: {
    // ------------------------------
    // Events
    // ------------------------------
    onDayClick (day) {
      // Should reset current hovered days when selecting a date
      this.rangeCurrentHoveredDay = undefined;
      this.$emit('select-date', day);
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
        props: {
          name: this.transitionName,
          tag: 'div',
        },
      }, [this.pickerDate].map(this.genDays));
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
        this.pickerDate.getDays().map(this.genDay),
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
          locale: this.currentLocale,
        },
        on: {
          'select-day': this.onDayClick,
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
          left: () => this.$emit('update-month', 'next'),
          right: () => this.$emit('update-month', 'prev'),
        },
      }],
      on: {
        touchstart: (event) => event.stopPropagation(),
      },
    }, [
      this.genWeek(),
      this.genDaysWrapper(),
    ]);
  },
});

