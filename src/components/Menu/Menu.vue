<script>
import getSize from 'get-size';

// directives
import Resize from '../../directives/resize';

// mixins
import activatable from '../../mixins/activatable';
import detachable from '../../mixins/detachable';
import dynamicPosition from '../../mixins/dynamicPosition';
import stackable from '../../mixins/stackable';

// utils
import { convertToUnit } from '../../utils/helpers';

export default {
  name: 'Menu',
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
    // TODO create a GBottomSheet component
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
      if (!this.minWidth) {
        const minWidth = Math.min(
          (this.activatorElement && getSize(this.activatorElement).width) || 0,
          Math.max(window.innerWidth - 24, 0)
        );
        return `${minWidth}px`;
      }

      const isMinWidthUnitless = parseInt(this.minWidth) === this.minWidth * 1;
      const minWidth = isMinWidthUnitless ? this.minWidth : parseInt(this.minWidth.split('px')[0]);
      return `${minWidth}px`;
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
  watch: {
    isActive (value) {
      if (this.disabled) return;
      if (value) {
        this.callActivate();
        return;
      }

      this.callDeactivate();
    },
  },
  methods: {
    callActivate () {
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
        staticClass: 'menu__content',
        class: {
          'menu__content--active': this.isActive,
          'menu__content--fixed': this.activatorFixed,
          'menu__content--bottomsheet': this.bottomSheet,
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
      staticClass: 'menu',
      class: {
        'menu--attached': this.isAttached,
      },
      directives: [{
        arg: '500',
        name: 'resize',
        value: this.onResize,
      }],
    }, [
      [!this.activator && this.genActivator()],
      this.genTransition(),
    ]);
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/abstracts/_index.scss',
          '../../styles/base/_index.scss';

  .menu,
  .menu *,
  .menu ::before,
  .menu ::after {
    box-sizing: border-box;
  }

  .menu {
    display: none;

    &--attached {
      display: inline;
    }

    &__activator {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    * {
      cursor: pointer;
    }

    &__content {
      position: absolute;
      display: inline-block;
      border-radius: get-border-radius(2);
      max-width: 80%;
      overflow-y: auto;
      overflow-x: hidden;
      contain: content;
      background-color: white;
      // This is required for an issue on Chrome 65
      // that prevents scrolling after a menu is opened
      will-change: transform;
      box-shadow: 0 2px 8px rgba(50, 50, 93, 0.2);

      &--fixed {
        position: fixed;
      }

      &--bottomsheet {
        position: fixed;
        top: auto !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        min-width: 100% !important;
        border-radius: get-border-radius(4) get-border-radius(4) 0 0;

        // Browsers which partially support CSS Environment variables (iOS 11.0-11.2).
        @supports (padding-bottom: constant(safe-area-inset-bottom)) {
          --safe-area-inset-bottom: constant(safe-area-inset-bottom);
          padding-bottom: var(--safe-area-inset-bottom);
        }

        // Browsers which fully support CSS Environment variables (iOS 11.2+).
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          --safe-area-inset-bottom: env(safe-area-inset-bottom);
          padding-bottom: var(--safe-area-inset-bottom);
        }
      }
    }

    &-transition {
      &-leave-active,
      &-leave-to {
        pointer-events: none;
      }

      &-enter,
      &-leave-to {
        opacity: 0;
      }

      &-enter-active,
      &-leave-active {
        transition: all .3s get-easing(fastInFastOut);
        transition-property: opacity, transform;
      }
    }
  }
</style>
