<template>
  <!-- eslint-disable max-len -->
  <!-- eslint-disable vue/valid-v-for -->
  <div id="app">
    <Header />

    <div class="content">
      <div class="content-inner">
        <div class="title">
          <h2> About </h2>
        </div>
        <p>
          A responsive date picker for Vue.js, made with love,
          with nice transition and clean design.
        </p>

        <div class="title">
          <h2> Install </h2>
        </div>
        <p> 1. Install component with npm </p>
        <CodeWrapper type="bash" :source="installSources.install" />

        <p> 2. Load component in your project </p>
        <CodeWrapper type="javascript" :source="installSources.use" />

        Or
        <CodeWrapper type="javascript" :source="installSources.import" />

        <p> 3. Use the component </p>
        <CodeWrapper type="HTML" :source="installSources.template" />

        <!---------------------------------------------------------->
        <!-- EXAMPLES -->
        <!---------------------------------------------------------->
        <Examples />
      </div>
    </div>
  </div>
</template>

<script>
// components
import CodeWrapper from '@/components/CodeWrapper.vue';
import Examples from '@/components/Examples.vue';
import Header from '@/components/Header.vue';

import './styles/main.scss';

export default {
  name: 'App',
  components: {
    CodeWrapper,
    Examples,
    Header,
  },
  data: () => ({
    installSources: {
      install: 'npm install @mathieustan/vue-datepicker --save',
      use:
`import VueDatePicker from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

Vue.use(VueDatePicker);

// Options: You can set lang by default
Vue.use(VueDatePicker, {
  lang: 'fr'
});`,
      import:
`import { VueDatePicker } from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

export default  {
  components : {
    VueDatePicker,
  },
};
`,
      template:
`<template>
  ...
  <VueDatePicker v-model="date" />
  ...
</template>
`,
    },
  }),
};
</script>

<style lang="scss" scoped>
  @import './styles/abstracts/_index.scss';

  .content {
    max-width: 1000px;
    margin: 0 auto;
    font-size: 1em;
    line-height: 1.62;
    color: #3b454e;

    @include mq('md') {
      font-size: 1.125em;
    }

    &-inner {
      text-align: left;
      padding: ($gutter*2);

      @include mq('md') {
        padding: $gutter*4;
      }
    }
  }
</style>
