import Vue from 'vue';
import App from './App.vue';

import VueDatePicker from '@mathieustan/vue-datepicker'; // Prod
// import VueDatePicker from '../../src'; // Local

import './styles/main.scss';

Vue.use(VueDatePicker);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
