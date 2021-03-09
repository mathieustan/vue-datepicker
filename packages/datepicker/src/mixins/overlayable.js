/* istanbul ignore file */

import Vue from 'vue';

// Components
import VDOverlay from '../components/VDOverlay';

// Utilities
import {
  addOnceEventListener,
  getZIndex,
} from '../utils/helpers';

// Constants
import { KEYCODES } from '../constants';

const VDOverlayConstructor = Vue.extend(VDOverlay);

export default Vue.extend({
  name: 'Overlayable',
  props: {
    // sets the overlay color
    overlayColor: { type: String, default: undefined },
    // set the overlay opacity
    overlayOpacity: { type: [Number, String], default: undefined },
  },
  data: () => ({
    overlay: undefined,
  }),
  beforeDestroy () {
    this.removeOverlay();
  },
  methods: {
    // ------------------------------
    // Events
    // ------------------------------
    scrollListener (event) {
      if (event.type === 'keydown') {
        if (
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName) ||
          event.target.isContentEditable
        ) return;

        const up = [KEYCODES.up, KEYCODES.pageup];
        const down = [KEYCODES.down, KEYCODES.pagedown];

        if (up.includes(event.keyCode)) {
          event.deltaY = -1;
        } else if (down.includes(event.keyCode)) {
          event.deltaY = 1;
        } else {
          return;
        }
      }

      if (
        event.target === this.overlay ||
        (event.type !== 'keydown' && event.target === document.body) ||
        this.checkPath(event)
      ) event.preventDefault();
    },
    hasScrollbar (el) {
      if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;

      const style = window.getComputedStyle(el);
      return ['auto', 'scroll'].includes(style.overflowY) && el.scrollHeight > el.clientHeight;
    },
    shouldScroll (el, delta) {
      if (el.scrollTop === 0 && delta < 0) return true;
      return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0;
    },
    isInside (el, parent) {
      if (el === parent) {
        return true;
      } else if (el === null || el === document.body) {
        return false;
      } else {
        return this.isInside(el.parentNode, parent);
      }
    },
    checkPath (event) {
      const path = event.path || this.composedPath(event);
      const delta = event.deltaY;

      if (event.type === 'keydown' && path[0] === document.body) {
        const dialog = this.$refs.dialog;
        // getSelection returns null in firefox in some edge cases, can be ignored
        const selected = window.getSelection() && window.getSelection().anchorNode;
        if (dialog && this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return this.shouldScroll(dialog, delta);
        }
        return true;
      }

      for (let index = 0; index < path.length; index++) {
        const el = path[index];

        if (el === document) return true;
        if (el === document.documentElement) return true;
        if (el === this.$refs.content) return true;

        if (this.hasScrollbar(el)) return this.shouldScroll(el, delta);
      }

      return true;
    },
    /**
     * Polyfill for Event.prototype.composedPath
     */
    composedPath (event) {
      if (event.composedPath) return event.composedPath();

      const path = [];
      let el = event.target;

      while (el) {
        path.push(el);

        if (el.tagName === 'HTML') {
          path.push(document);
          path.push(window);

          return path;
        }

        el = el.parentElement;
      }
      return path;
    },
    hideScroll () {
      window.addEventListener('wheel', this.scrollListener, { passive: false });
      window.addEventListener('keydown', this.scrollListener);
    },
    showScroll () {
      document.documentElement.classList.remove('overflow-y-hidden');
      window.removeEventListener('wheel', this.scrollListener);
      window.removeEventListener('keydown', this.scrollListener);
    },
    // ------------------------------
    // Generate Template
    // ------------------------------
    createOverlay () {
      const overlay = new VDOverlayConstructor({
        propsData: {
          absolute: this.absolute,
          value: false,
          color: this.overlayColor,
          opacity: this.overlayOpacity,
        },
      });

      overlay.$mount();

      const defaultTarget = document.querySelector('#app') || document.querySelector('body');
      const parent = this.absolute ? this.$el.parentNode : defaultTarget;
      parent && parent.insertBefore(overlay.$el, parent.firstChild);
      this.overlay = overlay;
    },
    genOverlay () {
      this.hideScroll();

      if (!this.overlay) this.createOverlay();

      requestAnimationFrame(() => {
        if (!this.overlay) return;

        if (this.activeZIndex !== undefined) {
          this.overlay.zIndex = String(this.activeZIndex - 1);
        } else if (this.$el) {
          this.overlay.zIndex = getZIndex(this.$el);
        }

        this.overlay.value = true;
      });

      return true;
    },
    /** removeOverlay(false) will not restore the scollbar afterwards */
    removeOverlay (showScroll = true) {
      if (this.overlay) {
        addOnceEventListener(this.overlay.$el, 'transitionend', () => {
          if (
            !this.overlay ||
            !this.overlay.$el ||
            !this.overlay.$el.parentNode ||
            this.overlay.value
          ) return;

          this.overlay.$el.parentNode.removeChild(this.overlay.$el);
          this.overlay.$destroy();
          this.overlay = null;
        });

        this.overlay.value = false;
      }

      showScroll && this.showScroll();
    },
  },
});
