<template>
  <button class="text-gray-500 w-10 h-10 relative focus:outline-none bg-white" @click="toggleSidebar">
    <span class="sr-only">Open main menu</span>
    <div class="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
      <span
        :class="{'rotate-45': isSidebarOpened,' -translate-y-1.5': !isSidebarOpened }"
        aria-hidden="true"
        class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
      />
      <span
        :class="{'opacity-0': isSidebarOpened }"
        aria-hidden="true"
        class="block absolute  h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
      />
      <span
        :class="{'-rotate-45': isSidebarOpened, ' translate-y-1.5': !isSidebarOpened}"
        aria-hidden="true"
        class="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out"
      />
    </div>
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'MenuButton',
  computed: {
    ...mapGetters({
      isSidebarOpened: 'isSidebarOpened',
    }),
  },
  methods: {
    ...mapMutations({
      toggleSidebar: 'toggleSidebar',
    }),
  },
};
</script>
