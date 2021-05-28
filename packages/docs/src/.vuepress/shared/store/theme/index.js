const stateData = {
  theme: 'light',
  themes: ['light', 'dark'],
};

const mutations = {
  toggleTheme: (state) => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
  },
};

const getters = {
  activeTheme: ({ theme }) => theme,
  isDark: ({ theme }) => theme === 'dark',
};

export default {
  namespaced: true,
  state: { ...stateData },
  mutations,
  getters,
};
