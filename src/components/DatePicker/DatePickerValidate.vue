<script>
// mixins
import colorable from '../../mixins/colorable';

export default {
  name: 'DatePickerValidate',
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
        staticClass: 'datepicker-validate__button datepicker-validate__button-cancel',
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
        staticClass: 'datepicker-validate__button datepicker-validate__button-validate',
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
        staticClass: 'datepicker-validate__effect',
      }));
    },
    genButtonText (text) {
      return this.$createElement('div', {
        staticClass: 'datepicker-validate__name',
        domProps: {
          innerHTML: text,
        },
      });
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'datepicker-validate',
    }, [
      this.genButtonCancel(),
      this.genButtonValidate(),
    ]);
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/abstracts/_index.scss';

  .datepicker-validate {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 $gutter*3 $gutter $gutter*3;

    @include mq(tablet) {
      padding: $gutter $gutter*2;
    }

    .datepicker--rtl & {
      direction: rtl;
    }

    &__button {
      @extend %reset-button;
      position: relative;
      display: inline-flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      height: 36px;
      min-width: 44px;
      font-size: 14px;
      font-weight: 500;
      border-radius: get-border-radius(1);
      padding: 6px 8px;
      outline: 0;
      text-transform: uppercase;
      text-decoration: none;
      overflow: hidden;

      & + & {
        margin-left: $gutter;
      }

      &:hover:not(:disabled) {
        .datepicker-validate__effect {
          opacity: .1;
        }
      }

      &:disabled,
      &[disabled] {
        color: rgba(0, 0, 0, 0.26) !important;
        cursor: default;
      }
    }

    &__effect {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transition: opacity 450ms cubic-bezier(0.23, 1, 0.32, 1);
      z-index: -1;
    }
  }
</style>
