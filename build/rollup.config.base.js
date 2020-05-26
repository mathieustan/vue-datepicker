import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import buble from '@rollup/plugin-buble';
import builtins from 'rollup-plugin-node-builtins';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';

const RESOLVE_FIELDS = ['main', 'browser', 'jsnext'];

const {
  dependencies,
  peerDependencies,
  version,
} = require(path.resolve(process.cwd(), 'package.json'));

const banner =
  '/*!\n' +
  ` * Vue-datepicker v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} Mathieu Stanowski\n` +
  ' */';

const plugins = [
  // -------------------------------------------
  // Lint files
  // -------------------------------------------
  eslint({ exclude: ['**/*.(scss|css)'] }),
  // -------------------------------------------
  // Allow node builtins
  // -------------------------------------------
  builtins(),
  // -------------------------------------------
  // 1. babel
  // 2. resolve => Locate modules for using third party modules in
  // 3. commonjs => used with resolve whioch allow to bundle your CommonJS dependencies in node_modules.
  // -------------------------------------------
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'runtime',
  }),
  resolve({ mainFields: RESOLVE_FIELDS }),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      vue: [
        'extend',
        'prototype',
        'use',
        'directive',
        'component',
      ],
    },
  }),
  // -------------------------------------------
  // 1. postcss => Extract scss from imported scss files in js
  // 2. vue => Like vue-loader for webpack
  // 3. replace => Allows to set package.json version in bundle
  // -------------------------------------------
  postcss({
    use: ['sass'],
    extract: 'vue-datepicker.min.css',
    minimize: true,
  }),
  vue({ css: false, template: { isProduction: true } }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    VERSION: JSON.stringify(version),
  }),
  // -------------------------------------------
  // Clean & Minify
  // -------------------------------------------
  cleanup(),
  sizeSnapshot(),
  buble(), // convert ES2015+
  terser(), // minifiy
];

export default {
  input: 'src/index.js',
  output: {
    name: 'VueDatepicker',
    exports: 'named',
    globals: {
      'body-scroll-lock': 'BodyScrollLock',
      'dayjs': 'Dayjs',
      'get-size': 'getSize',
      'vue': 'Vue',
    },
    banner,
  },
  plugins,
  watch: { include: 'src/**' },
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
};
