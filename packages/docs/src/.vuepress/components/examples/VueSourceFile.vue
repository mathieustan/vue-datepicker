<template>
  <div class="source-file">
    <div class="source-file__toolbar px-4">
      <v-btn
        aria-label="View source"
        :href="codepenUrl"
        target="_blank"
        rel="noopener"
        icon
        class="text-uppercase"
      >
        <v-icon size="16">fab fa-codepen</v-icon>
      </v-btn>

      <v-btn
        aria-label="View source"
        @click="expand = !expand"
        plain
        class="text-uppercase"
      >
        <p class="ma-0"> {{ expand ? 'Hide' : 'Show' }} source </p>
        <v-icon size="16" right>fal fa-code</v-icon>
      </v-btn>
    </div>

    <v-expand-transition>
      <div
        v-if="expand"
        class="source-file__code"
      >
        <div class="source-file__code-toolbar">
          <v-btn
            v-for="(section, index) in computedSections"
            :key="index"
            :class="{ 'v-btn--active': shownSection === section }"
            plain
            color="white"
            @click="toggleSection(section)"
          >
            {{ section }}
          </v-btn>
        </div>

        <div class="source-file__code-wrapper">
          <div
            v-if="shownSection"
            class="source-file__code-inner">

            <slot v-if="hasSlot" name="code" />
            <Markup
              v-if="parsed"
              :source='parsed[shownSection]'
              type='html'
              tile
            />
          </div>
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
import Markup from '~vuepress/components/code/Markup.vue';

export default {
  name: 'VueSourceFile',
  components: {
    Markup,
  },
  props: {
    filename: { type: String },
  },
  data: () => ({
    dark: false,
    parsed: undefined,
    expand: false,
    activeSection: 'template',
    codepenUrl: '',
  }),
  computed: {
    computedSections () {
      if (!this.parsed) return ['template'];
      return ['template', 'style', 'script'].filter(section => this.parsed[section]);
    },
    shownSection () {
      return (this.computedSections || []).find(section => section === this.activeSection);
    },
    hasSlot () {
      return Object.keys(this.$scopedSlots).length > 0;
    },
    computedPlaygroundUrl () {
      if (!this.parsed) return;

      const { template, script, style } = this.parsed;

      let vueString = `${template}`;
      if (script) vueString += `\n\n${script}`;
      if (style) vueString += `\n\n${style}`;

      const stringToEncode = JSON.stringify({
        vue: vueString,
      });
      const data = btoa(stringToEncode);
      return `${this.playgroundUrl}/?data=${data}`;
    },
  },
  mounted () {
    if (!this.filename) return;

    this.observer = new IntersectionObserver(async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) await this.importTemplate();
      }
    }, { threshold: 0 });

    this.observer.observe(this.$el);
  },
  methods: {
    async importTemplate () {
      try {
        const template = await import(
          /* webpackChunkName: "examples-source" */
          /* webpackMode: "lazy-once" */
          `!!raw-loader!~vuepress/examples//${this.filename}.vue`
        );

        this.boot(template.default);
      } catch (err) {
        this.$emit('error', err);
      }
    },
    boot (res) {
      const template = this.parseTemplate('template', res);
      const style = this.parseTemplate('style', res);
      const script = this.parseTemplate('script', res);

      this.parsed = {
        template,
        style,
        script,
      };

      this.$emit('loaded', this.parsed);
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

.source-file {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 48px;
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
      padding: 0 16px;
      background: #343263;
      border-bottom: 1px solid #343263;

      .v-btn {
        text-transform: uppercase;
        border-radius: get-border-radius(2);

        &--active {
          background-color: #3f3c77;
        }
      }

      .v-btn + .v-btn {
        margin-left: 8px;
      }
    }
  }
}
</style>
