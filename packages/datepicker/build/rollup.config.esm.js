import { terser } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer';
import buble from '@rollup/plugin-buble';
import visualizer from 'rollup-plugin-visualizer';

import configBase from './rollup.config.base';

// Constants
import { GLOBALS, BANNER } from './constants';

export default (commandLineArgs) => {
  return Object.assign({}, configBase, {
    input: 'src/index.js',
    output: {
      name: 'VueDatePicker',
      file: 'dist/vue-datepicker.esm.js',
      exports: 'named',
      format: 'esm',
      intro: 'var global = typeof self !== undefined ? self : this;',
      globals: GLOBALS,
      banner: BANNER,
    },
    plugins: [
      ...configBase.plugins,
      buble(),
      terser(), // minifiy
      ...(commandLineArgs.analyze ? [analyze({ summaryOnly: true })] : []),
      ...(commandLineArgs.visualizer ? [visualizer()] : []),
    ],
  });
};

