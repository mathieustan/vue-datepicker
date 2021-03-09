import OurVue from 'vue';

export function install (Vue, args = {}) {
  // Prevent from installing vuedatepicker multiple times
  if (install.installed) return;
  install.installed = true;

  if (OurVue !== Vue) {
    console.error(`Multiple instances of Vue detected.`);
  }

  const components = args.components || {};
  const options = args.options || {};

  Vue.prototype.$vuedatepicker = options;

  // /!\ Only for dev mode or linking because we have vue in nodes_module
  OurVue.prototype.$vuedatepicker = options;

  Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component);
  });
}
