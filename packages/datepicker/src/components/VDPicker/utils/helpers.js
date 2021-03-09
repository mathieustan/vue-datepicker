import dayjs from './dayjs';

import {
  getDefaultInputFormat,
  getDefaultHeaderFormat,
  getDefaultOutputFormat,
  replaceRegexWithDates,
} from './format';

import {
  convertQuarterToMonth,
} from './convert';

// Locale
import { en } from '../../../locale';

// Constants
import { AVAILABLE_YEARS } from '../../../constants';

export {
  // -- Format
  getDefaultInputFormat,
  getDefaultHeaderFormat,
  getDefaultOutputFormat,
  // -- Convert
  convertQuarterToMonth,
  // -- Initialize Dates
  initDate,
  generateDates,
  transformDateForModel,
  // -- Compare
  isDateAllowed,
  isCurrent,
  areSameDates,
  isBeforeDate,
  isAfterDate,
  isBetweenDates,
  isDateAfter,
  // - Generate Date
  generateDate,
  generateDateFormatted,
  generateDateWithYearAndMonth,
  generateMonthAndYear,
  generateDateRange,
  generateDateRangeWithoutDisabled,
  getRangeDatesFormatted,
  genFormattedInputDate,
};

// -------------------------------
// Initialize dates for components
// -------------------------------
function initDate (date, { range, locale, type }) {
  if (range) {
    return {
      start: date && date.start != null ? generateDate({ date: date.start, locale }) : undefined,
      end: date && date.end != null ? generateDate({ date: date.end, locale }) : undefined,
    };
  }

  return date != null ? generateDate({ date, locale, type }) : undefined;
}

function generateDates ({
  headerFormat,
  locale,
  maxDate,
  minDate,
  mutableDate,
  range,
  rangeHeaderText,
}) {
  return {
    formattedHeaderYear: generateDateFormatted({
      date: mutableDate,
      locale,
      format: 'YYYY',
    }),
    formattedHeaderDate: genFormattedHeaderDate({
      date: mutableDate,
      headerFormat,
      locale,
      range,
      rangeHeaderText,
    }),
    minDate,
    maxDate,
    minMonth: genMinMaxFormatted({ date: minDate, type: 'month', locale }),
    maxMonth: genMinMaxFormatted({ date: maxDate, type: 'month', locale }),
    minYear: genMinMaxFormatted({ date: minDate, type: 'year', locale }),
    maxYear: genMinMaxFormatted({ date: maxDate, type: 'year', locale }),
  };
}

function transformDateForModel (date, format, range) {
  if (range) {
    return {
      start: date.start.format(format),
      end: date.end && date.end.format(format),
    };
  }

  return date.format(format);
}

// -------------------------------
// Compares Dates
// -------------------------------
function isDateAllowed ({ date, min, max, type = 'date', allowedFn }) {
  const formattedDate = date.format(getDefaultOutputFormat(type));
  return (!allowedFn || allowedFn(formattedDate)) &&
    (!min || areSameDates(formattedDate, min, type) || isAfterDate(formattedDate, min, type)) &&
    (!max || areSameDates(formattedDate, max, type) || isBeforeDate(formattedDate, max, type));
}

function isCurrent ({ date, type = 'date', locale }) {
  const formattedDate = generateDateFormatted({
    date,
    locale,
    format: getDefaultOutputFormat(type),
  });

  const todaysDateFormatted = generateDateFormatted({
    date: undefined,
    locale,
    format: getDefaultOutputFormat(type),
  });

  // if type is quarter, we need to compare year & month
  // For example, formattedDate looks like 2020-1
  // For example, todaysDateFormatted looks like 2020-1
  return areSameDates(formattedDate, todaysDateFormatted, type === 'quarter' ? 'month' : type);
}

function areSameDates (date, dateSelected, type = 'date') {
  return dayjs(date, getDefaultOutputFormat(type))
    .isSame(dayjs(dateSelected, getDefaultOutputFormat(type)), type);
}

function isBeforeDate (date, beforeDate, type = 'day') {
  if (type === 'year') {
    return Boolean(beforeDate) && date < dayjs(beforeDate, 'YYYY-MM-DD').get(type);
  }

  const selectedDate = dayjs.isDayjs(date) ? date : dayjs(date).startOf('day');
  return Boolean(beforeDate) && selectedDate.isBefore(dayjs(beforeDate).startOf('day'), type);
}

function isAfterDate (date, afterDate, type = 'day') {
  if (type === 'year') {
    return Boolean(afterDate) && date > dayjs(afterDate, 'YYYY-MM-DD').get(type);
  }

  const selectedDate = dayjs.isDayjs(date) ? date : dayjs(date).startOf('day');
  return Boolean(afterDate) && selectedDate.isAfter(dayjs(afterDate).startOf('day'), type);
}

function isBetweenDates (date, startDate, maxDate) {
  return isAfterDate(date, startDate) && isBeforeDate(date, maxDate);
}

function isDateAfter (newDate, oldDate) {
  return dayjs(newDate).isAfter(dayjs(oldDate));
}

// -------------------------------
// Generate Date properly formatted with locale
// -------------------------------
function generateDate ({ date, locale = { lang: en }, type = 'date' }) {
  if (type === 'year') return dayjs(date).utc();
  return dayjs(date).locale(locale.lang);
}

function generateDateFormatted ({ date, locale, format }) {
  return generateDate({ date, locale }).format(format);
}

function generateDateWithYearAndMonth ({ year, month, locale }) {
  return generateDate({ locale }).year(year).month(month).startOf('month');
}

function generateMonthAndYear (value, pickerDate, mode) {
  if (mode === 'year') return { year: value, month: pickerDate.month };
  if (mode === 'quarter') return { year: pickerDate.year, month: convertQuarterToMonth(value) };
  return { year: pickerDate.year, month: value };
}

function generateDateRange ({
  startDate,
  endDate,
  locale,
  interval = 'day',
}) {
  const start = generateDate({ date: startDate, locale });
  const end = generateDate({ date: endDate, locale });
  const diffBetweenDates = end.diff(start, interval);
  return [...Array(diffBetweenDates + 1).keys()].map(i => start.add(i, interval));
}

function generateDateRangeWithoutDisabled ({ dates = {}, minDate, maxDate, locale }) {
  const { start, end } = dates;
  const validMinDate = minDate || generateDate({ locale }).year(AVAILABLE_YEARS.min);
  const validMaxDate = maxDate || generateDate({ locale }).year(AVAILABLE_YEARS.max);

  return generateDateRange({ startDate: start, endDate: end, locale })
    .filter(date =>
      date.isSameOrAfter(validMinDate, 'day') &&
      date.isSameOrBefore(dayjs(validMaxDate, 'day')));
}

// -------------------------------
// Helpers
// -------------------------------
function genFormattedInputDate ({
  inputFormat,
  internalDate,
  isDateDefined,
  locale,
  range,
  rangeInputText,
  type,
}) {
  if (!isDateDefined) return;

  if (range && rangeInputText) {
    const [startDate, endDate] = getRangeDatesFormatted({
      dates: internalDate,
      locale,
      format: inputFormat,
    }).split(' ~ ');

    return replaceRegexWithDates({ regexText: rangeInputText, startDate, endDate });
  }

  // If type is quarter,
  // We need to convert this quarter date, to a monthly date
  // because dayjs will transform a monthly date to quarter date only
  // Exemple => '2019-2' => should be converted to date : 2019-06-01
  const currentMonth = internalDate.month();
  const newMonth = type === 'quarter' ? convertQuarterToMonth(currentMonth) : currentMonth;
  return generateDateFormatted({
    date: internalDate.set('month', newMonth),
    locale,
    format: inputFormat,
  });
}

function genFormattedHeaderDate ({
  headerFormat,
  locale,
  date,
  range,
  rangeHeaderText,
}) {
  if (range && rangeHeaderText) {
    const [startDate, endDate] = getRangeDatesFormatted({
      dates: date,
      locale,
      format: headerFormat,
    }).split(' ~ ');
    const [fromText, toText] = replaceRegexWithDates({
      regexText: rangeHeaderText,
      startDate,
      endDate,
    }, true);
    return [fromText.trim(), toText.trim()];
  }

  if (!date) return '--';

  return generateDateFormatted({
    date,
    locale,
    format: headerFormat,
  });
}

function genMinMaxFormatted ({ date, type, locale }) {
  if (!date) return;
  return generateDateFormatted({
    date,
    locale,
    format: getDefaultOutputFormat(type),
  });
}

function getRangeDatesFormatted ({ dates = {}, locale, format }) {
  const { start, end } = dates;

  if (!start && !end) return `__ ~ __`;
  if (!start && end) return `__ ~ ${generateDate({ date: end, locale }).startOf('day').format(format)}`;
  if (start && !end) return `${generateDate({ date: start, locale }).startOf('day').format(format)} ~ __`;

  return `\
${generateDate({ date: start, locale }).startOf('day').format(format)} \
~ \
${generateDate({ date: end, locale }).startOf('day').format(format)}`;
}
