import dayjs from 'dayjs';
import weekDay from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';

import * as locales from '../locale';
import {
  DEFAULT_INPUT_DATE_FORMAT,
  DEFAULT_HEADER_DATE_FORMAT,
  DEFAULT_OUTPUT_DATE_FORMAT,
} from '../constants';

dayjs.extend(weekDay);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);
dayjs.extend(AdvancedFormat);

export default class PickerDate {
  constructor (month, year, { lang = getDefaultLocale() } = {}) {
    const locale = locales[lang] || locales.en;
    dayjs.locale(locale);
    this.start = dayjs().year(year).month(month).startOf('month');
    this.end = this.start.endOf('month');
    this.month = month;
    this.year = year;
  }
  getWeekStart () {
    return this.start.weekday();
  }
  getDays () {
    return Array.from(this.generateDateRange(this.start, this.end, 'day'));
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
  generateDateRange (startDate, endDate, interval) {
    const diffBetweenDates = endDate.diff(startDate, interval);
    return [...Array(diffBetweenDates + 1).keys()].map(i => startDate.add(i, interval));
  }
  generateYearsRange (currentYear, range) {
    const start = currentYear - range;
    const end = currentYear + range;
    return [...Array(end - start + 1).keys()].map(i => start + i);
  }
}

// -----------------------------------------
// Handle Locale
// - getDefaultLocale : Return current locale from navigator or 'en' default
// - setLocaleLang : Init lang from arg
// - getWeekDays : Return week days from lang
// -----------------------------------------
export function getDefaultLocale () {
  return (window.navigator.userLanguage || window.navigator.language || 'en').substr(0, 2);
}

export function setLocaleLang ({ lang }) {
  const locale = locales[lang] || locales.en;
  dayjs.locale(locale);
}

export function getWeekDays ({ lang, weekDays }) {
  const locale = locales[lang] || locales.en;
  let weekDaysShort = [...locale.weekdaysShort];

  // If weekStart at 1, should move first index at the end
  if (locale.weekStart && locale.weekStart === 1) {
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
  const locale = locales[lang] || locales.en;
  return date.locale(locale).format(format);
}

export function formatDateWithYearAndMonth (year, month) {
  return dayjs().year(year).month(month).startOf('month');
}

// -----------------------------------------
// Compare Dates
// - isDateToday : Return Boolean if date is today
// - areSameDates : Return Boolean if dates are the same
// - isBeforeMinDate : Return Boolean if date is before minDate (from props)
// - isAfterEndDate : Return Boolean if date is after endDate (from props)
// - isDateAfter : Return Boolean if date are after a specific date
// -----------------------------------------

export function isDateToday (date) {
  return dayjs(date.format('YYYY-MM-DD')).isSame(dayjs().format('YYYY-MM-DD'));
}

export function areSameDates (date, dateSelected, type = 'date') {
  return dayjs(date, DEFAULT_OUTPUT_DATE_FORMAT[type])
    .isSame(dayjs(dateSelected, DEFAULT_OUTPUT_DATE_FORMAT[type]));
}

export function isBeforeMinDate (date, minDate, type = 'date') {
  if (type === 'year') {
    return Boolean(minDate) && date < dayjs(minDate, 'YYYY-MM-DD').get('year');
  }
  return Boolean(minDate) && date.isBefore(dayjs(minDate, DEFAULT_OUTPUT_DATE_FORMAT[type]));
}

export function isAfterEndDate (date, endDate, type) {
  if (type === 'year') {
    return Boolean(endDate) && date > dayjs(endDate, 'YYYY-MM-DD').get('year');
  }
  return Boolean(endDate) && date.isAfter(dayjs(endDate, DEFAULT_OUTPUT_DATE_FORMAT[type]));
}

export function isDateAfter (newDate, oldDate) {
  return dayjs(newDate).isAfter(dayjs(oldDate));
}

// -----------------------------------------
// Generate Month and Year from current mode
// -----------------------------------------

export function generateMonthAndYear (value, currentDate, mode) {
  if (mode === 'year') {
    return { year: value, month: currentDate.month };
  }

  if (mode === 'quarter') {
    return { year: currentDate.year, month: convertMonthToQuarter(value) };
  }

  return { year: currentDate.year, month: value };
}

export function convertMonthToQuarter (month) {
  return month * 3;
}
