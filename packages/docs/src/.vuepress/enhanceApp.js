import Vuex from 'vuex';

// Plugins
import InstantSearch from 'vue-instantsearch';
import VueDatePicker, { version } from '~vuepress/shared/plugins/vue-datepicker';
import vuetify from '~vuepress/shared/plugins/vuetify';

// Store
import store from '~vuepress/shared/store';

export default ({
  Vue,
}) => {
  // init Store
  Vue.use(Vuex);
  Vue.mixin({ store });
  Vue.mixin({ vuetify });
  store.commit('app/setAppVersion', version);

  // Init plugins
  Vue.use(InstantSearch);
  Vue.use(VueDatePicker);
};
