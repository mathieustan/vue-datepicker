import { terser } from 'rollup-plugin-terser';

import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-datepicker.umd.js',
    format: 'umd',
    name: 'VueDatepicker',
    exports: 'named',
    globals: {
      'body-scroll-lock': 'BodyScrollLock',
      'dayjs': 'Dayjs',
    },
  },
  plugins: [...base.plugins, terser()],
});

export default config;
