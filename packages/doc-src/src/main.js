import Vue from 'vue';
import App from './App.vue';

import VueDatePicker from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

Vue.use(VueDatePicker);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
