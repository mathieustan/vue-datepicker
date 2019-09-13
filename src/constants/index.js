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
  range: 'DD MMMM YYYY',
};

export const DEFAULT_OUTPUT_DATE_FORMAT = {
  date: 'YYYY-MM-DD',
  month: 'YYYY-MM',
  quarter: 'YYYY-Q',
  range: 'YYYY-MM-DD',
};

export const DEFAULT_HEADER_DATE_FORMAT = {
  date: 'dddd DD MMMM',
  month: 'MMMM',
  quarter: '[Q]Q',
  range: 'DD MMMM YYYY',
};

export const AVAILABLE_YEARS = {
  min: 1900,
  max: 3000,
};

export const yearMonthSelectorTypes = ['month', 'quarter', 'year'];

export const MAX_PRESETS_NUMBER = 6;

export const DATE_HEADER_REGEX = /(%d)+/;
