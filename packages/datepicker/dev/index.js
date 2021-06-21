import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './vue-datepicker';

Vue.config.performance = true;

const vm = new Vue({
  data: () => ({ isLoaded: document.readyState === 'complete' }),
  router,
  render (h) {
    return this.isLoaded ? h(App) : undefined;
  },
}).$mount('#app');

// Prevent layout jump while waiting for styles
vm.isLoaded || window.addEventListener('load', () => {
  vm.isLoaded = true;
});
