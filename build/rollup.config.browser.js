// Default
import base from './rollup.config.base';

// Plugins
import generatePlugins from './rollup.plugins';

const config = Object.assign({}, base, {
  output: {
    ...base.output,
    compact: true,
    file: 'dist/vue-datepicker.min.js',
    format: 'iife',
  },
});

export default (commandLineArgs) => {
  return { ...config, plugins: generatePlugins(commandLineArgs) };
};
