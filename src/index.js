import VueDatePicker from '@/components/datepicker/DatePicker.vue';

const components = [
  VueDatePicker,
];

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

// Plugin
const plugin = {
  // eslint-disable-next-line no-undef
  version: VERSION,
  install,
  VueDatePicker,
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
