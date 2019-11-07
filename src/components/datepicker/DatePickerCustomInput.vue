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
    id: { type: String },
    name: { type: String },
    date: { type: [Object, Date, String] },
    isDateDefined: { type: Boolean, default: false },
    placeholder: { type: String },
    color: { type: String },
    disabled: { type: Boolean, default: false },
    tabindex: { type: [String, Number] },
    noInput: { type: Boolean, default: false },
    noCalendarIcon: { type: Boolean, default: false },
    closeOnClickOutside: { type: Boolean, default: true },
  },
  computed: {
    computedColor () {
      return this.isDateDefined && !this.disabled ? this.color : 'rgba(93, 106, 137, 0.5)';
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
    // ------------------------------
    // Generate Template
    // ------------------------------
    genContent () {
      return [
        !this.noCalendarIcon && this.genCalendarIcon(),
        this.noInput ? this.genButton() : this.genInput(),
      ];
    },
    genCalendarIcon () {
      return this.$createElement(Icon, {
        props: {
          disabled: this.disabled,
        },
      }, ['calendarAlt']);
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
          focus: this.onFocus,
          keydown: this.onKeyDown,
        },
        ref: 'input',
      });
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

    &--disabled {
      cursor: not-allowed;
      pointer-events: none;
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

    svg {
      margin-bottom: 5px;
    }

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
        color: transparentize(black, .6);
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
