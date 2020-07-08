// Default
import base from './rollup.config.base';
// Plugins
import generatePlugins from './rollup.plugins';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-datepicker.esm.js',
    format: 'es',
    ...base.output,
  },
});

export default (commandLineArgs) => {
  return { ...config, plugins: generatePlugins({ ...commandLineArgs }) };
};
