import { terser } from 'rollup-plugin-terser';

import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-datepicker.min.js',
    name: 'VueDatePicker',
    format: 'iife',
  },
  name: 'VueDatePicker',
});

config.plugins.push(terser());

export default config;
