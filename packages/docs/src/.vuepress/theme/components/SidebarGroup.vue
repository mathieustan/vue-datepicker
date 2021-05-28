<template>
  <section
    class="sidebar-group"
    :class="[
      { collapsable, 'is-sub-group': depth !== 0 },
      `depth-${depth}`,
      `m-l-${depth * 4}`,
    ]"
  >
    <v-btn
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        'active': isActive($route, item.path),
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <span
        v-if="collapsable"
        class="arrow"
        :class="open ? 'down' : 'right'"
      />
    </v-btn>

    <div v-else class="d-flex align-center justify-space-between" @click="$emit('toggle')">
      <h5
        :class="{
          'mb-0 clickable': depth === 1,
          'mb-2': depth === 0,
        }"
        class="sidebar-heading px-0 ma-0"
      >
        <v-icon v-if="depth !== 0">fal fa-layer-group</v-icon>
        {{ item.title }}
      </h5>

      <v-icon v-if="collapsable">{{ open ? 'fa fa-caret-down' : 'fa fa-caret-right' }}</v-icon>
    </div>

    <v-expand-transition>
      <SidebarLinks
        v-if="open || !collapsable"
        class="sidebar-group-items"
        :items="item.children"
        :sidebar-depth="item.sidebarDepth"
        :initial-open-group-index="item.initialOpenGroupIndex"
        :depth="depth + 1"
      />
    </v-expand-transition>
  </section>
</template>

<script>
import { isActive } from '@parent-theme/util';

export default {
  name: 'SidebarGroup',
  props: [
    'item',
    'open',
    'collapsable',
    'depth',
  ],

  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate () {
    this.$options.components.SidebarLinks = require('@theme/components/SidebarLinks.vue').default;
  },

  methods: { isActive },
};
</script>

<style lang="scss" scoped>
// Default style from vuepress
.sidebar-group {

  .sidebar-group {
    padding-left: 0.5em;
  }

  &:not(.collapsable) {
    .sidebar-heading:not(.clickable) {
      cursor: auto;
      color: inherit;
    }
  }

  // refine styles of nested sidebar groups
  &.is-sub-group {
    padding-left: 0;

    & .sidebar-heading {
      font-size: 0.95em;
      padding-left: 2rem;

      &:not(.clickable) {
        opacity: 0.5;
      }
    }

    & > .sidebar-group-items {

      & > li > .sidebar-link {
        font-size: 0.95em;
        border-left: none;
      }
    }
  }

  &.depth-2 {
    & > .sidebar-heading {
      border-left: none;
    }
  }
}

.sidebar-heading {
  color: rgba(var(--g-theme-on-surface), 0.87);
  transition: color .15s ease;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  // text-transform uppercase
  padding: 0.35rem 1.5rem 0.35rem 1.25rem;
  width: 100%;
  box-sizing: border-box;
  margin: 0;

  &.open,
  &:hover {
    color: inherit;
  }

  .arrow {
    position: relative;
    top: -0.12em;
    left: 0.5em;
  }

  &.clickable {
    &.active {
      font-weight: 600;
      color: rgba(var(--g-theme-on-surface), 1);
      border-left-color: rgba(var(--g-theme-on-surface), 1);
    }

    &:hover {
      color: rgba(var(--g-theme-on-surface), 1);
    }
  }
}

.sidebar-group-items {
  transition: height .1s ease-out;
  font-size: 0.95em;
  overflow: hidden;
}
</style>
