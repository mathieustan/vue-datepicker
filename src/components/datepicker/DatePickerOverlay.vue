<template>
  <transition name="overlay" appear>
      <div class="datepicker-overlay" @click="$emit('close')" />
  </transition>
</template>

<script>
export default {
  name: 'DatePickerOverlay',
};
</script>

<style lang="scss" scoped>
  .datepicker-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparentize(black, .5);
    z-index: 1;

    @include mq(phone) {
      display: none;
    }

    &.overlay-enter-active,
    &.overlay-leave-active {
      opacity: 1;
      transition: opacity 300ms;
    }
    &.overlay-leave-to, &.overlay-enter{
      opacity: 0;
    }
  }
</style>
