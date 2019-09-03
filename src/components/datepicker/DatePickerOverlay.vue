<template>
  <transition name="overlay-transition" appear>
    <div
      ref="content"
      v-if="shouldShowOverlay"
      :style="styles"
      class="datepicker-overlay"
      @click="$emit('close')"
    />
  </transition>
</template>

<script>
import detachable from '../../mixins/detachable';

export default {
  name: 'DatePickerOverlay',
  mixins: [detachable],
  props: {
    isVisible: { type: Boolean, default: false },
    fullscreenMobile: { type: Boolean, default: false },
    zIndex: { type: Number },
  },
  computed: {
    styles () {
      return {
        zIndex: this.zIndex,
      };
    },
    shouldShowOverlay () {
      return this.isVisible && this.fullscreenMobile;
    },
  },
  watch: {
    shouldShowOverlay: {
      async handler (shouldShow) {
        if (!shouldShow) return;
        await this.$nextTick();
        this.initDetach(); // from @/mixins/detachable
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/abstracts/_index.scss';

  .datepicker-overlay {
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
