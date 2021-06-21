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
      <CopyBtn :target="target" />
    </div>
  </div>
</template>

<script>
// Components
import CopyBtn from '~vuepress/components/code/CopyBtn';
import PrismComponent from '~vuepress/components/code/PrismComponent';

export default {
  name: 'Markup',
  components: { CopyBtn, PrismComponent },
  props: {
    type: { type: String, default: String },
    source: { type: String },
  },
  data: () => ({
    rendered: false,
  }),
  mounted () {
    setTimeout(() => (this.rendered = true), 100);
  },
  methods: {
    target () {
      return this.$el.querySelector('pre');
    },
  },
};
</script>

<style lang="scss" scoped>
  .code-wrapper {
    position: relative;

    pre {
      border-radius: 0;
    }

    &__copy {
      position: absolute;
      top: 12px;
      right: 12px;
      cursor: pointer;
      width: 32px;
      height: 32px;
      z-index: 1;

      .v-btn {
        color: inherit;
        position: absolute;
        right: 0;
        transition: opacity .2s ease-in;
        opacity: 1;
        top: 0;
        z-index: 4;
        color: white;
      }
    }
  }
</style>
