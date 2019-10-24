import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    ...base.output,
    compact: true,
    file: 'dist/vue-datepicker.min.js',
    format: 'iife',
  },
});

export default config;
