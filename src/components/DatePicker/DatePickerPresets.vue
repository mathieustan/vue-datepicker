<script>
// mixins
import colorable from '../../mixins/colorable';

// functions
import {
  generateDateRangeWithoutDisabled,
  areSameDates,
} from '../../utils/Dates';

// constants
import { MAX_PRESETS_NUMBER } from '../../constants';

export default {
  name: 'DatePickerPresets',
  mixins: [colorable],
  props: {
    rangePresets: { type: Array },
    mutableDate: { type: Object },
    minDate: { type: [String, Number, Date] },
    maxDate: { type: [String, Number, Date] },
    color: { type: String },
    locale: { type: Object },
  },
  computed: {
    presetsFormatted () {
      if (!this.rangePresets) return;
      return this.rangePresets.map(preset => ({
        ...preset,
        availableDates: generateDateRangeWithoutDisabled(preset.dates, this.minDate, this.maxDate),
      })).splice(0, MAX_PRESETS_NUMBER); // Allow a number of presets
    },
  },
  methods: {
    isPresetSelected ({ availableDates = [] } = {}) {
      if (availableDates.length === 0 || !this.mutableDate) return false;
      return areSameDates(availableDates[0], this.mutableDate.start) &&
        areSameDates(availableDates[availableDates.length - 1], this.mutableDate.end);
    },
    isPresetValid ({ availableDates = [] } = {}) {
      if (!this.mutableDate) return false;
      return availableDates.length > 0;
    },
    setPresetDates ({ availableDates }) {
      if (this.isPresetSelected({ availableDates })) return;

      this.$emit('updateRange', {
        start: availableDates[0],
        end: availableDates[availableDates.length - 1],
      });
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genWrapper () {
      return this.$createElement('div', {
        staticClass: 'datepicker-presets__wrapper',
      }, this.presetsFormatted.map(this.genButton));
    },
    genButton (preset, key) {
      const effect = this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'datepicker-preset__effect',
      }));
      const text = this.$createElement('div', {
        staticClass: 'datepicker-preset__name',
        domProps: {
          innerHTML: preset.name,
        },
      });

      return this.$createElement('button', {
        key,
        staticClass: 'datepicker-preset',
        class: {
          'datepicker-preset--selected': this.isPresetSelected(preset),
          'datepicker-preset--disabled': !this.isPresetValid(preset),
        },
        attrs: {
          type: 'button',
        },
        on: {
          click: () => this.setPresetDates(preset),
        },
      }, [effect, text]);
    },
  },
  render (h) {
    if (!this.presetsFormatted) return;

    return h('div', {
      staticClass: 'datepicker-presets',
    }, [this.genWrapper()]);
  },
};
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss';

  .datepicker-presets {
    position: relative;
    display: flex;
    padding: $gutter*2 $gutter*3;

    @include mq(phone) {
      padding: $gutter*2 $gutter*2 $gutter;
    }

    &__wrapper {
      position: relative;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: get-size(mobile, presets-row);
      width: 100%;

      @include mq(tablet) {
        grid-auto-rows: get-size(desktop, presets-row);
      }
    }
  }

  .datepicker-preset {
    @extend %reset-button;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 $gutter;
    font-size: 14px;
    line-height: 14px;
    overflow: hidden;
    border-color: color(other, light-gray);
    border-style: solid;
    border-width: 0;
    transition: opacity .3s get-easing(swing);

    &:nth-child(odd) {
      &:first-child {
        border-width: 1px;
      }
      border-width: 0 1px 1px 1px;
    }
    &:nth-child(even) {
      &:nth-child(2) {
        border-width: 1px 1px 1px 0;
      }
      border-width: 0 1px 1px 0;
    }

    &__effect {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transition: opacity .3s get-easing(swing);
      z-index: 0;
    }

    &__name {
      position: relative;
      z-index: 1;
    }

    &:hover:not(&--disabled),
    &--selected {
      color: white;

      .datepicker-preset__effect {
        opacity: 1;
      }
    }

    &--selected  {
      pointer-events: none;
    }

    &--disabled  {
      color: rgba(93, 106, 137, 0.2);
      cursor: not-allowed;
      pointer-events: none;
    }
  }
</style>
