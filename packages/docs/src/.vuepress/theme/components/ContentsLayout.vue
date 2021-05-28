<template>
  <v-sheet
    v-if="hasHeaders"
    class="contents-layout flex-none d-none d-lg-block pl-8 mr-8"
    min-width="16rem"
    width="16rem"
    color="transparent"
  >
    <div class="contents-layout__wrapper d-flex flex-column justify-between overflow-y-auto p-sticky p-t-40 p-b-24">
      <h5 class="text-uppercase font-weight-bold mb-3 text-body-1 text-lg-body-2">
        On this page
      </h5>
      <ul class="pa-0 overflow-x-hidden">
        <li
          v-for="header in headers"
          :key="header.slug"
          :class="{
            'text-disabled': !isActiveLink(header),
            'primary--text': isActiveLink(header),
            'pl-3': header.level !== 3,
            'pl-5': header.level === 3,
          }"
          class="py-1 text-body-2 border-l-2"
        >
          <router-link
            :to="getLink(header)"
            class="contents-layout__link d-block transition-swing text-decoration-none"
          >
            {{ header.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </v-sheet>
</template>

<script>
import throttle from 'lodash/throttle';

export default {
  name: 'ContentsLayout',
  props: ['sidebarItems'],
  data: () => ({
    activeLink: undefined,
  }),
  mounted () {
    if (typeof window === 'undefined') return;

    this.$nextTick(() => this.setActiveHash());
    window.addEventListener('scroll', this.onScroll);

    this.$on('hook:destroyed', () => {
      window.removeEventListener('scroll', this.onScroll);
    });
  },
  computed: {
    headers () {
      return this.$page.headers || [];
    },
    hasHeaders () {
      return this.headers.length > 0;
    },
  },
  methods: {
    getLink (header) {
      return this.$page.path + '#' + header.slug;
    },
    isActiveLink (header) {
      return `#${header.slug}` === this.activeLink;
    },
    onScroll: throttle(function () {
      this.setActiveHash();
    }, 300),
    setActiveHash () {
      const sidebarLinks = [].slice.call(document.querySelectorAll('.contents-layout__link'));
      const anchors = [].slice
        .call(document.querySelectorAll('.header-anchor'))
        .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash));

      const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];
        const nextAnchor = anchors[i + 1];

        const isDefaultActive = i === 0 && scrollTop === 0;
        const isBelowAnchor = scrollTop + 100 >= anchor.parentElement.offsetTop + 49;
        const isAboveAnchor = (!nextAnchor || scrollTop + 100 < nextAnchor.parentElement.offsetTop - 49);
        const isActive = isDefaultActive || (isBelowAnchor && isAboveAnchor);

        if (isActive) {
          this.activeLink = anchor.hash;
          return;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.contents-layout {
  &__wrapper {
    position: sticky;
    top: 4.5rem;
  }

  li {
    list-style: none;
    border: 0px solid rgba(0,29,108,0.12);
    border-left-width: 2px;

    &.primary--text {
      border-left-color: currentColor
    }

    a {
      color: inherit;
    }
  }
}
</style>
