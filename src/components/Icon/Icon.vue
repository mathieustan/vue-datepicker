<script>
// constants
import { ICONS } from '../../constants/icons';

// helpers
import { convertToUnit } from '../../utils/helpers';

export default {
  name: 'Icon',
  inheritAttrs: false,
  props: {
    size: { type: [Number, String], default: 16 },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    hasClickListener () {
      return Boolean(this.$listeners.click);
    },
  },
  methods: {
    getIconName () {
      if (!this.$slots.default) return '';
      return this.$slots.default[0].text && this.$slots.default[0].text.trim();
    },
    getIcon () {
      const iconName = this.getIconName();
      return ICONS[iconName] || iconName;
    },
    getDefaultData () {
      return {
        staticClass: 'icon',
        class: {
          'icon--disabled': this.disabled,
          'icon--link': this.hasClickListener,
        },
        attrs: {
          'aria-hidden': !this.hasClickListener,
          disabled: this.hasClickListener && this.disabled,
          type: this.hasClickListener ? 'button' : undefined,
        },
        on: this.$listeners,
      };
    },
    renderSvgIcon (icon, h) {
      const tag = this.hasClickListener ? 'button' : 'span';
      const fontSize = convertToUnit(this.size);

      const wrapperData = {
        ...this.getDefaultData(),
        style: {
          ...(fontSize && { fontSize, height: fontSize, width: fontSize }),
        },
      };

      const svgData = {
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: icon.viewBox,
          height: this.size,
          width: this.size,
          role: 'img',
          'aria-hidden': true,
          'data-icon': this.getIconName(),
        },
      };

      return h(tag, wrapperData, [
        h('svg', svgData, [
          h('path', {
            attrs: {
              fill: 'currentColor',
              d: icon.path,
            },
          }),
        ]),
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
