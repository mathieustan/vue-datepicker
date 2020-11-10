import { clearAllBodyScrollLocks } from 'body-scroll-lock';

// Styles
import './VDPicker.scss';

// Mixins
import Localable from '../../mixins/localable';
import Mobile from '../../mixins/mobile';

// Directives
import ClickOutside from '../../directives/click-outside';

// Components
import VDMenu from '../VDMenu';
import VDPickerCustomInput from './VDPickerCustomInput/VDPickerCustomInput';
import VDPickerAgenda from './VDPickerAgenda/VDPickerAgenda';

// Constants
import { Z_INDEX_LIST, KEYCODES } from '../../constants';

// Date Helpers
import {
  getDefaultInputFormat,
  getDefaultHeaderFormat,
  getDefaultOutputFormat,
  initDate,
  genFormattedInputDate,
  transformDateForModel,
} from './utils/helpers';

import { generateRandomId, validateAttachTarget } from '../../utils/helpers';
import { deprecate, removed } from '../../utils/console';
import mixins from '../../utils/mixins';

export const defaultMenuProps = {
  minWidth: '290px',
  maxWidth: '315px',
};

const baseMixins = mixins(
  Localable,
  Mobile,
);

export default baseMixins.extend({
  name: 'VDPicker',
  provide () {
    return {
      VDPicker: this,
    };
  },
  directives: { ClickOutside },
  props: {
    id: { type: String, default: undefined },
    name: { type: String, default: 'datepicker' },
    // Add input clear functionality
    clearable: { type: Boolean, default: false },
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
    placeholder: { type: String, default: 'YYYY-MM-DD' },
    // Applies specified color to the control
    color: { type: String, default: '#4f88ff' },
    // Applies custom class to datepicker content
    contentClass: { type: String, default: '' },
    // Allowed dates
    allowedDates: { type: Function },
    minDate: { type: [String, Number, Date] },
    maxDate: { type: [String, Number, Date] },
    // Range for year picker
    visibleYearsNumber: { type: Number, default: 10 },
    // Disabled all datepicker
    disabled: { type: Boolean, default: false },
    // Inline
    inline: { type: Boolean, default: false },
    // Set if header in agenda should be visible
    noHeader: { type: Boolean, default: false },
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
        'vd-wrapper--inline': this.inline,
        'vd-wrapper--disabled': this.disabled,
        'vd-wrapper--rtl': this.rtl,
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
      const { buttonValidate, buttonCancel, rangeHeaderText } = this.currentLocale.lang;
      return {
        buttonValidate: this.buttonValidate || buttonValidate,
        buttonCancel: this.buttonCancel || buttonCancel,
        rangeHeaderText: this.rangeHeaderText || rangeHeaderText,
      };
    },
    internalDate: {
      get () {
        return initDate(this.value, {
          range: this.range,
          locale: this.currentLocale,
          type: this.type,
        });
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
    formattedInputDate () {
      return genFormattedInputDate({
        inputFormat: this.inputFormat,
        internalDate: this.internalDate,
        isDateDefined: this.isDateDefined,
        locale: this.currentLocale,
        range: this.range,
        rangeInputText: this.rangeInputText,
        type: this.type,
      });
    },
    isFullScreenMode () {
      return this.fullscreenMobile && this.isMobile;
    },
  },
  watch: {
    visible: {
      handler (isMenuActive) {
        this.isMenuActive = isMenuActive;
      },
      immediate: true,
    },
    isFullScreenMode () {
      if (!this.isMenuActive) return;

      this.hideDatePicker();
      setTimeout(() => {
        this.showDatePicker();
      }, 200);
    },
  },
  created () {
    /* istanbul ignore next */
    ['no-input'].forEach(prop => {
      if (this.$attrs.hasOwnProperty(prop)) removed({ original: prop, vm: this });
    });

    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('fullscreen-breakpoint')) {
      deprecate({ original: 'fullscreen-mobile', replacement: 'mobile-breakpoint', vm: this });
    }
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

      this.$emit('input', transformDateForModel(this.date, this.outputFormat, this.range));
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
    onClearDate () {
      this.$emit('input', undefined);
      this.$emit('onChange');
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    genContent () {
      if (this.inline) return [this.genAgenda()];

      return [
        this.$scopedSlots.activator ? this.genActivator() : this.genCustomInput(),
        this.genMenuWithContent(),
      ];
    },
    genActivator () {
      return this.$createElement('div', {
        staticClass: 'vd-activator',
        directives: [{
          name: 'click-outside',
          value: {
            isActive: this.isMenuActive && !this.isFullScreenMode,
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
          date: this.formattedInputDate,
        }),
      ]);
    },
    genCustomInput () {
      return this.$createElement(VDPickerCustomInput, {
        props: {
          clearable: this.clearable,
          color: this.color,
          date: this.formattedInputDate,
          disabled: this.disabled,
          id: this.componentId,
          isDateDefined: this.isDateDefined,
          isMenuActive: this.isMenuActive,
          name: this.name,
          noCalendarIcon: this.noCalendarIcon,
          placeholder: this.placeholder,
          tabindex: this.tabindex,
        },
        directives: [{
          name: 'click-outside',
          value: {
            isActive: this.isMenuActive && !this.isFullScreenMode,
            handler: this.hideDatePicker,
          },
        }],
        nativeOn: {
          click: this.showDatePicker,
        },
        on: {
          keydown: this.onKeyDown,
          clearDate: this.onClearDate,
        },
        ref: 'activator',
      });
    },
    genMenuWithContent () {
      const shouldShowBottomSheet = this.isFullScreenMode;

      const menuProps = {
        ...defaultMenuProps,
        value: this.isMenuActive,
        origin: this.origin,
        allowOverflow: this.allowOverflow,
        attach: !shouldShowBottomSheet ? this.attach : false,
        transition: shouldShowBottomSheet ? 'slide-in-out-transition' : 'scale-transition',
        // Allow GMenu to act like a bottomSheet
        // TODO create a GBottomSheet component
        bottomSheet: shouldShowBottomSheet,
      };
      const activator = this.activator;

      return this.$createElement(VDMenu, {
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
    genAgenda () {
      return this.$createElement(VDPickerAgenda, {
        props: {
          allowedDates: this.allowedDates,
          buttonCancel: this.textsFormat.buttonCancel,
          buttonValidate: this.textsFormat.buttonValidate,
          color: this.color,
          date: this.internalDate,
          fullscreen: this.isBooted && this.isMenuActive && this.isFullScreenMode,
          headerFormat: this.headerFormat,
          locale: this.currentLocale,
          maxDate: this.maxDate,
          minDate: this.minDate,
          name: this.name,
          noHeader: this.noHeader,
          range: this.range,
          rangeHeaderText: this.textsFormat.rangeHeaderText,
          rangePresets: this.rangePresets,
          rtl: this.rtl,
          type: this.type,
          validate: this.validate,
          value: this.isMenuActive,
          visibleYearsNumber: this.visibleYearsNumber,
        },
        on: {
          selectDate: this.changeDate,
          validateDate: this.validateDate,
          close: this.hideDatePicker,
        },
        directives: [{
          name: 'click-outside',
          value: {
            isActive: this.isBooted && this.isMenuActive,
            handler: this.hideDatePicker,
          },
        }],
        ref: 'agenda',
      });
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'vd-wrapper',
      class: this.classes,
    }, this.genContent());
  },
});
