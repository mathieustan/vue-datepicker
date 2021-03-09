import * as components from './components';
import VueDatePicker from './framework';

export * from './components';
export default VueDatePicker;

const install = VueDatePicker.install;
VueDatePicker.install = (Vue, options) => {
  install.call(VueDatePicker, Vue, {
    components,
    options,
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueDatePicker);
}
