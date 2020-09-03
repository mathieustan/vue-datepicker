// Mixins
import bootable from './bootable';

import { validateAttachTarget } from '../utils/helpers';

const detachable = {
  name: 'Detachable',
  mixins: [bootable],
  props: {
    attach: { validator: validateAttachTarget, default: false },
    contentClass: { type: String, default: '' },
  },
  data: () => ({
    activatorNode: undefined,
    hasDetached: false,
  }),
  watch: {
    attach () {
      this.hasDetached = false;
      this.initDetach();
    },
    hasContent () {
      this.$nextTick(this.initDetach);
    },
  },
  beforeMount () {
    this.$nextTick(() => {
      if (!this.activatorNode) return;
      const activator = Array.isArray(this.activatorNode)
        ? this.activatorNode : [this.activatorNode];

      activator.forEach(node => {
        if (!node.elm) return;
        if (!this.$el.parentNode) return;

        const target = this.$el === this.$el.parentNode.firstChild
          ? this.$el
          : this.$el.nextSibling;

        this.$el.parentNode.insertBefore(node.elm, target);
      });
    });
  },
  mounted () {
    this.hasContent && this.initDetach();
  },
  deactivated () {
    /* istanbul ignore next */
    this.isActive = false;
  },
  beforeDestroy () {
    try {
      if (
        this.$refs.content &&
        this.$refs.content.parentNode
      ) {
        this.$refs.content.parentNode.removeChild(this.$refs.content);
      }

      if (this.activatorNode) {
        const activator = Array.isArray(this.activatorNode)
          ? this.activatorNode : [this.activatorNode];

        activator.forEach(node => {
          node.elm &&
            node.elm.parentNode &&
            node.elm.parentNode.removeChild(node.elm);
        });
      }
    } catch (error) {
      /* istanbul ignore next */
      console.error(error);
    }
  },
  methods: {
    initDetach () {
      if (
        /* eslint-disable-next-line */
        this._isDestroyed ||
        !this.$refs.content ||
        this.hasDetached ||
        // Leave menu in place if attached
        // and dev has not changed target
        this.attach === '' || // If used as a boolean prop (<vd-menu attach>)
        this.attach === true // If bound to a boolean (<vd-menu :attach="true">)
      ) return;

      let target;
      if (this.attach === false) {
        // Default, detach to app
        target = document.querySelector('#app') || document.querySelector('body');
      } else if (typeof this.attach === 'string') {
        target = document.querySelector(this.attach); // CSS selector
      } else {
        target = this.attach; // DOM Elements
      }

      if (!target) {
        console.error(`Unable to locate target '${this.attach}'`, this);
        return;
      }

      target.appendChild(this.$refs.content);
      this.hasDetached = true;
    },
  },
};

export default detachable;
