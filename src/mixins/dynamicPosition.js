import { getDynamicPosition } from '../utils/positions';

const dynamicPosition = {
  data: () => ({
    left: 0,
    top: 0,
    origin: 'top center',
    innerWidth: window.innerWidth,
  }),
  mounted () {
    if (this.inline) return;
    // We're using a `requestAnimationFrame()` for optimal performance.
    this.eventHandler = () => requestAnimationFrame(this.updatePosition);
  },
  methods: {
    initResizeListener () {
      window.addEventListener('resize', this.eventHandler);
    },
    removeResizeListener () {
      window.removeEventListener('resize', this.eventHandler);
    },
    updatePosition () {
      this.innerWidth = window.innerWidth;

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

      const { top, left, origin } = getDynamicPosition(
        this.$refs.content, // element to show
        document.querySelector('.datepicker-container--active'), // datepicker container
        target, // where datepicker will be shown
        this.rtl, // whether we are in RTL mode or not

      );
      this.top = top;
      this.left = left;
      this.origin = origin;
    },
  },
};

export default dynamicPosition;
