import Vue from 'vue';

export default Vue.extend({
  name: 'Mobile',
  props: {
    mobileBreakpoint: {
      type: [Number, String],
      default: 576,
      validator: value => !isNaN(Number(value)),
    },
  },
  data: () => ({
    width: 0,
    mobile: false,
    resizeTimeout: undefined,
  }),
  computed: {
    isMobile () {
      return this.mobile;
    },
  },
  created () {
    /* istanbul ignore next */
    if (!window) return;

    window.addEventListener('resize', this.onResize, { passive: true });
    this.$on('hook:destroyed', () => {
      window.removeEventListener('resize', this.onResize, { passive: true });
    });

    this.update();
  },
  methods: {
    onResize () {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.update, 200);
    },
    update () {
      const width = this.getClientWidth();

      this.width = width;
      this.mobile = width < parseInt(this.mobileBreakpoint, 10);
    },
    getClientWidth () {
      /* istanbul ignore next */
      if (typeof document === 'undefined') return 0;

      return Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
    },
  },
});
