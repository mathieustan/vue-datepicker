// Styles
import './VDPickerPresets.scss';

// Mixins
import colorable from '../../../mixins/colorable';
import Localable from '../../../mixins/localable';

// Constants
import { MAX_PRESETS_NUMBER } from '../../../constants';

// Helpers
import {
  generateDateRangeWithoutDisabled,
  areSameDates,
} from '../utils/helpers';
import mixins from '../../../utils/mixins';

const baseMixins = mixins(
  colorable,
  Localable,
);

export default baseMixins.extend({
  name: 'VDPickerPresets',
  props: {
    rangePresets: { type: Array },
    mutableDate: { type: Object },
    minDate: { type: [String, Number, Date] },
    maxDate: { type: [String, Number, Date] },
    color: { type: String },
  },
  computed: {
    presetsFormatted () {
      if (!this.rangePresets) return;
      return this.rangePresets.map(preset => ({
        ...preset,
        availableDates: generateDateRangeWithoutDisabled({
          dates: preset.dates,
          minDate: this.minDate,
          maxDate: this.maxDate,
          locale: this.currentLocale,
        }),
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

      this.$emit('update-range', {
        start: availableDates[0],
        end: availableDates[availableDates.length - 1],
      });
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genWrapper () {
      return this.$createElement('div', {
        staticClass: 'vd-picker-presets__wrapper',
      }, this.presetsFormatted.map(this.genButton));
    },
    genButton (preset, key) {
      const effect = this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'vd-picker-preset__effect',
      }));
      const text = this.$createElement('div', {
        staticClass: 'vd-picker-preset__name',
        domProps: {
          innerHTML: preset.name,
        },
      });

      return this.$createElement('button', {
        key,
        staticClass: 'vd-picker-preset',
        class: {
          'vd-picker-preset--selected': this.isPresetSelected(preset),
          'vd-picker-preset--disabled': !this.isPresetValid(preset),
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
      staticClass: 'vd-picker-presets',
    }, [this.genWrapper()]);
  },
});
