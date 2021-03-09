import { terser } from 'rollup-plugin-terser';

import babel from '@rollup/plugin-babel';
import buble from '@rollup/plugin-buble';
import builtins from 'rollup-plugin-node-builtins';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

import vue from 'rollup-plugin-vue';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-preset-env';
import cssnano from 'cssnano';

// Constants
import { GLOBALS, BANNER, RESOLVE_FIELDS } from './constants';

const { dependencies, peerDependencies, version } = require(path.resolve(process.cwd(), 'package.json'));
const allDependencies = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];
const external = makeExternalPredicate(allDependencies);

function makeExternalPredicate (externalArr) {
  if (externalArr.length === 0) return () => false;
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
};

export default {
  input: 'src/index.js',
  output: {
    name: 'VueDatepicker',
    exports: 'named',
    globals: GLOBALS,
    banner: BANNER,
  },
  external,
  plugins: [// -- Lint files
    eslint({ exclude: ['**/*.scss'] }),
    // -- Allow node builtins
    builtins(),
    // -- Used with resolve which allow to bundle your CommonJS dependencies in node_modules.
    commonjs({
      include: /node_modules/,
      namedExports: { vue: ['extend', 'prototype', 'use', 'directive', 'component'] },
    }),
    babel({
      exclude: /node_modules/,
      babelHelpers: 'runtime',
    }),
    // -- Locate modules for using third party modules in
    resolve({ mainFields: RESOLVE_FIELDS }),
    // -- Generate css file from sass entries
    postcss({
      use: ['sass'],
      plugins: [
        simplevars(),
        nested(),
        cssnext(),
        cssnano(),
      ],
      extract: 'georges-ui-kit.min.css',
      minimize: true,
    }),
    // -- Handle vue templates
    vue({ css: false, template: { isProduction: true } }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __VERSION__: JSON.stringify(version),
      preventAssignment: true,
    }),
    cleanup(),
    buble(),
    terser(),
  ],
  watch: {
    include: ['src/**'],
  },
};

