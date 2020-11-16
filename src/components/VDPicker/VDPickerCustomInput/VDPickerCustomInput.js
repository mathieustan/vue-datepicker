// Styles
import './VDPickerCustomInput.scss';

// Mixins
import colorable from '../../../mixins/colorable';

// Components
import VDIcon from '../../VDIcon';

// Helpers
import mixins from '../../../utils/mixins';

const baseMixins = mixins(
  colorable,
);

export default baseMixins.extend({
  name: 'VDPickerCustomInput',
  inject: ['VDPicker'],
  props: {
    clearable: { type: Boolean },
    closeOnClickOutside: { type: Boolean, default: true },
    color: { type: String },
    date: { type: [Object, Date, String] },
    disabled: { type: Boolean, default: false },
    id: { type: String },
    isDateDefined: { type: Boolean, default: false },
    isMenuActive: { type: Boolean, default: false },
    name: { type: String },
    noCalendarIcon: { type: Boolean, default: false },
    placeholder: { type: String },
    tabindex: { type: [String, Number] },
  },
  computed: {
    classes () {
      return {
        'vd-picker__input--disabled': this.disabled,
        'vd-picker__input--is-active': this.isMenuActive,
        'vd-picker__input--no-date': !this.isDateDefined,
      };
    },
    computedColor () {
      if (this.disabled) return '';
      return this.isMenuActive ? this.color : '';
    },
    isDirty () {
      return this.isDateDefined;
    },
  },
  methods: {
    // ------------------------------
    // Events
    // ------------------------------
    onKeyDown (event) {
      this.$emit('keydown', event);
    },
    clearableCallback () {
      this.$emit('clearDate');
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genCalendarIcon () {
      let children = [];

      if (this.VDPicker.$slots['input-icon']) {
        children.push(this.VDPicker.$slots['input-icon']);
      } else {
        children.push(this.$createElement(VDIcon, {
          props: {
            disabled: this.disabled,
          },
        }, ['calendarAlt']));
      }

      const iconWrapper = this.$createElement('div', {
        staticClass: 'vd-picker__input-icon__wrapper',
      }, children);

      return this.$createElement('div', {
        staticClass: 'vd-picker__input-icon',
      }, [iconWrapper]);
    },
    genInput () {
      return this.$createElement('input', {
        attrs: {
          id: this.id,
          name: this.name,
          disabled: this.disabled,
          'aria-disabled': this.disabled,
          placeholder: this.placeholder,
          tabindex: this.tabindex,
          role: 'text',
          type: 'text',
          readonly: true,
          'aria-readonly': true,
        },
        domProps: {
          value: this.date,
        },
        on: {
          keydown: this.onKeyDown,
        },
        ref: 'input',
      });
    },
    genClearIcon () {
      const iconName = this.isDirty ? 'close' : '';
      const data = {
        attrs: {
          'aria-label': 'clearable icon',
          color: this.color,
          disabled: this.disabled,
        },
        on: {
          click: event => {
            event.preventDefault();
            event.stopPropagation();
            this.clearableCallback();
          },
          mouseup: event => {
            event.preventDefault();
            event.stopPropagation();
          },
        },
      };

      const iconElement = this.$createElement('div', {
        staticClass: 'vd-picker__input-clear__icon',
      }, [
        this.$createElement(VDIcon, data, iconName),
      ]);

      return this.$createElement('div', {
        staticClass: `vd-picker__input-clear`,
      }, [iconElement]);
    },
  },
  render (h) {
    return h('div', this.setTextColor(this.computedColor, {
      staticClass: 'vd-picker__input',
      class: this.classes,
    }), [
      !this.noCalendarIcon && this.genCalendarIcon(),
      this.genInput(),
      this.clearable && this.genClearIcon(),
    ]);
  },
});
