// Styles
import './VDIcon.scss';

// Mixins
import colorable from '../../mixins/colorable';

// Constants
import { ICONS } from '../../constants/icons';

// Helpers
import { convertToUnit } from '../../utils/helpers';
import mixins from '../../utils/mixins';

const baseMixins = mixins(
  colorable,
);

export default baseMixins.extend({
  name: 'VDIcon',
  inheritAttrs: false,
  props: {
    size: { type: [Number, String] },
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
        staticClass: 'vd-icon',
        class: {
          'vd-icon--disabled': this.disabled,
          'vd-icon--link': this.hasClickListener,
        },
        attrs: {
          'aria-hidden': !this.hasClickListener,
          disabled: this.hasClickListener && this.disabled,
          type: this.hasClickListener ? 'button' : undefined,
          ...this.$attrs,
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
          height: this.size || 16,
          width: this.size || 16,
          role: 'img',
          'aria-hidden': true,
          'data-icon': this.getIconName(),
        },
      };

      return h(tag, this.setTextColor(this.color, wrapperData), [
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
});
