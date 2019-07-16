import path from 'path';
import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import eslint from 'rollup-plugin-eslint';

const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'];
const RESOLVE_FIELDS = ['main', 'browser', 'jsnext'];

const { dependencies, version } = require(path.resolve(process.cwd(), 'package.json'));

const plugins = [
  resolve({ mainFields: RESOLVE_FIELDS }),
  commonjs(),
  eslint(),
  vue({ template: { isProduction: true } }),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
    extensions: EXTENSIONS,
    presets: [[
      '@vue/babel-preset-app', { useBuiltIns: false },
    ]],
    plugins: [
      '@babel/transform-runtime',
      'dynamic-import-node-babel-7',
    ],
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    VERSION: JSON.stringify(version),
  }),
  buble(),
];

export default {
  input: 'src/index.js',
  plugins,
  watch: { include: 'src/**' },
  external: [...Object.keys(dependencies)],
};
