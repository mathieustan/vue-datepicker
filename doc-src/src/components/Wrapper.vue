<template>
  <section
    :id="id"
    :style="style"
    class="wrapper"
  >
    <div
      v-if="$slots.description"
      class="wrapper__block wrapper__description pa-16">
      <slot name="description" />
    </div>

    <div class="wrapper-example">
      <!-- Code Block -->
      <div class="wrapper-example__inner">
        <div
          v-if="computedCode"
          class="wrapper-example__code"
        >
          <div class="wrapper-example__code-toolbar">
            <button
              v-for="(section, index) in computedSections"
              :key="index"
              :class="{ 'button--active': shownSection === section }"
              class="button wrapper-example__code-button"
              @click="toggleSection(section)"
            >
              {{ section }}
            </button>
          </div>

          <div class="wrapper-example__code-block">
            <div
              v-if="shownSection"
              class="wrapper-example__code">

              <slot v-if="$slots.code" name="code" />
              <CodeWrapper v-if="parsed" type='HTML' :source='parsed[shownSection]'></CodeWrapper>
            </div>
          </div>
        </div>

        <!-- Live Example Block -->
        <div
          v-if="computedExample"
          class="wrapper-example__example pa-16">
          <div class="wrapper-example__item">
            <slot v-if="$slots.example" name="example" />
            <div v-else>
              <component :is="component" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <slot />
  </section>
</template>

<script>
import CodeWrapper from './CodeWrapper.vue';

export default {
  name: 'Wrapper',
  components: { CodeWrapper },
  props: {
    id: { type: String },
    filename: { type: [Object, String], default: undefined },
  },
  data: () => ({
    parsed: undefined,
    component: undefined,
    observer: undefined,
    activeSection: 'template',
  }),
  mounted () {
    if (!this.filename) return;
    this.importComponent();
    this.importTemplate();
  },
  computed: {
    style () {
      return {
        backgroundColor: this.backgroundColor,
        maxWidth: this.maxWidth,
      };
    },
    computedCode () {
      return this.$slots.code || (this.parsed && this.parsed.template);
    },
    computedExample () {
      return this.$slots.example || this.component;
    },
    computedSections () {
      if (!this.parsed) return ['template'];
      return ['template', 'style', 'script'].filter(section => this.parsed[section]);
    },
    shownSection () {
      return (this.computedSections || []).find(section => section === this.activeSection);
    },
  },
  methods: {
    boot (res) {
      const template = this.parseTemplate('template', res);
      const style = this.parseTemplate('style', res);
      const script = this.parseTemplate('script', res);

      this.parsed = {
        template,
        style,
        script,
      };
    },
    importComponent () {
      return import(
        /* webpackChunkName: "examples" */
        /* webpackMode: "lazy-once" */
        `../examples/${this.filename}.vue`
      )
        .then(comp => (this.component = comp.default));
    },
    importTemplate () {
      return import(
        /* webpackChunkName: "examples-source" */
        /* webpackMode: "lazy-once" */
        `!raw-loader!../examples/${this.filename}.vue`
      )
        .then(comp => this.boot(comp.default))
        .then(this.unobserve);
    },
    parseTemplate (target, template) {
      const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`;
      const regex = new RegExp(string, 'g');
      const parsed = regex.exec(template) || [];
      return parsed[1] || '';
    },
    toggleSection (section) {
      this.activeSection = section;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/abstracts/_index.scss';

  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid color(other, light-gray);
    border-radius: get-border-radius(4);
    width: 100%;
    overflow: hidden;

    &--is-title {
      border: none;
    }

    & + & {
      margin-top: $gutter*3;
    }

    h3 {
      margin: 0;
    }
    pre {
      border-radius: 0;
    }

    &__block {
      width: 100%;
      background-color: white;
    }

    &__description {

      >>> code {
        color: color(other, pink);
        background-color: transparentize(color(other, pink), .9);
        border-radius: get-border-radius(1);

        &:before,
        &:after {
          content: "\00a0";
          letter-spacing: -1px;
        }
      }
    }

    &-example {
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: stretch;
      width: 100%;

      &__example {
        background-color: white;
      }

      &__item {
        width: 100%;
      }

      &__code {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: stretch;
        justify-content: stretch;

        &-toolbar {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          min-height: 48px;
          padding: 0 $gutter*2;
          background: lighten(color(other, dark-purple), 4%);
          border-bottom: 1px solid lighten(color(other, dark-purple), 4%);

          .button {
            position: relative;
            display: inline-flex;
            flex: 0 0 auto;
            justify-content: center;
            align-items: center;
            transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),color 1ms;
            margin-right: $gutter;

            &--active {
              background-color: lighten(color(other, dark-purple), 10%);
            }
          }
        }
      }
    }

    p {
      margin: 0;
    }
  }
</style>
