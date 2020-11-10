// Styles
import './VDOverlay.scss';

// Mixins
import colorable from '../../mixins/colorable';
import Toggleable from '../../mixins/toggleable';

// Utilities
import mixins from '../../utils/mixins';

const baseMixins = mixins(
  colorable,
  Toggleable,
);

export default baseMixins.extend({
  name: 'VDOverlay',
  props: {
    absolute: { type: Boolean, default: false },
    color: { type: String, default: 'rgba(93, 106, 137)' },
    opacity: { type: [Number, String], default: 0.84 },
    value: { default: true },
    zIndex: { type: [Number, String], default: undefined },
  },
  computed: {
    classes () {
      return {
        'vd-overlay--absolute': this.absolute,
        'vd-overlay--active': this.isActive,
      };
    },
    styles () {
      return {
        zIndex: this.zIndex,
      };
    },
    computedOpacity () {
      return Number(this.isActive ? this.opacity : 0);
    },
    overlayInner () {
      const data = this.setBackgroundColor(this.color, {
        staticClass: 'vd-overlay__inner',
        style: {
          opacity: this.computedOpacity,
        },
      });

      return this.$createElement('div', data);
    },
  },
  methods: {
    genContent () {
      return this.$createElement('div', {
        staticClass: 'vd-overlay__content',
      }, this.$slots.default);
    },
  },

  render (h) {
    const children = [this.overlayInner];

    if (this.isActive) children.push(this.genContent());

    return h('div', {
      staticClass: 'vd-overlay',
      class: this.classes,
      style: this.styles,
    }, children);
  },
});

