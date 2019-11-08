<script>
// mixins
import detachable from '../../mixins/detachable';
import toggleable from '../../mixins/toggleable';

export default {
  name: 'DatePickerOverlay',
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
        staticClass: 'datepicker__overlay',
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
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/_index.scss';

  .datepicker__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparentize(black, .5);

    @include mq(phone) {
      display: none;
    }
  }

  .overlay-transition {
    &-enter-active,
    &-leave-active {
      opacity: 1;
      transition: opacity 300ms;
    }
    &-leave-to,
    &-enter{
      opacity: 0;
    }
  }
</style>
