<template>
  <div
    :class="isDark ? undefined : 'white'"
    class="min-w-0 w-full flex-fill overflow-lg-visible p-lg-static">
    <v-sheet class="w-full d-flex">
      <div class="min-w-0 flex-fill py-6 px-3 px-md-6 px-lg-8">
        <h1 v-html="$page.frontmatter.title " />
        <MarkdownIt> {{ $frontmatter.description }}</MarkdownIt>

        <slot name="top" />

        <Content />
        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />

        <slot name="bottom" />
      </div>
      <ContentsLayout v-bind="{ sidebarItems }" />
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

// Components
import ContentsLayout from '@theme/components/ContentsLayout.vue';
import MarkdownIt from '@theme/components/MarkdownIt.vue';
import PageEdit from '@parent-theme/components/PageEdit.vue';
import PageNav from '@theme/components/PageNav.vue';

export default {
  name: 'Page',
  components: {
    ContentsLayout,
    MarkdownIt,
    PageEdit,
    PageNav,
  },
  props: ['sidebarItems'],
  computed: {
    ...mapGetters({
      isDark: 'theme/isDark',
    }),
  },
  watch: {
    '$route': {
      handler (route) {
        if (!route.hash) return;

        setTimeout(() => {
          this.$vuetify.goTo(route.hash, {
            duration: 500,
            offset: 100,
          });
        }, 100);
      },
      immediate: true,
    },
  },
};
</script>

