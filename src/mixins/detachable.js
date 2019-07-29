import { validateAttachTarget } from '../utils/helpers';

const detachable = {
  props: {
    attachTo: { validator: validateAttachTarget, default: 'body' },
  },
  data: () => ({
    hasDetached: false,
  }),
  beforeDestroy () {
    if (this.$refs.content) {
      this.$refs.content.parentNode.removeChild(this.$refs.content);
    }
  },
  methods: {
    initDetach () {
      if (!this.$refs.content || this.hasDetached) return;

      let target;
      if (typeof this.attachTo === 'string') {
        target = document.querySelector(this.attachTo); // CSS selector
      } else {
        target = this.attachTo; // DOM Element
      }

      if (!target) {
        console.error(`Unable to locate target '${this.attachTo}'`, this);
        return;
      }

      target.insertBefore(this.$refs.content, target.firstChild);
      this.hasDetached = true;
    },
  },
};

export default detachable;
