// Styles
import './DatePickerPresets.scss';

// Mixins
import colorable from '../../mixins/colorable';

// Functions
import {
  generateDateRangeWithoutDisabled,
  areSameDates,
} from '../../utils/Dates';

// Constants
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
        staticClass: 'vd-picker__presets-wrapper',
      }, this.presetsFormatted.map(this.genButton));
    },
    genButton (preset, key) {
      const effect = this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'vd-picker__preset-effect',
      }));
      const text = this.$createElement('div', {
        staticClass: 'vd-picker__preset-name',
        domProps: {
          innerHTML: preset.name,
        },
      });

      return this.$createElement('button', {
        key,
        staticClass: 'vd-picker__preset',
        class: {
          'vd-picker__preset--selected': this.isPresetSelected(preset),
          'vd-picker__preset--disabled': !this.isPresetValid(preset),
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
      staticClass: 'vd-picker__presets',
    }, [this.genWrapper()]);
  },
};
