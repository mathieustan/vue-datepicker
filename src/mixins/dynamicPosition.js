import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { getDynamicPosition } from '@/utils/positions';

const dynamicPosition = {
  data: () => ({
    offset: 28,
    left: 0,
    top: 0,
    origin: 'top center',
  }),
  computed: {
    styles () {
      return {
        left: `${this.left}px`,
        top: `${this.top}px`,
        transformOrigin: this.origin,
      };
    },
  },
  mounted () {
    if (this.inline) return;
    // We're using a `requestAnimationFrame()`
    // for optimal performance.
    this.eventHandler = () => requestAnimationFrame(this.updatePosition);

    this.$on('hook:destroyed', () => {
      clearAllBodyScrollLocks();
    });
  },
  methods: {
    initResizeListener () {
      window.addEventListener('resize', this.eventHandler);
    },
    removeResizeListener () {
      window.removeEventListener('resize', this.eventHandler);
    },
    updatePosition () {
      if (window.innerWidth < 480 && this.fullscreenMobile && this.isVisible) {
        disableBodyScroll(this.$refs.content);
      } else {
        enableBodyScroll(this.$refs.content);
      }

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
