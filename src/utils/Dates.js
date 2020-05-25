import dayjs from 'dayjs';
import weekDay from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// Constants
import {
  DEFAULT_INPUT_DATE_FORMAT,
  DEFAULT_HEADER_DATE_FORMAT,
  DEFAULT_OUTPUT_DATE_FORMAT,
  AVAILABLE_YEARS,
} from '../constants';

// Locale
import { en } from '../locale';

dayjs.extend(weekDay);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);
dayjs.extend(AdvancedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default class PickerDate {
  constructor (month, year, { lang = en } = {}) {
    dayjs.locale(lang);
    this.start = dayjs().year(year).month(month).startOf('month');
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
    return Array.apply(0, Array(12)).map((_, i) => dayjs().month(i).format('MMM'));
  }
  getQuarters () {
    return Array.apply(0, Array(4)).map((_, i) => {
      const quarterMonthStart = dayjs().quarter(i + 1).startOf('quarter').format('MMMM');
      const quarterMonthEnd = dayjs().quarter(i + 1).endOf('quarter').format('MMMM');
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
// Handle Locale
// - getWeekDays : Return week days from lang
// -----------------------------------------
export function getWeekDays ({ lang, weekDays }) {
  let weekDaysShort = [...lang.weekdaysShort];

  // If weekStart at 1, should move first index at the end
  if (lang.weekStart && lang.weekStart === 1) {
    weekDaysShort.push(weekDaysShort.shift());
  }

  return weekDays || weekDaysShort;
}

// -----------------------------------------
// Format
// - getDefaultInputFormat : Return format string for input
// - getDefaultHeaderFormat : Return format string for header (in agenda)
// - getDefaultOutputFormat : Return format string when date selected
// - formatDateWithLocale : Return date formatted with lang
// - formatDate : Return date with lang
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

export function formatDateWithLocale (date, { lang }, format) {
  return dayjs(date).locale(lang).format(format);
}

export function formatDate (date, { lang }) {
  return dayjs(date).locale(lang);
}

export function formatDateWithYearAndMonth (year, month) {
  return dayjs().year(year).month(month).startOf('month');
}

export function getRangeDatesFormatted ({ start, end } = {}, { lang }, format) {
  if (!start && !end) {
    return `__ ~ __`;
  }

  if (!start && end) {
    return `__ ~ ${dayjs(end).locale(lang).startOf('day').format(format)}`;
  }

  if (start && !end) {
    return `${dayjs(start).locale(lang).startOf('day').format(format)} ~ __`;
  }

  return `\
${dayjs(start).locale(lang).startOf('day').format(format)} \
~ \
${dayjs(end).locale(lang).startOf('day').format(format)}`;
}

export function formatDateToSend (date, format, range) {
  if (range) {
    return {
      start: date.start.format(format),
      end: date.end && date.end.format(format),
    };
  }

  return date.format(format);
}

// -----------------------------------------
// Compare Dates
// - isDateToday : Return Boolean if date is today
// - areSameDates : Return Boolean if dates are the same
// - isBeforeDate : Return Boolean if date is before minDate (from props)
// - isAfterDate : Return Boolean if date is after maxDate (from props)
// - isDateAfter : Return Boolean if date are after a specific date
// -----------------------------------------

export function isDateToday (date) {
  return dayjs(date.format('YYYY-MM-DD')).isSame(dayjs().format('YYYY-MM-DD'));
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

export function generateDateRangeWithoutDisabled ({ start, end }, minDate, maxDate) {
  const validMinDate = minDate || dayjs().year(AVAILABLE_YEARS.min);
  const validMaxDate = maxDate || dayjs().year(AVAILABLE_YEARS.max);

  return generateDateRange(start, end)
    .filter(date =>
      date.isSameOrAfter(validMinDate, 'day') &&
      date.isSameOrBefore(dayjs(validMaxDate, 'day')));
}

// -----------------------------------------
// Generate Dates
// - initDate : Return date formatted for range or date mode
// - generateDateRange : Return an array of dates
// - generateMonthAndYear : Return month & year for modes (date, month, quarter)
// - convertQuarterToMonth : Transform quarter to a month number
// -----------------------------------------
export function initDate (date, { isRange, locale }) {
  if (isRange) {
    return {
      start: date && date.start != null ? formatDate(date.start, locale) : undefined,
      end: date && date.end != null ? formatDate(date.end, locale) : undefined,
    };
  }
  return date != null ? formatDate(date, locale) : undefined;
}

export function generateDateRange (startDate, endDate, interval = 'day') {
  const start = dayjs.isDayjs(startDate) ? startDate : dayjs(startDate);
  const end = dayjs.isDayjs(endDate) ? endDate : dayjs(endDate);
  const diffBetweenDates = end.diff(start, interval);
  return [...Array(diffBetweenDates + 1).keys()].map(i => start.add(i, interval));
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

export function convertQuarterToMonth (quarter) {
  return quarter * 3;
}
