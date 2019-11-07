<script>
// constants
import { ICONS } from '../../constants/icons';

// helpers
import { deepMerge } from '../../utils/helpers';

export default {
  name: 'Icon',
  inheritAttrs: false,
  props: {
    height: { type: [Number, String], default: 16 },
    width: { type: [Number, String], default: 16 },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    defaultData () {
      const hasClickListener = Boolean(this.$listeners.click);
      return {
        staticClass: 'icon',
        class: {
          'icon--disabled': this.disabled,
          'icon--link': hasClickListener,
        },
        attrs: {
          'aria-hidden': !hasClickListener,
          role: hasClickListener ? 'button' : null,
          ...this.$attrs,
        },
        on: this.$listeners,
      };
    },
  },
  methods: {
    getIcon () {
      let iconName = '';
      if (this.$slots.default) {
        iconName = this.$slots.default[0].text && this.$slots.default[0].text.trim();
      }
      return ICONS[iconName] || iconName;
    },
    renderSvgIcon (icon, h) {
      const data = deepMerge(this.defaultData, {
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: icon.viewBox,
          height: this.height,
          width: this.width,
          role: 'img',
          'aria-hidden': !this.$attrs['aria-label'],
          'aria-label': this.$attrs['aria-label'],
        },
      });

      return h('svg', data, [
        h('path', {
          attrs: {
            fill: 'currentColor',
            d: icon.path,
          },
        }),
      ]);
    },
  },
  render (h) {
    const icon = this.getIcon();
    return this.renderSvgIcon(icon, h);
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/abstracts/_index.scss';

  .icon {

    // Increased specificity to overwrite
    &.icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      letter-spacing: normal;
      line-height: 1;
      text-indent: 0;
      transition: all .3s get-easing(swing);
      transition-property: transform, color;
      vertical-align: middle;
      user-select: none;
    }

    &--link {
      cursor: pointer;
    }

    &--disabled {
      pointer-events: none;
      opacity: .6;
    }
  }
</style>
