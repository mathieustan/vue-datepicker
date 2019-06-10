import { getDynamicPosition } from '@/utils/positions';

const dynamicPosition = {
  data: () => ({
    offset: 28,
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

      const { top, left, origin } = getDynamicPosition(
        this.$refs.content,
        document.querySelector('.datepicker-container--active'),
        this.offset
      );
      this.top = top;
      this.left = left;
      this.origin = origin;
    },
  },
};

export default dynamicPosition;
