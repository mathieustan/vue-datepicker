import path from 'path';

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
  watch: { include: 'src/**' },
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
};
