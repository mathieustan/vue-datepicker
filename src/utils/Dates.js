import dayjs from 'dayjs';
import weekDay from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekDay);
dayjs.extend(weekOfYear);

export default class PickerDate {
  constructor (month, year) {
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

export function getDefaultLocale () {
  const locale = (window.navigator.userLanguage || window.navigator.language || 'en').substr(0, 2);
  return locale;
}

export function setLocaleLang ({ lang }) {
  try {
    const locale = require(`dayjs/locale/${lang}`);
    dayjs.locale(locale);
  } catch (error) {
    console.error(`
      Couldn\t find any locale file for this lang: ${lang}.
      Please look at dayjs documentation`
    );
    dayjs.locale('en');
  }
}

export function getWeekDays ({ lang, weekDays }) {
  const locale = require(`dayjs/locale/${lang}`);
  let weekDaysShort;

  // weekdaysShort is not present in every locale
  if (!locale.weekdaysShort && locale.weekdays) {
    weekDaysShort = locale.weekdays.map(day => day.substring(0, 3));
  }

  // If weekStart at 1, should move first index at the end
  if (locale.weekStart === 1) {
    weekDaysShort.push(weekDaysShort.shift());
  }

  return weekDays || weekDaysShort;
}

export function isDateToday (date) {
  return dayjs(date.format('YYYY-MM-DD')).isSame(dayjs().format('YYYY-MM-DD'));
}

export function formatDateWithLocale (date, locale, format) {
  return date.locale(locale.lang).format(format);
}

export function initDateWithMonthAndYear (month, year) {
  return dayjs().month(month).year(year).startOf('month');
}

export function isBeforeMinDate (date, minDate, type = 'date') {
  if (type === 'year') {
    return Boolean(minDate) && date < dayjs(minDate, 'YYYY-MM-DD').get('year');
  }
  return Boolean(minDate) && date.isBefore(dayjs(minDate, 'YYYY-MM-DD'));
}

export function isAfterEndDate (date, endDate, type) {
  if (type === 'year') {
    return Boolean(endDate) && date > dayjs(endDate, 'YYYY-MM-DD').get('year');
  }
  return Boolean(endDate) && date.isAfter(dayjs(endDate, 'YYYY-MM-DD'));
}
