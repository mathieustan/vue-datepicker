import Vue from 'vue';
import App from './App.vue';

import VueDatePicker from '../../dist/vue-datepicker.esm';
import '../../dist/vue-datepicker.min.css';

Vue.use(VueDatePicker);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
