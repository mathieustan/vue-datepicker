import VueDatePicker from '@/components/DatePicker.vue';

export function install (Vue) {
  Vue.component('vue-datepicker', VueDatePicker);
  Vue.component('VueDatepicker', VueDatePicker);
};

export {
  VueDatePicker,
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
