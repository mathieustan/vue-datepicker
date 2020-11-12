// Styles
import './VDPickerTableDay.scss';

// Mixins
import colorable from '../../../mixins/colorable';
import Localable from '../../../mixins/localable';

// Functions
import {
  isCurrent,
  isBeforeDate,
  isBetweenDates,
  isDateAllowed,
} from '../utils/helpers';

// Helpers
import { getSlot } from '../../../utils/helpers';
import mixins from '../../../utils/mixins';

const baseMixins = mixins(
  colorable,
  Localable,
);

export default baseMixins.extend({
  name: 'VDPickerTableDay',
  inject: ['VDPicker'],
  props: {
    allowedDates: { type: Function },
    color: { type: String },
    day: { type: Object, required: true },
    maxDate: { type: [String, Number, Date] },
    minDate: { type: [String, Number, Date] },
    mutableDate: { type: [String, Object] },
    range: { type: Boolean },
    rangeCurrentHoveredDay: { type: String, default: undefined },
  },
  computed: {
    classes () {
      return {
        'vd-picker__table-day--selected': this.isSelected && !this.isDisabled,
        'vd-picker__table-day--between': this.range && this.isBetween,
        'vd-picker__table-day--in-range': this.range && this.isInRange,
        'vd-picker__table-day--first': this.range && this.firstInRange,
        'vd-picker__table-day--last': this.range && this.lastInRange && Boolean(this.mutableDate.end),
        'vd-picker__table-day--select-start': this.range && !this.mutableDate.start,
        'vd-picker__table-day--select-end': this.range && this.mutableDate.start && !this.mutableDate.end,
        'vd-picker__table-day--disabled': this.isDisabled,
      };
    },
    formattedDay () {
      return this.day.format('D');
    },
    isCurrent () {
      return isCurrent({
        date: this.day,
        type: 'date',
        locale: this.currentLocale,
      });
    },
    isSelected () {
      if (this.range) {
        const date = [
          ...(this.mutableDate.start ? [this.mutableDate.start.startOf('day').unix()] : []),
          ...(this.mutableDate.end ? [this.mutableDate.end.startOf('day').unix()] : []),
        ];
        return date.includes(this.day.unix());
      }
      return this.mutableDate && this.mutableDate.startOf('day').unix() === this.day.unix();
    },
    isBetween () {
      if (!this.mutableDate.start && !this.mutableDate.end) return false;
      return isBetweenDates(this.day, this.mutableDate.start, this.mutableDate.end);
    },
    isInRange () {
      if (!this.rangeCurrentHoveredDay) return false;

      if (isBeforeDate(this.rangeCurrentHoveredDay, this.mutableDate.end)) {
        return isBetweenDates(this.day, this.rangeCurrentHoveredDay, this.mutableDate.end);
      }
      return isBetweenDates(this.day, this.mutableDate.start, this.rangeCurrentHoveredDay);
    },
    firstInRange () {
      return this.mutableDate.start &&
        this.mutableDate.start.startOf('day').unix() === this.day.unix();
    },
    lastInRange () {
      return this.mutableDate.end &&
        this.mutableDate.end.startOf('day').unix() === this.day.unix();
    },
    isDateAllowed () {
      return isDateAllowed({
        date: this.day,
        min: this.minDate,
        max: this.maxDate,
        allowedFn: this.allowedDates,
      });
    },
    isDisabled () {
      return !this.isDateAllowed;
    },
    scopedSlotDay () {
      return getSlot(this.VDPicker, 'day');
    },
  },
  methods: {
    // ------------------------------
    // Events
    // ------------------------------
    onDayClick (day) {
      this.$emit('select-day', day);
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genWrapper () {
      return this.$createElement('div', {
        staticClass: 'vd-picker__table-day__wrapper',
        attrs: {
          // Allow to set hovered date on range
          'data-date': this.day.format('YYYY-MM-DD'),
        },
      }, [
        this.isCurrent && this.genDayCurrent(),
        this.genDayEffect(),
        this.genDayText(),
      ]);
    },
    genDayCurrent () {
      return this.$createElement('span', { staticClass: 'vd-picker__table-day__current' });
    },
    genDayEffect () {
      return this.$createElement('span', { staticClass: 'vd-picker__table-day__effect' });
    },
    genDayText () {
      // -------------------------------------
      // -- If there is not scopedSlots date
      // => Show default date style
      // -------------------------------------
      if (!this.scopedSlotDay) {
        return this.$createElement('span', {
          staticClass: 'vd-picker__table-day__text',
        }, [this.formattedDay]);
      }

      // -------------------------------------
      // -- Else show day scoped slot
      // -------------------------------------
      /* istanbul ignore next */
      const helpers = {
        formattedDay: this.formattedDay,
        isCurrent: this.isToday,
        isSelected: this.isSelected && !this.isDisabled,
        isBetween: this.range && this.isBetween,
        isInRange: this.range && this.isInRange,
        isFirstRangeDay: this.range && this.firstInRange,
        isLastRangeDay: this.range && this.lastInRange && Boolean(this.mutableDate.end),
        isFirstSelectedDay: this.range && !this.mutableDate.start,
        isLastSelectedDay: this.range && this.mutableDate.start && !this.mutableDate.end,
        isDisabled: this.isDisabled,
      };

      const scopedSlot = this.VDPicker.$scopedSlots.day({
        day: this.formattedDay,
        ...helpers,
      });

      return this.$createElement('span', {
        staticClass: 'vd-picker__table-day__text',
      }, [scopedSlot]);
    },
  },
  render (h) {
    const data = {
      staticClass: 'vd-picker__table-day',
      class: this.classes,
      attrs: {
        type: 'button',
        disabled: this.isDisabled,
        // Allow to set hovered date on range
        'data-date': this.day.format('YYYY-MM-DD'),
      },
      on: {
        click: () => this.onDayClick(this.day),
      },
    };

    return h('button', this.setTextColor(this.color, data), [this.genWrapper()]);
  },
});
