<template>
  <v-app v-resize="onResize">
    <Sidebar
      v-if="!isHomeActive"
      :items="sidebarItems"
    />
    <main :class="classes" class="main-content" >
      <Topbar />
      <Home v-if="isHomeActive" />
      <Page
        v-else
        :sidebar-items="sidebarItems"
      >
        <template #top>
          <slot name="page-top" />
        </template>
        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>
    </main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

// Components
import Home from '@theme/components/Home.vue';
import Page from '@theme/components/Page.vue';
import Sidebar from '@theme/components/Sidebar.vue';
import Topbar from '@theme/components/Topbar.vue';

// Helpers
import { resolveSidebarItems } from '@parent-theme/util';

export default {
  components: {
    Home,
    Page,
    Sidebar,
    Topbar,
  },
  computed: {
    ...mapGetters({
      isSidebarOpened: 'isSidebarOpened',
      isMobile: 'isMobile',
    }),
    isHomeActive () {
      return this.$page.frontmatter.home;
    },
    classes () {
      return {
        'main-content--sidebar': this.shouldShowSidebar,
      };
    },
    shouldShowSidebar () {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && Boolean(this.sidebarItems.length)
      );
    },
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath,
      );
    },
    layout () {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          // You can also check whether layout exists first as the default global layout does.
          return this.$frontmatter.layout;
        }
        return 'Layout';
      }
      return 'NotFound';
    },
  },
  methods: {
    ...mapMutations({
      setSidebarOpened: 'setSidebarOpened',
      updateIsMobile: 'updateIsMobile',
    }),
    onResize () {
      if (typeof window === 'undefined') return;
      this.updateIsMobile(window.innerWidth);
      this.setSidebarOpened(!this.isMobile);
    },
  },
};
</script>

<style lang="scss" scoped>
  .v-application {
    &.theme--light {
      background-color: rgba(244,245,255, 1);
    }
  }

  .main-content {
    position: relative;
    flex: 1 1 auto;
    max-width: 100%;

    &--sidebar {
      min-height: 100vh;

      @media only screen and (min-width: 768px) {
        margin: 0 0 0 240px;
      }

      @media only screen and (min-width: 992px) {
        margin: 0 0 0 300px;
      }
    }
  }
</style>
