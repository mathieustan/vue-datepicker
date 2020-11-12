import dayjs from './dayjs';

// Locale
import { en } from '../../../locale';

import { generateDateRange } from './helpers';

export default class PickerDate {
  constructor (month, year, locale = { lang: en }) {
    dayjs.locale(locale.lang);
    this.locale = locale;
    this.start = dayjs().year(year).month(month).startOf('month');
    this.end = this.start.endOf('month');
    this.month = month;
    this.year = year;
  }
  getWeekStart () {
    return this.start.weekday();
  }
  getDays () {
    return Array.from(generateDateRange({
      startDate: this.start,
      endDate: this.end,
      locale: this.locale,
    }));
  }
  getWeekDays () {
    const { lang, weekDays } = this.locale;
    let weekDaysShort = [...lang.weekdaysShort];

    // If weekStart at 1, should move first index at the end
    if (lang.weekStart && lang.weekStart === 1) {
      weekDaysShort.push(weekDaysShort.shift());
    }

    return weekDays || weekDaysShort;
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
  generateYearsRange ({ activeYear, visibleYearsNumber, min, max }) {
    const selectedYear = parseInt(activeYear, 10) || parseInt(dayjs().format('YYYY'), 10);
    const maxYear = max ? parseInt(max, 10) : (selectedYear + visibleYearsNumber);
    const minYear = Math.min(maxYear, min ? parseInt(min, 10) : (selectedYear - visibleYearsNumber));

    return [...Array(maxYear - minYear + 1).keys()].map(i => maxYear - i);
  }
}
