import VueDatePicker from './components/datepicker/DatePicker.vue';

export { VueDatePicker };

const install = (Vue) => {
  Vue.component('VueDatePicker', VueDatePicker);
  Vue.component('vue-datepicker', VueDatePicker);
};

// Plugin
const plugin = {
  // eslint-disable-next-line no-undef
  version: VERSION,
  install,
};

export default plugin;

// Auto-install
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
