import { getZIndex } from '../utils/helpers';

const stackable = {
  data: () => ({
    stackMinZIndex: 1000,
  }),
  computed: {
    activeZIndex () {
      const content = this.$refs.content;
      // Return current zindex if not active
      const index = !this.isActive
        ? getZIndex(content)
        : this.getMaxZIndex() + 2;

      // Return max current z-index (excluding self) + 2
      // (2 to leave room for an overlay below, if needed)
      return parseInt(index);
    },
  },
  methods: {
    getMaxZIndex () {
      const base = this.$el;
      // Convert the NodeList to an array to
      // prevent an Edge bug with Symbol.iterator
      const activeElements = [
        // should add dialog / fullscreen panels (to be above)
        ...document.getElementsByClassName('menu__content--active'),
      ];

      const zIndexes = [
        this.stackMinZIndex,
        getZIndex(base),
        ...activeElements.map(activeElement => getZIndex(activeElement)),
      ];

      return Math.max(...zIndexes);
    },
  },
};

export default stackable;
