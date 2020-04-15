<script>
// mixins
import colorable from '../../mixins/colorable';

// directives
import ClickOutside from '../../directives/click-outside';

// components
import Icon from '../Icon';

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
        'datepicker__input--disabled': this.disabled,
        'datepicker__input--is-active': this.isMenuActive,
        'datepicker__input--no-date': !this.isDateDefined,
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
      return this.$createElement(Icon, {
        staticClass: 'datepicker__input-icon',
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
        staticClass: `datepicker__input-wrapper`,
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
        staticClass: 'datepicker__input-clear__icon',
      }, [
        this.$createElement(Icon, data, iconName),
      ]);

      return this.$createElement('div', {
        staticClass: `datepicker__input-clear`,
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
      staticClass: 'datepicker__input',
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
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss';

  .datepicker__input {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    color: currentColor;

    &--disabled {
      cursor: not-allowed;
      pointer-events: none;

      input {
        opacity: .38;
      }
    }

    &--no-date:not(.datepicker__input--is-active) {
      opacity: .6;
    }

    .datepicker__wrapper--rtl & {
      direction: rtl;
      input[type="text"],
      button {
        margin: 0 $gutter 0 0;
      }
    }

    &--no-calendar-icon,
    .datepicker__wrapper--rtl &--no-calendar-icon {
      input[type="text"],
      button {
        margin: 0;
      }
    }

    &-icon {
      margin-bottom: 5px;
    }

    &-wrapper {
      display: flex;
      flex: 1 1 auto;
      position: relative;

      input {
      display: flex;
      flex: 1 1 auto;
      position: relative;
      border: none;
      box-shadow: none;
      outline: 0;
      font-size: 16px;
      line-height: 19px;
      margin-left: $gutter;
      font-family: inherit;
      background: transparent;
      color: currentColor;
      cursor: inherit;

      &:focus,
      &:active {
        outline: 0;
        box-shadow: none;
      }

      @include input-placeholder {
        opacity: .6;
      }
    }
    }

    &-clear {
      display: inline-flex;
      align-self: flex-start;
      line-height: 1;
      user-select: none;

      &__icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 24px;
        min-width: 24px;
        width: 24px;
        flex: 1 0 auto;
      }
    }

    button {
      @extend %reset-button;
      font-size: 16px;
      line-height: 19px;
      margin-left: $gutter;
      color: currentColor;
    }
  }
</style>
