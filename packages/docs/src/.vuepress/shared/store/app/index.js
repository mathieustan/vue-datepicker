const stateData = {
  version: undefined,
};

const mutations = {
  setAppVersion: (state, version) => {
    state.version = version;
  },
};

const getters = {
  version: ({ version }) => version,
};

export default {
  namespaced: true,
  state: { ...stateData },
  mutations,
  getters,
};
