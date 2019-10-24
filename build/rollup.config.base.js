import path from 'path';
import buble from 'rollup-plugin-buble';
import sizes from 'rollup-plugin-sizes';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import eslint from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';

const RESOLVE_FIELDS = ['main', 'browser', 'jsnext'];

const {
  dependencies,
  peerDependencies,
  version,
} = require(path.resolve(process.cwd(), 'package.json'));

const plugins = [
  builtins(),
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
  eslint(),
  vue({ template: { isProduction: true } }),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    VERSION: JSON.stringify(version),
  }),
  buble(),
  sizes(),
  terser(),
];

export default {
  input: 'src/index.js',
  output: {
    name: 'VueDatepicker',
    exports: 'named',
    globals: {
      'body-scroll-lock': 'BodyScrollLock',
      'dayjs': 'Dayjs',
      'vue': 'Vue',
    },
  },
  plugins,
  watch: { include: 'src/**' },
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
};
