import babel from '@rollup/plugin-babel';
import nodePolyfills from 'rollup-plugin-polyfill-node';
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
import { RESOLVE_FIELDS } from './constants';

const { dependencies, peerDependencies, version } = require(path.resolve(process.cwd(), 'package.json'));
const allDependencies = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];
const external = makeExternalPredicate(allDependencies);

function makeExternalPredicate (externalArr) {
  if (externalArr.length === 0) return () => false;
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
};

const isProd = process.env.NODE_ENV === 'production';

export default {
  ...(isProd && { external }),
  plugins: [
    // -- Lint files
    eslint({ exclude: ['**/*.scss'] }),
    // -- Locate modules for using third party modules in
    resolve(isProd ? {
      mainFields: RESOLVE_FIELDS,
      browser: true,
      preferBuiltins: false,
    } : { browser: true }),
    // -- Handle vue templates
    vue({ css: false, template: { isProduction: isProd } }),
    // -- Used with resolve which allow to bundle your CommonJS dependencies in node_modules.
    commonjs({
      include: /node_modules/,
    }),
    // -- Babel
    babel({
      exclude: /node_modules/,
      babelHelpers: 'runtime',
    }),
    // -- Generate css file from sass entries
    postcss({
      use: ['sass'],
      ...(isProd && {
        plugins: [
          simplevars(),
          nested(),
          cssnext(),
          cssnano(),
        ],
        extract: 'vue-datepicker.min.css',
        minimize: true,
      }),
    }),
    // -- Polyfills node methods
    nodePolyfills(),
    // -- Replace string dependings on environment
    replace({
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      ...(isProd && { __VERSION__: JSON.stringify(version) }),
      preventAssignment: true,
    }),
    cleanup(),
  ],
};

