import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import eslint from 'rollup-plugin-eslint';
import fs from 'fs';
import CleanCSS from 'clean-css';

const config = require('../package.json');

export default {
  input: 'src/index.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    cjs({
      namedExports: {
        'node_modules/v-click-outside/dist/v-click-outside.min.umd.js': ['directive'],
        'node_modules/body-scroll-lock/lib/bodyScrollLock.min.js':
          ['enableBodyScroll', 'clearAllBodyScrollLocks', 'disableBodyScroll'],
      },
    }),
    eslint(),
    vue({
      css (style) {
        fs.writeFileSync('dist/vue-datepicker.css', new CleanCSS().minify(style).styles);
      },
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      plugins: [
        ['@babel/transform-runtime'],
      ],
    }),
    replace({
      VERSION: JSON.stringify(config.version),
    }),
  ],
  watch: {
    include: 'src/**',
  },
  external: [
    'vue',
  ],
};
