<template>
  <v-sheet
    v-click-outside="{
      closeConditional,
      handler: () => setSidebarOpened(false),
    }"
    :class="classes"
    class="navigation d-flex flex-column"
  >
    <div class="navigation__logo d-flex align-center justify-center pa-6">
      <router-link v-if="!isMobile" to="/" class="text-h5 font-weight-bold">
        VueDatePicker
      </router-link>
      <div class="bg-blue-400 bg-opacity-10 rounded p-2 ml-2"> Doc </div>
    </div>

    <div class="navigation__content d-flex flex-column flex-fill px-4">
      <div class="my-4 space-y-2">
        <v-btn
          v-for="[key, link] in Object.entries(headerLinks)"
          :key="key"
          :to="link.href"
          plain
          block
          class="pa-0 align-center justify-start"
        >
          <v-sheet
            width="24"
            height="24"
            :color="link.color"
            class="d-flex align-center justify-center mr-2 rounded"
          >
            <v-icon size="16">{{ link.icon }}</v-icon>
          </v-sheet>
          <span
            :class="{
              'text-medium': !isLinkActive(link.section),
              'font-weight-bold': isLinkActive(link.section),
            }"
            class="text-capitalize"
          >
            {{ link.text }}
          </span>
        </v-btn>
      </div>

      <NavLinks />
      <slot name="top" />
      <SidebarLinks
        :depth="0"
        :items="items"
      />
      <slot name="bottom" />
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

// Components
import SidebarLinks from '@theme/components/SidebarLinks.vue';
import NavLinks from '@parent-theme/components/NavLinks.vue';

export default {
  name: 'Sidebar',
  components: { SidebarLinks, NavLinks },
  props: {
    items: { type: Array, default: () => [] },
  },
  data: () => ({
    headerLinks: {
      framework: {
        text: 'Docs',
        icon: 'fal fa-book-spells',
        color: 'primary lighten-5 primary--text',
        section: '/pages/docs',
        href: '/pages/docs/getting-started',
      },
      contribute: {
        text: 'Contribute',
        icon: 'fal fa-code',
        color: 'success lighten-5 success--text',
        section: '/pages/contribute/',
        href: '/pages/contribute/setting-up',
      },
    },
  }),
  computed: {
    ...mapGetters({
      isSidebarOpened: 'isSidebarOpened',
      isMobile: 'isMobile',
    }),
    classes () {
      return {
        'navigation': true,
        'navigation--opened': this.isSidebarOpened,
      };
    },
  },
  methods: {
    ...mapMutations({
      setSidebarOpened: 'setSidebarOpened',
    }),
    isLinkActive (section) {
      return this.$route.path.includes(section);
    },
    closeConditional (event) {
      const target = event.target;

      return (
        this.isMobile &&
        this.isSidebarOpened &&
        !this.$el.contains(target)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  height: 100%;
  overflow: hidden;
  background-color: rgba(244,245,255,1);
  z-index: 200;
  transform: translate3d(-240px, 0, 0);
  transition: transform .2s cubic-bezier(.4,0,.2,1),
    background-color .2s cubic-bezier(.4,0,.2,1);

  .theme--dark & {
    background-color: rgba(18,18,18,1);
  }

  @media only screen and (min-width: 992px) {
    width: 300px;
    transform: translate3d(-300px, 0, 0);
  }

  &--opened {
    transform: translate3d(0, 0, 0);
  }

  &__content {
    overflow-x: hidden;
    overflow-y: scroll; /* has to be scroll, not auto */
    -webkit-overflow-scrolling: touch;
  }

  &__logo,
  &__footer {
    position: sticky;
  }

  &__logo {
    top: 0;
    left: 0;
    height: 84px;
    width: 100%;
  }

  .theme--light.v-btn.v-btn--has-bg {
    background-color: transparent;
  }

}
</style>
