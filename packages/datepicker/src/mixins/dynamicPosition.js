// Helpers
import { convertToUnit } from '../utils/helpers';
import {
  detectFixedActivator,
  getInnerWidth,
  getInnerHeight,
  getOffsetLeft,
  getOffsetTop,
  measure,
} from '../utils/positions';

const scrollbarWidth = 12;

const dynamicPosition = {
  name: 'DynamicPosition',
  data: () => ({
    activatorFixed: false,
    dimensions: {
      activator: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        offsetTop: 0,
        scrollHeight: 0,
        offsetLeft: 0,
      },
      content: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        offsetTop: 0,
        scrollHeight: 0,
      },
    },
    isContentActive: false,
    pageWidth: 0,
    pageYOffset: 0,
  }),
  computed: {
    isAttached () {
      return this.attach !== false; // default attach is body
    },
    computedLeft () {
      const { activator, content } = this.dimensions;
      const left = (this.isAttached ? activator.offsetLeft : activator.left) || 0;
      return this.rtl ? (activator.right - content.width) : left;
    },
    computedTop () {
      const { activator } = this.dimensions;
      const activatorHeight = activator.height;
      const top = (this.isAttached ? activator.offsetTop : activator.top + this.pageYOffset) || 0;
      return top + activatorHeight;
    },
    hasActivator () {
      return Boolean(this.$slots.activator) ||
        Boolean(this.$scopedSlots.activator) ||
        Boolean(this.activator);
    },
  },
  watch: {
    disabled (val) {
      val && this.callDeactivate();
    },
    isActive (val) {
      if (this.disabled) return;

      val ? this.callActivate() : this.callDeactivate();
    },
  },
  methods: {
    activate () {},
    deactivate () {},
    callActivate () {
      this.activate();
    },
    callDeactivate () {
      this.isContentActive = false;
      this.deactivate();
    },
    calcLeft (menuWidth) {
      return convertToUnit(this.isAttached
        ? this.computedLeft
        : this.calcXOverflow(this.computedLeft, menuWidth));
    },
    calcTop () {
      return convertToUnit(this.isAttached
        ? this.computedTop
        : this.calcYOverflow(this.computedTop));
    },
    calcXOverflow (left, menuWidth) {
      const xOverflow = left + menuWidth - this.pageWidth + scrollbarWidth;

      if ((!this.left || this.right) && xOverflow > 0) {
        left = Math.max(left - xOverflow, 0);
      } else {
        left = Math.max(left, scrollbarWidth);
      }

      return left + getOffsetLeft();
    },
    calcYOverflow (top) {
      const toTop = this.pageYOffset + getInnerHeight();
      const { activator, content } = this.dimensions;
      const contentHeight = (content || {}).height;
      const totalHeight = top + contentHeight;
      const isOverflowing = toTop < totalHeight;

      // Should place content above activator
      if (isOverflowing && activator.top > contentHeight) {
        top = this.pageYOffset + (activator.top - contentHeight);
      // If overflowing bottom
      } else if (isOverflowing && !this.allowOverflow) {
        top = toTop - contentHeight - scrollbarWidth;
      // If overflowing top
      } else if (top < this.pageYOffset && !this.allowOverflow) {
        top = this.pageYOffset + scrollbarWidth;
      }

      return top < scrollbarWidth ? scrollbarWidth : top;
    },
    detectOrigin (leftInPx, topInPx) {
      const left = parseInt(leftInPx.split('px')[0]);
      const top = parseInt(topInPx.split('px')[0]);
      const { activator } = this.dimensions;

      const origin = [];
      origin.push(activator.top < (top - this.pageYOffset) ? 'top' : 'bottom');
      origin.push(activator.left === left ? 'left' : 'right');

      return this.origin || origin.join(' ');
    },
    checkForPageYOffset () {
      this.pageYOffset = this.activatorFixed ? 0 : getOffsetTop();
    },
    checkActivatorFixed () {
      if (this.isAttached) return;
      const activator = this.getActivator();
      this.activatorFixed = detectFixedActivator(activator);
    },
    sneakPeek (cb) {
      requestAnimationFrame(() => {
        const element = this.$refs.content;
        if (!element || element.style.display !== 'none') {
          cb();
          return;
        }

        element.style.display = 'inline-block';
        cb();
        element.style.display = 'none';
      });
    },
    startTransition () {
      return new Promise(resolve => requestAnimationFrame(() => {
        this.isContentActive = this.isActive;
        resolve();
      }));
    },
    updateDimensions () {
      this.checkActivatorFixed();
      this.checkForPageYOffset();
      this.pageWidth = getInnerWidth();

      const dimensions = {};
      const activator = this.getActivator();
      if (!activator) return;

      dimensions.activator = measure(activator, this.attach);
      dimensions.activator.offsetLeft = activator.offsetLeft;

      if (this.isAttached) {
        dimensions.activator.offsetTop = activator.offsetTop;
      } else {
        dimensions.activator.offsetTop = 0;
      }

      // Display and hide to get dimensions
      this.sneakPeek(() => {
        dimensions.content = measure(this.$refs.content, this.attach);
        this.dimensions = dimensions;
      });
    },
  },
};

export default dynamicPosition;
