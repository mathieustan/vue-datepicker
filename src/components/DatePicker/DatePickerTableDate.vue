<script>
// directives
import Touch from '../../directives/touch';

// mixins
import colorable from '../../mixins/colorable';

// functions
import {
  getWeekDays,
  isAfterDate,
  isBeforeDate,
  isBetweenDates,
  isDateToday,
} from '../../utils/Dates';

export default {
  name: 'DatePickerTableDate',
  directives: { Touch },
  mixins: [colorable],
  props: {
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
    isDisabled (day) {
      return isBeforeDate(day, this.minDate) || isAfterDate(day, this.maxDate);
    },
    isToday (day) {
      return isDateToday(day);
    },
    // ------------------------------
    // Events
    // ------------------------------
    handleMouseMove (event) {
      // Should handle mouse move if :
      // -> not a range mode
      // -> range already selected
      if (!this.range || this.isRangeSelected) return;
      let target = event.target;

      // Should handle mouse move only on those classes
      const CLASSES = ['datepicker__table-day', 'datepicker__table-day-effect'];
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
        staticClass: 'datepicker__table-weekday',
      });

      return this.$createElement('div', {
        staticClass: 'datepicker__table-week',
      }, this.weekDays.map(weekDay));
    },
    genDaysWrapper () {
      return this.$createElement('transition-group', {
        staticClass: 'datepicker__table-days__wrapper',
        class: this.classWeeks,
        props: {
          name: this.transitionName,
          tag: 'div',
        },
      }, [this.currentDate].map(this.genDays));
    },
    genDays (dates) {
      const blankDay = (day) => this.$createElement('div', {
        staticClass: 'datepicker__table-day',
        key: `space-${day}`,
      });

      return this.$createElement('div', {
        staticClass: 'datepicker__table-days',
        key: dates.month,
      }, [
        // Generate blank days
        this.spaceBeforeFirstDay.map(blankDay),
        // Generate days
        this.currentDate.getDays().map(this.genDay),
      ]);
    },
    genDay (day, key) {
      const current = this.$createElement('span', { staticClass: 'datepicker__table-day--current' });
      const effect = this.$createElement('span', this.setBackgroundColor(this.color, {
        staticClass: 'datepicker__table-day-effect',
      }));
      const text = this.$createElement('span', {
        domProps: {
          innerHTML: day.format('D'),
        },
        staticClass: 'datepicker__table-day-text',
      });

      return this.$createElement('button', {
        key,
        staticClass: 'datepicker__table-day',
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
          click: () => this.$emit('selectDate', day),
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
      staticClass: 'datepicker__table',
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
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss',
            '../../styles/base/_transitions.scss';

  .datepicker__table {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: $gutter $gutter*2;

    /* Week
    ---------------------- */
    &-week {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: 12px;
      margin-bottom: $gutter;
      font-size: 12px;
      line-height: 12px;
      font-weight: get-font-weight(medium);
      color: transparentize(black, .62);

      .datepicker--rtl & {
        direction: rtl;
      }
    }

    &-weekday {
      text-align: center;
    }

    /* Days
    ---------------------- */
    &-days__wrapper {
      position: relative;
      height: get-size(mobile, day-height) * 5;
      overflow: hidden;
      transition: height .3s cubic-bezier(0.23, 1, 0.32, 1);

      @include mq(tablet) {
        height: get-size(desktop, day-height) * 5;
      }

      &.has-6-weeks {
        height: get-size(mobile, day-height) * 6;

        @include mq(tablet) {
          height: get-size(desktop, day-height) * 6;
        }
      }
    }

    &-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: get-size(mobile, day-height);
      overflow: hidden;
      width: 100%;

      @include mq(tablet) {
        grid-template-rows: get-size(desktop, day-height);
      }

      .datepicker--rtl & {
        direction: rtl;
      }
    }

    /* Day
    ---------------------- */
    &-day {
      @extend %reset-button;
      position: relative;
      width: 100%;
      height: get-size(mobile, day-height);
      line-height: 1;
      font-size: 12px;
      float: left;
      text-align: center;
      color: transparentize(black, .13);
      font-weight: get-font-weight(medium);
      transition: color 450ms cubic-bezier(0.23, 1, 0.32, 1);
      overflow: hidden;

      @include mq(tablet) {
        width: 100%;
        height: get-size(desktop, day-height);
      }

      &:hover:not(.disabled) {
        color: white;

        .datepicker__table-day-effect {
          transform: translateX(-50%) scale(1);
          opacity: .5;
        }
      }

      &.in-range:not(.disabled),
      &.between:not(.disabled) {
        color: white;

        .datepicker__table-day-effect {
          transform: translateX(-50%);
          left: 0;
          width: calc(100% + 1px); // 1 extra pixel to fix weird spaces;
          border-radius: 0;
          opacity: .5;

          &:before {
            opacity: 1;
            left: 50%;
          }
        }
      }

      &.selected {
        color: white;

        &:hover:not(.disabled) {
          .datepicker__table-day-effect {
            opacity: 1;
          }
        }

        .datepicker__table-day-effect {
          transform: translateX(-50%);
          opacity: 1;
        }
      }

      &.first,
      &.select-start:hover:not(.selected) {
        .datepicker__table-day-effect {
          opacity: 1;

          &:before {
            opacity: .5;
            left: 50%;

            .datepicker--rtl & {
              left: -50%;
            }
          }
        }
      }

      &.last,
      &.select-end:hover:not(.selected) {
        .datepicker__table-day-effect {
          opacity: 1;

          &:before {
            opacity: .5;
            left: -50%;

            .datepicker--rtl & {
              left: 50%;
            }
          }
        }
      }

      &.first.last {
        .datepicker__table-day-effect {
          &:before {
            opacity: 0;
          }
        }
      }

      &.disabled {
        cursor: default;
        color: rgba(0,0,0,0.26);

        &:hover {
          .datepicker__table-day-effect,
          .datepicker__table-day-effect:before {
            opacity: 0 !important;
          }
        }
      }

      &--current {
        position: absolute;
        top: 1px;
        left: 50%;
        transform: translateX(-50%);
        width: #{get-size(mobile, day-height) - 2};
        height: #{get-size(mobile, day-height) - 2};
        border-radius: 50%;
        border: 1px solid currentColor;

        @include mq(tablet) {
          top: 2px;
          width: 36px;
          height: 36px;
        }
      }

      &-effect {
        position: absolute;
        top: 1px;
        left: 50%;
        width: #{get-size(mobile, day-height) - 2};
        height: #{get-size(mobile, day-height) - 2};
        border-radius: 50%;
        transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1);
        transition-property: transform, opacity;
        transform: translateX(-50%) scale(0);

        @include mq(tablet) {
          top: 2px;
          width: 36px;
          height: 36px;
        }

        .datepicker--range & {
          &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: inherit;
            opacity: 0;
          }
        }

        .datepicker--range-selecting & {
          transform: translateX(-50%) scale(0);
          opacity: 0;
          transition: none;
        }
      }

      &-text {
        position: relative;
      }
    }
  }
</style>

