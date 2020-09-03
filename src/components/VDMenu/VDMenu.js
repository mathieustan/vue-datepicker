// Styles
import './VDMenu.scss';

// Directives
import Resize from '../../directives/resize';

// Mixins
import activatable from '../../mixins/activatable';
import detachable from '../../mixins/detachable';
import dynamicPosition from '../../mixins/dynamicPosition';
import stackable from '../../mixins/stackable';

// Utils
import { convertToUnit } from '../../utils/helpers';

export default {
  name: 'VDMenu',
  mixins: [activatable, detachable, dynamicPosition, stackable],
  directives: { Resize },
  props: {
    // Allows to update transition (cf src/styles/base/_transitions.scss)
    transition: { type: String, default: 'menu-transition' },
    // Animation origin
    origin: { type: String, default: undefined },
    // Allows the menu to overflow off the screen
    allowOverflow: { type: Boolean, default: false },
    // Right-to-Left
    rtl: { type: Boolean, default: false },
    // sets menu min content width
    minWidth: { type: [Number, String], default: undefined },
    // sets menu max content width
    maxWidth: { type: [Number, String], default: undefined },
    // Allows to set a specific height for menu
    maxHeight: { type: [Number, String], default: 'auto' },
    // Allows to update z-index
    zIndex: { type: Number, default: undefined },
    // Allows Menu to act like a bottomSheet
    // TODO create a VDBottomSheet component
    bottomSheet: { type: Boolean, default: false },
  },
  data: () => ({
    resizeTimeout: 0,
    defaultOffset: 8,
  }),
  computed: {
    styles () {
      return {
        maxHeight: this.calculedMenuMaxHeight,
        minWidth: this.calculedMenuWidth,
        maxWidth: this.calculedMaxWidth,
        top: this.calculedTop,
        left: this.calculedLeft,
        transformOrigin: this.detectedOrigin,
        zIndex: this.zIndex || this.activeZIndex,
      };
    },
    calculedMenuMaxHeight () {
      return convertToUnit(this.maxHeight);
    },
    calculedMaxWidth () {
      return convertToUnit(this.maxWidth);
    },
    calculedMenuWidth () {
      if (this.minWidth) {
        return convertToUnit(this.minWidth);
      }

      const minWidth = Math.min(
        this.dimensions.activator.width,
        Math.max(this.pageWidth - 24, 0)
      );

      const isMaxWidthUnitless = parseInt(this.calculedMaxWidth) === this.calculedMaxWidth * 1;

      const maxWidth = isMaxWidthUnitless
        ? this.calculedMaxWidth : parseInt((this.calculedMaxWidth || '').split('px')[0]);
      const calculedMaxWidth = maxWidth || minWidth;
      return convertToUnit(Math.min(
        calculedMaxWidth,
        minWidth
      ));
    },
    calculedLeft () {
      const menuWidth = Math.max(this.dimensions.content.width, parseFloat(this.calculedMenuWidth));
      return this.calcLeft(menuWidth) || '0';
    },
    calculedTop () {
      return this.calcTop() || '0';
    },
    detectedOrigin () {
      return this.detectOrigin(this.calculedLeft, this.calculedTop);
    },
  },
  mounted () {
    this.isActive && this.callActivate();
  },
  methods: {
    activate () {
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions();
      // Start the transition
      requestAnimationFrame(() => {
        // Once transitioning, calculate scroll and top position
        this.startTransition().then(() => {
          this.$emit('transitionEnd');
        });
      });
    },
    callDeactivate () {
      this.isContentActive = false;
    },
    onResize () {
      if (!this.isActive) return;

      // Account for screen resize
      // and orientation change
      // eslint-disable-next-line no-unused-expressions
      this.$refs.content.offsetWidth;
      this.updateDimensions();

      // When resizing to a smaller width
      // content width is evaluated before
      // the new activator width has been
      // set, causing it to not size properly
      // hacky but will revisit in the future
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.updateDimensions, 100);
    },
    // ------------------------------
    // Generate template dynamically
    // ------------------------------
    genTransition () {
      return this.$createElement('transition', {
        props: { name: this.transition },
      }, [this.genContent()]);
    },
    genContent () {
      const options = {
        attrs: {
          role: this.$attrs.role || 'menu',
        },
        staticClass: 'vd-menu__content',
        class: {
          ...(this.contentClass && { [this.contentClass]: true }),
          'vd-menu__content--active': this.isActive,
          'vd-menu__content--fixed': this.activatorFixed,
          'vd-menu__content--bottomsheet': this.bottomSheet,
        },
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isContentActive,
        }],
        ref: 'content',
        on: {
          click: event => event.stopPropagation(),
        },
      };

      return this.$createElement(
        'div',
        options,
        [this.hasContent && this.getContentSlot()],
      );
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'vd-menu',
      class: {
        'menu--attached': this.isAttached,
      },
      directives: [{
        arg: '500',
        name: 'resize',
        value: this.onResize,
      }],
    }, [
      !this.activator && this.genActivator(),
      this.showLazyContent(() => [this.genTransition()]),
    ]);
  },
};
