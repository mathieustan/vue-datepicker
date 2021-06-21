import alias from '@rollup/plugin-alias';
import buble from '@rollup/plugin-buble';
import livereload from 'rollup-plugin-livereload';
import iife from 'rollup-plugin-iife';
import path from 'path';
import serve from 'rollup-plugin-serve';

// Helpers
import configBase from './rollup.config.base';

const resolve = file => path.resolve(__dirname, file);

export default () => {
  return Object.assign({}, configBase, {
    input: 'dev/index.js',
    output: {
      dir: 'dev/public',
      format: 'es',
      name: 'main',
      sourcemap: true,
      chunkFileNames: '[name].js',
    },
    plugins: [
      alias({
        entries: [
          { find: 'vue$', replacement: 'vue/dist/vue.esm.js' },
          { find: '@mathieustan/vue-datepicker', replacement: resolve('../src') },
          { find: 'body-scroll-lock', replacement: resolve('../../../node_modules/body-scroll-lock/lib/bodyScrollLock.es6.js') },
        ],
      }),
      // -- Lint files
      ...configBase.plugins,
      buble({ exclude: /node_modules/ }),
      iife(),
      livereload(),
      serve({
        open: false,
        contentBase: './dev',
        host: 'localhost',
        port: '8083',
      }),
    ],
    watch: {
      include: ['src/**', 'dev/**'],
    },
  });
};

