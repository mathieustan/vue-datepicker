<script>
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

// directives
import ClickOutside from '../../directives/click-outside';

// components
import Menu from '../Menu';
import DatePickerCustomInput from './DatePickerCustomInput.vue';
import DatePickerOverlay from './DatePickerOverlay.vue';
import DatePickerAgenda from './DatePickerAgenda.vue';

// constants
import { Z_INDEX_LIST, KEYCODES, DATE_HEADER_REGEX } from '../../constants';

// helpers
import { generateRandomId, validateAttachTarget } from '../../utils/helpers';
import { getDefaultLang, getLocale } from '../../utils/lang';
import {
  setLocaleLang,
  getDefaultInputFormat,
  getDefaultHeaderFormat,
  getDefaultOutputFormat,
  formatDateToSend,
  initDate,
  getRangeDatesFormatted,
  convertQuarterToMonth,
  formatDateWithLocale,
} from '../../utils/Dates';

export const defaultMenuProps = {
  minWidth: '290px',
  maxWidth: '315px',
};

export default {
  name: 'DatePicker',
  directives: { ClickOutside },
  props: {
    id: { type: String, default: undefined },
    name: { type: String, default: 'datepicker' },
    // Validation Buttons
    validate: { type: Boolean, default: false },
    buttonValidate: { type: String, default: undefined },
    buttonCancel: { type: String, default: undefined },
    // type (date, month, quarter, year picker)
    type: { type: String, default: 'date' },
    // Range
    range: { type: Boolean, default: false },
    rangeInputText: { type: String, default: '%d ~ %d' },
    rangeHeaderText: { type: String, default: undefined },
    rangePresets: { type: Array, default: undefined },
    // Current Value from v-model
    value: { type: [String, Object, Number, Date] },
    // Format
    format: { type: String, default: undefined },
    formatHeader: { type: String, default: undefined },
    // Show/hide datepicker
    visible: { type: Boolean, default: false },
    // Sets the locale.
    locale: {
      type: Object,
      default: () => ({ lang: getDefaultLang() }),
    },
    placeholder: { type: String, default: 'YYYY-MM-DD' },
    // Applies specified color to the control
    color: { type: String, default: '#4f88ff' },
    // Allowed dates
    minDate: { type: [String, Number, Date] },
    maxDate: { type: [String, Number, Date] },
    // Disabled all datepicker
    disabled: { type: Boolean, default: false },
    // Inline
    inline: { type: Boolean, default: false },
    // Set if header in agenda should be visible
    noHeader: { type: Boolean, default: false },
    // Allow to hide input (to use a button instead)
    noInput: { type: Boolean, default: false },
    // Allow to hide calendar icon
    noCalendarIcon: { type: Boolean, default: false },
    // Responsive bottom sheet
    fullscreenMobile: { type: Boolean, default: false },
    // tabindex
    tabindex: { type: [String, Number], default: '0' },
    // Right to Left
    rtl: { type: Boolean, default: false },

    // --> Menu Props
    // Allow to set origin
    origin: { type: String, default: undefined },
    // Allows the menu to overflow off the screen
    allowOverflow: { type: Boolean, default: true },
    // attach
    attach: { validator: validateAttachTarget, default: false },
    // Specificy a z-index for agenda & overlay
    zIndex: { type: Number, default: Z_INDEX_LIST.datepicker },
  },
  data: () => ({
    date: undefined,
    isMenuActive: false,
    isBooted: false,
    activator: undefined,
  }),
  computed: {
    classes () {
      return {
        'datepicker__wrapper--inline': this.inline,
        'datepicker__wrapper--disabled': this.disabled,
        'datepicker__wrapper--rtl': this.rtl,
      };
    },
    // use a computed to have a dynamicId for each instance
    componentId () {
      return this.id || `datepicker_${generateRandomId()}`;
    },
    // If format isnt specificed, select default format from type
    inputFormat () {
      if (!this.format) return getDefaultInputFormat(this.range ? 'range' : this.type);
      return this.format;
    },
    headerFormat () {
      if (!this.formatHeader) return getDefaultHeaderFormat(this.range ? 'range' : this.type);
      return this.formatHeader;
    },
    outputFormat () {
      return getDefaultOutputFormat(this.range ? 'range' : this.type);
    },
    textsFormat () {
      const { buttonValidate, buttonCancel, rangeHeaderText } = getLocale(this.locale.lang);
      return {
        buttonValidate: this.buttonValidate || buttonValidate,
        buttonCancel: this.buttonCancel || buttonCancel,
        rangeHeaderText: this.rangeHeaderText || rangeHeaderText,
      };
    },
    internalDate: {
      get () {
        return initDate(this.value, { isRange: this.range, locale: this.locale });
      },
      set (date) {
        this.date = date;
      },
    },
    isDateDefined () {
      const isDateDefined = !this.range && this.internalDate;
      const isDateRangeDefined = this.range &&
        this.internalDate &&
        this.internalDate.start &&
        this.internalDate.end;
      return Boolean(isDateDefined) || Boolean(isDateRangeDefined);
    },
    computedDate () {
      if (!this.isDateDefined) return;
      if (this.range && this.rangeInputText) {
        const [startDate, endDate] =
          getRangeDatesFormatted(this.internalDate, this.locale, this.inputFormat).split(' ~ ');
        return this.rangeInputText
          .replace(DATE_HEADER_REGEX, `${startDate}`)
          .replace(DATE_HEADER_REGEX, `${endDate}`);
      }

      // If type is quarter,
      // We need to convert this quarter date, to a monthly date
      // because dayjs will transform a monthly date to quarter date only
      // Exemple => '2019-2' => should be converted to date : 2019-06-01
      const currentMonth = this.internalDate.month();
      const newMonth = this.type === 'quarter' ? convertQuarterToMonth(currentMonth) : currentMonth;
      return formatDateWithLocale(this.internalDate.set('month', newMonth), this.locale, this.inputFormat);
    },
    shouldShowBottomSheet () {
      return this.fullscreenMobile &&
        window.innerWidth <= 480;
    },
  },
  watch: {
    visible: {
      handler (isMenuActive) {
        this.isMenuActive = isMenuActive;
      },
      immediate: true,
    },
    locale: {
      handler (newLocale) {
        setLocaleLang(newLocale);
      },
      immediate: true,
    },
  },
  mounted () {
    this.activator = this.$refs.activator;
  },
  beforeDestroy () {
    this.hideDatePicker();
    this.$emit('onDestroy');
  },
  methods: {
    // ------------------------------
    // Events
    // ------------------------------
    showDatePicker () {
      if (this.disabled) return;
      this.isMenuActive = true;
      this.$emit('onOpen');
    },
    hideDatePicker () {
      if (!this.isMenuActive) return;

      this.isMenuActive = false;
      this.isBooted = false;

      clearAllBodyScrollLocks();
      this.$emit('onClose');
    },
    changeDate (date) {
      this.internalDate = date;
      if (this.validate) return;
      this.validateDate();
    },
    validateDate () {
      // if there is no date selected, return;
      if (!this.date) {
        this.hideDatePicker();
        return;
      }

      this.$emit('input', formatDateToSend(this.date, this.outputFormat, this.range));
      this.$emit('onChange');
      this.hideDatePicker();
    },
    onKeyDown (event) {
      const keyCode = event.keyCode;
      const menu = this.$refs.menu;
      if (!menu) return;

      // close menu on esc|tab
      if ([
        KEYCODES.esc,
        KEYCODES.tab,
      ].includes(keyCode)) return this.hideDatePicker(event);
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genContent () {
      if (this.inline) return [this.genAgenda()];

      return [
        this.$scopedSlots.activator ? this.genActivator() : this.genCustomInput(),
        this.genOverlay(),
        this.genMenuWithContent(),
      ];
    },
    genMenuWithContent () {
      const menuProps = {
        ...defaultMenuProps,
        value: this.isMenuActive,
        origin: this.origin,
        allowOverflow: this.allowOverflow,
        rtl: this.rtl,
        zIndex: parseInt(this.zIndex) + 1,
        attach: !this.shouldShowBottomSheet ? this.attach : false,
        transition: this.shouldShowBottomSheet ? 'slide-in-out-transition' : 'scale-transition',
        // Allow GMenu to act like a bottomSheet
        // TODO create a GBottomSheet component
        bottomSheet: this.shouldShowBottomSheet,
      };

      const activator = this.activator;

      return this.$createElement(Menu, {
        attrs: { role: 'menu' },
        props: {
          ...menuProps,
          activator,
        },
        on: {
          transitionEnd: () => {
            this.isBooted = true;
          },
        },
        ref: 'menu',
      }, [this.genAgenda()]);
    },
    genActivator () {
      return this.$createElement('div', {
        staticClass: 'datepicker__activator',
        directives: [{
          name: 'click-outside',
          value: {
            isActive: this.isMenuActive && !this.shouldShowBottomSheet,
            handler: this.hideDatePicker,
          },
        }],
        on: {
          click: this.showDatePicker,
          keydown: this.onKeyDown,
        },
        ref: 'activator',
      }, [
        this.$scopedSlots.activator({
          date: this.computedDate,
        }),
      ]);
    },
    genCustomInput () {
      return this.$createElement(DatePickerCustomInput, {
        props: {
          id: this.componentId,
          name: this.name,
          date: this.computedDate,
          isDateDefined: this.isDateDefined,
          placeholder: this.placeholder,
          color: this.color,
          disabled: this.disabled,
          tabindex: this.tabindex,
          noInput: this.noInput,
          noCalendarIcon: this.noCalendarIcon,
          closeOnClickOutside: this.isMenuActive && !this.shouldShowBottomSheet,
        },
        on: {
          focus: this.showDatePicker,
          blur: this.hideDatePicker,
          keydown: this.onKeyDown,
        },
        ref: 'activator',
      });
    },
    genOverlay () {
      if (!this.shouldShowBottomSheet) return;

      return this.$createElement(DatePickerOverlay, {
        props: {
          value: this.isMenuActive && this.shouldShowBottomSheet,
          zIndex: parseInt(this.zIndex),
        },
        on: {
          close: this.hideDatePicker,
        },
      });
    },
    genAgenda () {
      return this.$createElement(DatePickerAgenda, {
        props: {
          name: this.name,
          date: this.internalDate,
          type: this.type,
          value: this.isMenuActive,
          validate: this.validate,
          buttonCancel: this.textsFormat.buttonCancel,
          buttonValidate: this.textsFormat.buttonValidate,
          range: this.range,
          rangeHeaderText: this.textsFormat.rangeHeaderText,
          rangePresets: this.rangePresets,
          formatHeader: this.headerFormat,
          locale: this.locale,
          noHeader: this.noHeader,
          activeBottomSheet: this.isBooted && this.isMenuActive && this.shouldShowBottomSheet,
          color: this.color,
          minDate: this.minDate,
          maxDate: this.maxDate,
          rtl: this.rtl,
        },
        on: {
          selectDate: this.changeDate,
          validateDate: this.validateDate,
          close: this.hideDatePicker,
        },
        ref: 'agenda',
      });
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'datepicker__wrapper',
      class: this.classes,
    }, this.genContent());
  },
};
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss';

  .datepicker__wrapper,
  .datepicker__wrapper *,
  .datepicker__wrapper ::before,
  .datepicker__wrapper ::after {
    box-sizing: border-box;
  }

  .datepicker__wrapper {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    max-width: 100%;
    cursor: pointer;

    &:focus,
    &:active {
      outline: 0;
    }

    &--inline {
      width: get-size(mobile, width);
      box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
        0px 2px 2px 0px rgba(0,0,0,0.14),
        0px 1px 5px 0px rgba(0,0,0,0.12);

      @include mq(tablet) {
        width: get-size(desktop, width);
      }
    }

    &--disabled {
      pointer-events: none;
    }
  }

  .datepicker__activator {
    display: flex;
    flex: 1 1 auto;
    max-width: 100%;
  }
</style>
