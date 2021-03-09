export const Z_INDEX_LIST = {
  datepicker: 1002,
};

export const DEFAULT_LOCALE_PROPERTIES = [
  'name',
  'weekdays',
  'weekdaysShort',
  'weekdaysMin',
  'weekStart',
  'months',
  'monthsShort',
  'ordinal',
  'formats',
  'buttonCancel',
  'buttonValidate',
  'rangeHeaderText',
];

export const DEFAULT_INPUT_DATE_FORMAT = {
  date: 'DD MMMM YYYY',
  month: 'MMMM YYYY',
  quarter: 'YYYY-[Q]Q',
  year: 'YYYY',
  range: 'DD MMMM YYYY',
};

export const DEFAULT_OUTPUT_DATE_FORMAT = {
  date: 'YYYY-MM-DD',
  month: 'YYYY-MM',
  quarter: 'YYYY-Q',
  year: 'YYYY',
  range: 'YYYY-MM-DD',
};

export const DEFAULT_HEADER_DATE_FORMAT = {
  date: 'dddd DD MMMM',
  month: 'MMMM',
  quarter: '[Q]Q',
  year: 'YYYY',
  range: 'DD MMMM YYYY',
};

export const AVAILABLE_YEARS = {
  min: 1900,
  max: 3000,
};

export const DATEPICKER_MODES = {
  date: 'date',
  month: 'month',
  quarter: 'quarter',
  year: 'year',
};

export const MAX_PRESETS_NUMBER = 6;

export const DATE_HEADER_REGEX = /(%d)+/;

export const KEYCODES = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
});
