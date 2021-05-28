import Vue from 'vue';
import Vuex, { Store } from 'vuex';

// Stores
import app from './app';
import theme from './theme';

Vue.use(Vuex);

const mobileBreakpoint = 768;

const store = {
  state: {
    isSidebarOpened: true,
    isMobile: false,
  },
  mutations: {
    setSidebarOpened: (state, open) => {
      state.isSidebarOpened = open;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpened = !state.isSidebarOpened;
    },
    updateIsMobile: (state, width) => {
      state.isMobile = width < parseInt(mobileBreakpoint, 10);
    },
  },
  getters: {
    isSidebarOpened: ({ isSidebarOpened }) => isSidebarOpened,
    isMobile: ({ isMobile }) => isMobile,
  },
  actions: {},
  modules: {
    app,
    theme,
  },
};

export default new Store(store);
