// Styles
import './VDPickerOverlay.scss';

// Mixins
import detachable from '../../../mixins/detachable';
import toggleable from '../../../mixins/toggleable';

export default {
  name: 'VDPickerOverlay',
  mixins: [detachable, toggleable],
  props: {
    zIndex: { type: Number },
  },
  computed: {
    styles () {
      return {
        zIndex: this.zIndex,
      };
    },
  },
  watch: {
    isActive: {
      handler (value) {
        if (!value) return;
        this.$nextTick(() => this.initDetach());
      },
      immediate: true,
    },
  },
  methods: {
    genTransition () {
      return this.$createElement('transition', {
        props: { name: 'overlay-transition', appear: true },
      }, [this.genContent()]);
    },
    genContent () {
      return this.$createElement('div', {
        staticClass: 'vd-picker__overlay',
        style: this.styles,
        ref: 'content',
        on: {
          click: () => this.$emit('close'),
        },
      });
    },
  },
  render () {
    return this.isActive && this.genTransition();
  },
};
