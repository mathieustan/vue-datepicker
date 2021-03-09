// Styles
import './VDPickerValidate.scss';

// Mixins
import colorable from '../../../mixins/colorable';

export default {
  name: 'VDPickerValidate',
  mixins: [colorable],
  props: {
    buttonValidate: { type: String },
    buttonCancel: { type: String },
    color: { type: String },
    range: { type: Boolean },
    mutableDate: { type: Object },
  },
  computed: {
    isDisabledValidation () {
      if (!this.range) return false;
      return typeof this.mutableDate !== 'object' ||
        !Object.values(this.mutableDate).every(date => Boolean(date));
    },
  },
  methods: {
    // ------------------------------
    // Generate Template
    // ------------------------------
    genButtonCancel () {
      return this.$createElement('button', {
        staticClass: 'vd-picker-validate__button vd-picker-validate__button-cancel',
        attrs: {
          type: 'button',
        },
        on: {
          click: () => this.$emit('cancel'),
        },
      }, [
        this.genButtonEffect(),
        this.genButtonText(this.buttonCancel),
      ]);
    },
    genButtonValidate () {
      return this.$createElement('button', this.setTextColor(this.color, {
        staticClass: 'vd-picker-validate__button vd-picker-validate__button-validate',
        attrs: {
          type: 'button',
          disabled: this.isDisabledValidation,
        },
        on: {
          click: () => this.$emit('validate'),
        },
      }), [
        this.genButtonEffect(),
        this.genButtonText(this.buttonValidate),
      ]);
    },
    genButtonEffect () {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'vd-picker-validate__effect',
      }));
    },
    genButtonText (text) {
      return this.$createElement('div', {
        staticClass: 'vd-picker-validate__name',
        domProps: {
          innerHTML: text,
        },
      });
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'vd-picker-validate',
    }, [
      this.genButtonCancel(),
      this.genButtonValidate(),
    ]);
  },
};
