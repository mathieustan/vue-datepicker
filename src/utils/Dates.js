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
  getMonthFormatted () {
    return this.start.format('MMMM');
  }
  getMonths () {
    return Array.apply(0, Array(12)).map((_, i) => dayjs().month(i).format('MMM'));
  }
  getYearFormatted () {
    return this.start.format('YYYY');
  }
  generateDateRange (startDate, endDate, interval) {
    const diffBetweenDates = endDate.diff(startDate, interval);
    return [...Array(diffBetweenDates + 1).keys()].map(i => startDate.add(i, interval));
  }
  generateYearMonthRange (currentYear, range) {
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
  require(`dayjs/locale/${lang}`);
  dayjs.locale(lang);
}

export function isDateToday (date) {
  return dayjs(date.format('YYYY-MM-DD')).isSame(dayjs().format('YYYY-MM-DD'));
}

export function formatDateWithLocale (date, locale, format) {
  return date.locale(locale.lang).format(format);
}
