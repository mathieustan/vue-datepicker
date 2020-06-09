import dayjs from 'dayjs';

// Dayjs plugins
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import utc from 'dayjs/plugin/utc';
import weekDay from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

// Constants
import {
  DEFAULT_INPUT_DATE_FORMAT,
  DEFAULT_HEADER_DATE_FORMAT,
  DEFAULT_OUTPUT_DATE_FORMAT,
  AVAILABLE_YEARS,
} from '../constants';

// Locale
import { en } from '../locale';

dayjs.extend(AdvancedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(quarterOfYear);
dayjs.extend(utc);
dayjs.extend(weekDay);
dayjs.extend(weekOfYear);

export default class PickerDate {
  constructor (month, year, { lang = en } = {}) {
    dayjs.locale(lang);
    this.start = generateDate().year(year).month(month).startOf('month');
    this.end = this.start.endOf('month');
    this.month = month;
    this.year = year;
  }
  getWeekStart () {
    return this.start.weekday();
  }
  getDays () {
    return Array.from(generateDateRange(this.start, this.end));
  }
  getMonths () {
    return Array.apply(0, Array(12)).map((_, i) => generateDate().month(i).format('MMM'));
  }
  getQuarters () {
    return Array.apply(0, Array(4)).map((_, i) => {
      const quarterMonthStart = generateDate().quarter(i + 1).startOf('quarter').format('MMMM');
      const quarterMonthEnd = generateDate().quarter(i + 1).endOf('quarter').format('MMMM');
      return `${quarterMonthStart} - ${quarterMonthEnd}`;
    });
  }
  getMonthFormatted () {
    return this.start.format('MMMM');
  }
  getYearFormatted () {
    return this.start.format('YYYY');
  }
  generateYearsRange (currentYear, range) {
    const start = currentYear - range;
    const end = currentYear + range;
    return [...Array(end - start + 1).keys()].map(i => start + i);
  }
}

// -----------------------------------------
// Init Date
// -----------------------------------------
export function initDate (date, { range, locale, type }) {
  if (range) {
    return {
      start: date && date.start != null ? generateDate(date.start, locale) : undefined,
      end: date && date.end != null ? generateDate(date.end, locale) : undefined,
    };
  }
  return date != null ? generateDate(date, locale, type) : undefined;
}

// -----------------------------------------
// Generate & Format
// - generateDate : Return a date set with lang
// - generateDateFormatted : Return a date with specific string format
// - generateDateWithYearAndMonth : Return date set to a specific year & month
// - generateDateRange : Return an array of dates
// - generateDateRangeWithoutDisabled : Return an array of dates filtered (without disabled days)
// - generateMonthAndYear : Return month & year for modes (date, month, quarter)
// - transformDateForModel: Return date (or date range) properly formatted as string
// - convertQuarterToMonth : Transform quarter to a month number (multiply by 3)
// -----------------------------------------
export function generateDate (date, { lang = en } = {}, type = 'date') {
  if (type === 'year') return dayjs(date).utc();
  return dayjs(date).locale(lang);
}

export function generateDateFormatted (date, locale, format) {
  return generateDate(date, locale).format(format);
}

export function generateDateWithYearAndMonth (year, month) {
  return generateDate().year(year).month(month).startOf('month');
}

export function generateDateRange (startDate, endDate, interval = 'day') {
  const start = generateDate(startDate);
  const end = generateDate(endDate);
  const diffBetweenDates = end.diff(start, interval);
  return [...Array(diffBetweenDates + 1).keys()].map(i => start.add(i, interval));
}

export function generateDateRangeWithoutDisabled ({ start, end }, minDate, maxDate) {
  const validMinDate = minDate || generateDate().year(AVAILABLE_YEARS.min);
  const validMaxDate = maxDate || generateDate().year(AVAILABLE_YEARS.max);

  return generateDateRange(start, end)
    .filter(date =>
      date.isSameOrAfter(validMinDate, 'day') &&
      date.isSameOrBefore(dayjs(validMaxDate, 'day')));
}

export function generateMonthAndYear (value, currentDate, mode) {
  if (mode === 'year') {
    return { year: value, month: currentDate.month };
  }

  if (mode === 'quarter') {
    return { year: currentDate.year, month: convertQuarterToMonth(value) };
  }

  return { year: currentDate.year, month: value };
}

export function transformDateForModel (date, format, range) {
  if (range) {
    return {
      start: date.start.format(format),
      end: date.end && date.end.format(format),
    };
  }

  return date.format(format);
}

export function convertQuarterToMonth (quarter) {
  return quarter * 3;
}

// -----------------------------------------
// Getters
// - getDefaultInputFormat : Return format string for input
// - getDefaultHeaderFormat : Return format string for header (in agenda)
// - getDefaultOutputFormat : Return format string when date selected
// - getWeekDays : Return an array with days in weeks (from lang)
// - getRangeDatesFormatted : Return dates formatted for range
// -----------------------------------------
export function getDefaultInputFormat (type = 'date') {
  return DEFAULT_INPUT_DATE_FORMAT[type];
}

export function getDefaultHeaderFormat (type = 'date') {
  return DEFAULT_HEADER_DATE_FORMAT[type];
}

export function getDefaultOutputFormat (type = 'date') {
  return DEFAULT_OUTPUT_DATE_FORMAT[type];
}

export function getWeekDays ({ lang, weekDays }) {
  let weekDaysShort = [...lang.weekdaysShort];

  // If weekStart at 1, should move first index at the end
  if (lang.weekStart && lang.weekStart === 1) {
    weekDaysShort.push(weekDaysShort.shift());
  }

  return weekDays || weekDaysShort;
}

export function getRangeDatesFormatted ({ start, end } = {}, { lang }, format) {
  if (!start && !end) {
    return `__ ~ __`;
  }

  if (!start && end) {
    return `__ ~ ${generateDate(end, lang).startOf('day').format(format)}`;
  }

  if (start && !end) {
    return `${generateDate(start, lang).startOf('day').format(format)} ~ __`;
  }

  return `\
${generateDate(start, lang).startOf('day').format(format)} \
~ \
${generateDate(end, lang).startOf('day').format(format)}`;
}

// -----------------------------------------
// Compare Dates
// - isDateAllowed: Return if a specific date is allowed
// - isDateToday : Return Boolean if date is today
// - areSameDates : Return Boolean if dates are the same
// - isBeforeDate : Return Boolean if date is before minDate (from props)
// - isAfterDate : Return Boolean if date is after maxDate (from props)
// - isDateAfter : Return Boolean if date are after a specific date
// -----------------------------------------
export function isDateAllowed ({ date, min, max, allowedFn }) {
  const formattedDate = date.toDate();
  return (!allowedFn || allowedFn(formattedDate)) &&
    (!min || areSameDates(formattedDate, min) || isAfterDate(formattedDate, min)) &&
    (!max || areSameDates(formattedDate, max) || isBeforeDate(formattedDate, max));
}

export function isDateToday (date) {
  return generateDate(date.format('YYYY-MM-DD')).isSame(generateDate().format('YYYY-MM-DD'));
}

export function areSameDates (date, dateSelected, type = 'date') {
  return dayjs(date, DEFAULT_OUTPUT_DATE_FORMAT[type])
    .isSame(dayjs(dateSelected, DEFAULT_OUTPUT_DATE_FORMAT[type]));
}

export function isBeforeDate (date, beforeDate, type = 'day') {
  if (type === 'year') {
    return Boolean(beforeDate) && date < dayjs(beforeDate, 'YYYY-MM-DD').get(type);
  }

  const selectedDate = dayjs.isDayjs(date) ? date : dayjs(date).startOf('day');
  return Boolean(beforeDate) && selectedDate.isBefore(dayjs(beforeDate).startOf('day'), type);
}

export function isAfterDate (date, afterDate, type = 'day') {
  if (type === 'year') {
    return Boolean(afterDate) && date > dayjs(afterDate, 'YYYY-MM-DD').get(type);
  }

  const selectedDate = dayjs.isDayjs(date) ? date : dayjs(date).startOf('day');
  return Boolean(afterDate) && selectedDate.isAfter(dayjs(afterDate).startOf('day'), type);
}

export function isBetweenDates (date, startDate, maxDate) {
  return isAfterDate(date, startDate) && isBeforeDate(date, maxDate);
}

export function isDateAfter (newDate, oldDate) {
  return dayjs(newDate).isAfter(dayjs(oldDate));
}
