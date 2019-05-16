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
    return this.start.format('MMMM YYYY');
  }
  generateDateRange (startDate, endDate, interval) {
    const diffBetweenDates = endDate.diff(startDate, interval);
    return [...Array(diffBetweenDates + 1).keys()].map(i => startDate.add(i, interval));
  }
}
