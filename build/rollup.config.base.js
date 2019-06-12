import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import eslint from 'rollup-plugin-eslint';

const { dependencies, version } = require(path.resolve(process.cwd(), 'package.json'));

const plugins = [
  resolve({
    mainFields: ['main', 'browser', 'jsnext'],
  }),
  cjs(),
  eslint(),
  vue(),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'],
    presets: [[
      '@vue/babel-preset-app', { useBuiltIns: false },
    ]],
    plugins: [
      '@babel/transform-runtime',
      'dynamic-import-node-babel-7',
    ],
  }),
  replace({
    VERSION: JSON.stringify(version),
  }),
];

export default {
  input: 'src/index.js',
  plugins,
  watch: { include: 'src/**' },
  external: ['vue', ...Object.keys(dependencies)],
};
