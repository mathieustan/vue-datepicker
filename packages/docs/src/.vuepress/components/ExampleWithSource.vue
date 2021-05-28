<template>
  <v-sheet outlined class="rounded-lg overflow-hidden my-4">
    <VueSourceFile
      :page="page"
      :filename="filename"
      @loaded="setComponentParsed"
    />

    <v-divider />

    <!-- Code Block -->
    <v-sheet tile>
      <VueFile
        :page="page"
        :filename="filename"
        @loaded="setComponentLoaded"
      />
    </v-sheet>
  </v-sheet>
</template>

<script>
import VueSourceFile from '~vuepress/components/examples/VueSourceFile.vue';
import VueFile from '~vuepress/components/examples/VueFile.vue';

export default {
  name: 'ExampleWithSource',
  components: { VueSourceFile, VueFile },
  props: {
    filename: { type: [Object, String], default: undefined },
    page: { type: String, default: undefined },
  },
  data: () => ({
    parsed: undefined,
    component: undefined,
  }),
  methods: {
    setComponentLoaded (component) {
      this.component = component;
    },
    setComponentParsed (parsed) {
      this.parsed = parsed;
    },
  },
};
</script>
