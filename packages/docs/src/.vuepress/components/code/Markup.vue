<template>
  <div
    v-if="$slots.default || source"
    v-bind="$attrs"
    class="code-wrapper"
  >
    <PrismComponent
      v-if="rendered"
      :language="type"
      :code="source"
      class="ma-0"
    >
      <slot />
    </PrismComponent>

    <div class="code-wrapper__copy">
      <button
        v-if="!updateCodeToCopy"
        title="Copy code"
        aria-label="Copy code"
      >
        <i :class="copied ? 'fal fa-check' : 'fal fa-copy'" />
      </button>
    </div>
  </div>
</template>

<script>
import PrismComponent from '~vuepress/components/code/PrismComponent';

export default {
  name: 'Markup',
  components: { PrismComponent },
  props: {
    type: { type: String, default: String },
    source: { type: String },
  },
  data: () => ({
    rendered: false,
    copied: false,
    updateCodeToCopy: false,
    copyTimeout: undefined,
    codeToCopy: undefined,
  }),
  mounted () {
    setTimeout(() => (this.rendered = true), 100);
  },
  watch: {
    source: {
      handler (newSource) {
        this.updateCodeToCopy = true;
        this.codeToCopy = newSource;
        setTimeout(() => (this.updateCodeToCopy = false), 100);
      },
      immediate: true,
    },
  },
  methods: {
    onCopy () {
      this.copied = true;
      clearTimeout(this.copyTimeout);
      this.copyTimeout = setTimeout(() => { this.copied = false; }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
  .code-wrapper {
    position: relative;

    &__copy {
      position: absolute;
      top: 12px;
      right: 12px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      z-index: 1;

      .g-button {
        color: inherit;
        position: absolute;
        right: 0;
        transition: opacity .2s ease-in;
        opacity: 1;
        top: 0;
        z-index: 4;
      }
    }
  }
</style>
