// Styles
import './DatePickerCustomInput.scss';

// mixins
import colorable from '../../mixins/colorable';

// directives
import ClickOutside from '../../directives/click-outside';

// components
import VDIcon from '../VDIcon';

export default {
  name: 'DatePickerCustomInput',
  mixins: [colorable],
  directives: { ClickOutside },
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
    noInput: { type: Boolean, default: false },
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
    onClick () {
      this.$emit('focus');
    },
    onFocus () {
      if (!this.$refs.input) return;

      // If another element is focus, should focus this
      if (document.activeElement !== this.$refs.input) {
        return this.$refs.input.focus();
      }

      this.$emit('focus');
    },
    blur (event) {
      event && this.$emit('blur');
    },
    onKeyDown (event) {
      this.$emit('keydown', event);
    },
    clearableCallback () {
      this.$emit('clearDate');
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genContent () {
      return [
        !this.noCalendarIcon && this.genCalendarIcon(),
        this.noInput ? this.genButton() : this.genInput(),
        this.clearable && this.genClearIcon(),
      ];
    },
    genCalendarIcon () {
      return this.$createElement(VDIcon, {
        staticClass: 'vd-picker__input-icon',
        props: {
          disabled: this.disabled,
        },
      }, ['calendarAlt']);
    },
    genInput () {
      const data = {
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
          focus: this.onFocus,
          keydown: this.onKeyDown,
        },
        ref: 'input',
      };

      return this.$createElement('div', {
        staticClass: `vd-picker__input-wrapper`,
      }, [
        this.$createElement('input', data),
      ]);
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
    genButton () {
      return this.$createElement('button', {
        domProps: {
          innerHTML: this.isDateDefined ? this.date : this.placeholder,
        },
        attrs: {
          type: 'button',
          disabled: this.disabled,
          'aria-disabled': this.disabled,
        },
        on: {
          click: this.onClick,
        },
      });
    },
  },
  render (h) {
    return h('div', this.setTextColor(this.computedColor, {
      staticClass: 'vd-picker__input',
      class: this.classes,
      directives: [{
        name: 'click-outside',
        value: {
          isActive: this.closeOnClickOutside,
          handler: this.blur,
        },
      }],
      on: {
        click: this.onClick,
      },
    }), this.genContent());
  },
};
