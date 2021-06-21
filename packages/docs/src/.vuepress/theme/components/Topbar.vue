<template>
  <v-toolbar class="topbar" flat>
    <v-container class="d-flex flex-row align-center" fluid>
      <MenuButton v-if="!isHomeActive && isMobile" />

      <v-responsive class="mx-md-auto flex-shrink-1" :max-width="!isMobile ? '500' : '100%'">
        <AlgoliaSearchBox
          v-if="isAlgoliaSearch"
          :options="algolia"
        />
      </v-responsive>

      <div class="d-flex align-center justify-end ml-3">
        <p class="ma-0 mr-2 hidden-xs-only">v{{ version }}</p>
        <v-btn :href="links.github" target="_blank" rel="noopener" icon class="mr-2 hidden-xs-only">
          <v-icon>fab fa-github</v-icon>
        </v-btn>
        <v-btn @click="updateActiveTheme" icon>
          <v-icon>{{ isDark ? 'fal fa-sun' : 'fal fa-moon' }}</v-icon>
        </v-btn>
      </div>
    </v-container>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import AlgoliaSearchBox from '@theme/components/AlgoliaSearchBox.vue';
import MenuButton from '@theme/components/MenuButton.vue';

export default {
  name: 'Topbar',
  components: {
    AlgoliaSearchBox,
    MenuButton,
  },
  data: () => ({
    links: {
      github: 'https://github.com/mathieustan/vue-datepicker',
    },
  }),
  computed: {
    ...mapGetters({
      isMobile: 'isMobile',
      version: 'app/version',
      isDark: 'theme/isDark',
    }),
    isHomeActive () {
      return this.$page.frontmatter.home;
    },
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {};
    },
    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    },
  },
  methods: {
    ...mapMutations({
      toggleSidebar: 'toggleSidebar',
      toggleTheme: 'theme/toggleTheme',
    }),
    updateActiveTheme () {
      this.toggleTheme();
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style lang="scss" scoped>
  .topbar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
</style>

