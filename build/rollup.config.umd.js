import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-datepicker.umd.js',
    format: 'umd',
    ...base.output,
  },
});

export default config;
