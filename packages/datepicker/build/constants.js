import path from 'path';

const { version } = require(path.resolve(process.cwd(), 'package.json'));

export const BANNER =
'/*!\n' +
` * Vue-datepicker v${version}\n` +
` * (c) 2019-${new Date().getFullYear()} Mathieu Stanowski\n` +
' */';

export const RESOLVE_FIELDS = ['jsnext', 'main', 'browser'];

export const GLOBALS = {
  'body-scroll-lock': 'BodyScrollLock',
  'dayjs': 'dayjs',
  'dayjs/plugin/advancedFormat': 'advancedFormat',
  'dayjs/plugin/isSameOrAfter': 'isSameOrAfter',
  'dayjs/plugin/isSameOrBefore': 'isSameOrBefore',
  'dayjs/plugin/isToday': 'isToday',
  'dayjs/plugin/quarterOfYear': 'quarterOfYear',
  'dayjs/plugin/utc': 'utc',
  'dayjs/plugin/weekday': 'weekDay',
  'dayjs/plugin/weekOfYear': 'weekOfYear',
  'get-size': 'getSize',
  'vue': 'Vue',
};
