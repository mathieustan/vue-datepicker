import Vue from 'vue';

import { parseComponent } from './helpers/files';
import descriptions from './descriptions';

// Kit
import VueDatePicker from '../../../';
Vue.use(VueDatePicker);

function generateApi () {

  const components = {};
  /* eslint-disable no-underscore-dangle */
  const installedComponents = Vue.options._base.options.components;

  const componentNameRegex = /^(?:Vue[A-Z])/;
  for (const name in installedComponents) {
    if (!componentNameRegex.test(name)) continue;

    let component = installedComponents[name];

    if (component.options.$_wrapperFor) {
      component = component.options.$_wrapperFor;
    }

    let options = parseComponent(component);

    components[name] = options;
  }

  return { ...components };
}

export { descriptions };
export default generateApi();
