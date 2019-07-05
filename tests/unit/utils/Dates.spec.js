import dayjs from 'dayjs';
import mockDate from 'mockdate';
import 'dayjs/locale/fr';

import { en, fr } from '@/locale';

import {
  DEFAULT_INPUT_DATE_FORMAT,
  DEFAULT_HEADER_DATE_FORMAT,
  DEFAULT_OUTPUT_DATE_FORMAT,
} from '@/constants';

import Dates, {
  getDefaultLocale,
  setLocaleLang,
  getWeekDays,
  getDefaultInputFormat,
  getDefaultHeaderFormat,
  getDefaultOutputFormat,
  formatDateWithLocale,
  formatDate,
  formatDateWithYearAndMonth,
  getRangeDatesFormatted,
  formatDateToSend,
  isDateToday,
  areSameDates,
  isBeforeDate,
  isAfterDate,
  isBetweenDates,
  isDateAfter,
  generateDateRange,
  generateMonthAndYear,

} from '@/utils/Dates';

describe('Transactions: Functions', () => {
  beforeEach(() => {
    mockDate.set(new Date([2019, 5, 16]));
  });

  afterEach(() => {
    mockDate.reset();
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('Dates', () => {
    let dummyDate;
    let newDate;

    beforeEach(() => {
      dummyDate = dayjs(new Date([2019, 5, 16]));
      newDate = new Dates(dummyDate.month(), dummyDate.year(), { lang: 'en' });
    });

    it('should init Dates class with a date', () => {
      expect(newDate).toEqual({
        start: dummyDate.startOf('month'),
        end: dummyDate.endOf('month'),
        month: 4,
        year: 2019,
      });
    });

    it('should init Dates class with default EN if language not found', () => {
      jest.spyOn(dayjs, 'locale');
      Object.defineProperty(global, 'navigator', { value: { userLanguage: 'toto' }, writable: true });
      const dateWithDefaultLocale = new Dates(dummyDate.month(), dummyDate.year());
      expect(dayjs.locale).toHaveBeenCalledWith(en);
      expect(dateWithDefaultLocale).toEqual({
        start: dummyDate.startOf('month'),
        end: dummyDate.endOf('month'),
        month: 4,
        year: 2019,
      });
    });

    it('should init Dates class with a date (WITHOUT LOCALE)', () => {
      jest.spyOn(dayjs, 'locale');
      Object.defineProperty(global, 'navigator', { value: { userLanguage: 'en' }, writable: true });
      const dateWithDefaultLocale = new Dates(dummyDate.month(), dummyDate.year());
      expect(dayjs.locale).toHaveBeenCalled();
      expect(dateWithDefaultLocale).toEqual({
        start: dummyDate.startOf('month'),
        end: dummyDate.endOf('month'),
        month: 4,
        year: 2019,
      });
    });

    it('should init Dates class with a date', () => {
      expect(newDate).toEqual({
        start: dummyDate.startOf('month'),
        end: dummyDate.endOf('month'),
        month: 4,
        year: 2019,
      });
    });

    it('should return a number when week start', () => {
      expect(newDate.getWeekStart()).toEqual(3);
    });

    it('should return an array with days in a month', () => {
      const expectedDays = [...Array(31).keys()].map(day => (day + 1).toString());
      const daysFormatted = newDate.getDays().map(day => dayjs(day).format('D'));
      expect(daysFormatted).toEqual(expectedDays);
    });

    it('should return an array with months in a year', () => {
      const expectedMonths = [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec',
      ];
      expect(newDate.getMonths()).toEqual(expectedMonths);
    });

    it('should return a range of quarters', () => {
      const expectedQuarters = [
        'January - March',
        'April - June',
        'July - September',
        'October - December',
      ];
      expect(newDate.getQuarters()).toEqual(expectedQuarters);
    });

    it('should return a string with month formatted', () => {
      expect(newDate.getMonthFormatted()).toEqual('May');
    });

    it('should return a string with year formatted', () => {
      expect(newDate.getYearFormatted()).toEqual('2019');
    });

    it('should return an array with years range', () => {
      expect(newDate.generateYearsRange(2018, 2)).toEqual([2016, 2017, 2018, 2019, 2020]);
    });
  });

  describe('Functions', () => {
    describe('getDefaultLocale', () => {
      it.each([
        [{ userLanguage: 'french', language: 'french' }, 'fr'],
        [{ userLanguage: undefined, language: 'russian' }, 'ru'],
        [{ userLanguage: undefined, language: undefined }, 'en'],
      ])(
        'when currentDate equal %p, should return %p',
        (navigator, expectedResult) => {
          Object.defineProperty(global, 'navigator', { value: navigator, writable: true });
          expect(getDefaultLocale()).toEqual(expectedResult);
        }
      );
    });

    describe('setLocaleLang', () => {
      it.each([
        [{ lang: 'fr' }, fr],
        [{ lang: 'toto' }, en],
      ])(
        'when lang equal %p, should set dayjs locale with %p',
        (locale, expectedLang) => {
          jest.spyOn(dayjs, 'locale');
          setLocaleLang(locale);
          expect(dayjs.locale).toHaveBeenCalledWith(expectedLang);
        }
      );
    });

    describe('getWeekDays', () => {
      it.each([
        [
          { lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] },
          ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
        ],
        [{ lang: 'fr' }, ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']],
        [{ lang: 'es' }, ['lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.']],
        [{ lang: 'toto' }, ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']],
      ])(
        'when lang equal %p, should return %p',
        (locale, expectedResult) => {
          expect(getWeekDays(locale)).toEqual(expectedResult);
        }
      );
    });

    describe('getDefaultInputFormat', () => {
      it.each([
        [undefined, DEFAULT_INPUT_DATE_FORMAT.date],
        ['date', DEFAULT_INPUT_DATE_FORMAT.date],
        ['month', DEFAULT_INPUT_DATE_FORMAT.month],
        ['range', DEFAULT_INPUT_DATE_FORMAT.range],
      ])(
        'When type is %p, should return %p',
        (type, expectedResult) => {
          expect(getDefaultInputFormat(type)).toEqual(expectedResult);
        }
      );
    });

    describe('getDefaultHeaderFormat', () => {
      it.each([
        [undefined, DEFAULT_HEADER_DATE_FORMAT.date],
        ['date', DEFAULT_HEADER_DATE_FORMAT.date],
        ['month', DEFAULT_HEADER_DATE_FORMAT.month],
        ['range', DEFAULT_HEADER_DATE_FORMAT.range],
      ])(
        'When type is %p, should return %p',
        (type, expectedResult) => {
          expect(getDefaultHeaderFormat(type)).toEqual(expectedResult);
        }
      );
    });

    describe('getDefaultOutputFormat', () => {
      it.each([
        [undefined, DEFAULT_OUTPUT_DATE_FORMAT.date],
        ['date', DEFAULT_OUTPUT_DATE_FORMAT.date],
        ['month', DEFAULT_OUTPUT_DATE_FORMAT.month],
        ['year', DEFAULT_OUTPUT_DATE_FORMAT.year],
        ['range', DEFAULT_OUTPUT_DATE_FORMAT.range],
      ])(
        'When type is %p, should return %p',
        (type, expectedResult) => {
          expect(getDefaultOutputFormat(type)).toEqual(expectedResult);
        }
      );
    });

    describe('formatDateWithLocale', () => {
      it.each([
        [dayjs(new Date([2019, 5, 16])), { lang: 'en' }, 'MMM', 'May'],
        [dayjs(new Date([2019, 5, 16])), { lang: 'fr' }, 'MMM', 'Mai'],
        [dayjs(new Date([2019, 5, 16])), { lang: 'toto' }, 'MMM', 'May'],
      ])(
        'when currentDate equal %p, local is %p and format equal %p, should return %p',
        (selectedDate, locale, format, expectedResult) => {
          expect(formatDateWithLocale(selectedDate, locale, format)).toEqual(expectedResult);
        }
      );
    });

    describe('formatDate', () => {
      it.each([
        [dayjs(new Date([2019, 5, 16])), { lang: 'en' }, 'May'],
        [dayjs(new Date([2019, 5, 16])), { lang: 'fr' }, 'Mai'],
        [dayjs(new Date([2019, 5, 16])), { lang: 'toto' }, 'May'],
      ])(
        'when date = %p, local is %p, should return %p',
        (selectedDate, locale, expectedResult) => {
          expect(formatDate(selectedDate, locale).format('MMM')).toEqual(expectedResult);
        }
      );
    });

    describe('formatDateWithYearAndMonth', () => {
      it.each([
        [2018, 2, '2018-03'],
        [2019, 3, '2019-04'],
      ])(
        'when year = %p, month = %p should return %p when formatted with YYYY-MM',
        (year, month, expectedResult) => {
          expect(formatDateWithYearAndMonth(year, month).format('YYYY-MM')).toEqual(expectedResult);
        }
      );
    });

    describe('getRangeDatesFormatted', () => {
      it.each([
        [undefined, {}, 'YYYY-MM-DD', 'YYYY-MM-DD ~ YYYY-MM-DD'],
        [{ start: '2019-5-15', end: undefined }, {}, 'YYYY-MM-DD', '2019-05-15 ~ YYYY-MM-DD'],
        [{ start: undefined, end: '2019-5-15' }, {}, 'YYYY-MM-DD', 'YYYY-MM-DD ~ 2019-05-15'],
        [{ start: '2019-5-15', end: undefined }, { lang: 'en' }, 'YYYY-MM-DD', '2019-05-15 ~ YYYY-MM-DD'],
        [{ start: '2019-5-15', end: '2019-5-17' }, { lang: 'en' }, 'YYYY-MM-DD', '2019-05-15 ~ 2019-05-17'],
      ])(
        'when year = %p, month = %p should return %p when formatted with YYYY-MM',
        (dates, locale, format, expectedResult) => {
          expect(getRangeDatesFormatted(dates, locale, format)).toEqual(expectedResult);
        }
      );
    });

    describe('formatDateToSend', () => {
      it.each([
        [dayjs('2019-5-15'), 'YYYY-MM-DD', false, '2019-05-15'],
        [
          { start: dayjs('2019-5-15'), end: dayjs('2019-5-17') },
          'YYYY-MM-DD',
          true,
          { start: '2019-05-15', end: '2019-05-17' },
        ],
      ])(
        'when date = %p, format = %p and range = %p, should return %p',
        (date, format, range, expectedResult) => {
          expect(formatDateToSend(date, format, range)).toEqual(expectedResult);
        }
      );
    });

    describe('isDateToday', () => {
      it.each([
        [dayjs(new Date([2019, 5, 16])), true],
        [dayjs(new Date([2019, 9, 16])), false],
      ])(
        'when currentDate equal %p, should return %p',
        (selectedDate, expectedResult) => {
          expect(isDateToday(selectedDate)).toEqual(expectedResult);
        }
      );
    });

    describe('areSameDates', () => {
      it.each([
        ['2019-01-02', '2019-01-02', undefined, true],
        ['2019-01', '2019-01', 'month', true],
        ['2019-1', '2019-1', 'month', true],
        ['2018-1', '2019-1', 'month', false],
        ['2019-01', '2019-02', 'month', false],
        ['2019-1', '2019-1', 'quarter', true],
        ['2019-1', '2019-2', 'quarter', false],
      ])(
        'when date = %p, selectedDate = %p and type is %p, should return %p',
        (date, selectedDate, type, expectedResult) => {
          expect(areSameDates(date, selectedDate, type)).toEqual(expectedResult);
        }
      );
    });

    describe('isBeforeDate', () => {
      it.each([
        ['2018-5-17', '2018-5-18', undefined, true],
        ['2018-5-18', '2018-5-18', undefined, false],
        [dayjs(new Date([2018, 5, 16])), undefined, undefined, false],
        [dayjs(new Date([2018, 5, 16])), '2018-5-1', 'date', false],
        [dayjs(new Date([2018, 5, 16])), '2018-5-17', 'date', true],
        ['2018-5', '2018-5-17', 'month', false],
        ['2018-4', '2018-5-17', 'month', true],
        [2018, '2018-5-17', 'year', false],
        [2017, '2018-5-17', 'year', true],
      ])(
        'when date = %p, beforeDate = %p and type = %p, should return %p',
        (date, beforeDate, type, expectedResult) => {
          expect(isBeforeDate(date, beforeDate, type)).toEqual(expectedResult);
        }
      );
    });

    describe('isAfterDate', () => {
      it.each([
        ['2018-5-17', '2018-5-15', 'date', true],
        [dayjs(new Date([2018, 5, 16])), undefined, undefined, false],
        [dayjs(new Date([2018, 5, 16])), '2018-5-17', 'date', false],
        [dayjs(new Date([2018, 5, 16])), '2018-5-15', 'date', true],
        ['2018-5', '2018-5-17', 'month', false],
        ['2018-6', '2018-5-17', 'month', true],
        [2018, '2018-5-17', 'year', false],
        [2019, '2018-5-17', 'year', true],
      ])(
        'when date = %p, afterDate = %p and type = %p, should return %p',
        (date, afterDate, type, expectedResult) => {
          expect(isAfterDate(date, afterDate, type)).toEqual(expectedResult);
        }
      );
    });

    describe('isBetweenDates', () => {
      it.each([
        ['2018-5-15', '2018-5-15', '2018-5-17', false],
        ['2018-5-17', '2018-5-15', '2018-5-17', false],
        ['2018-5-16', '2018-5-15', '2018-5-17', true],
      ])(
        'when date = %p, startDate = %p and enDate = %p, should return %p',
        (date, startDate, enDate, expectedResult) => {
          expect(isBetweenDates(date, startDate, enDate)).toEqual(expectedResult);
        }
      );
    });

    describe('isDateAfter', () => {
      it.each([
        ['2018-01-02', undefined, false],
        ['2018-05-16', '2018-5-17', false],
        ['2018-05-16', '2018-5-15', true],
      ])(
        'when date = %p, endDate = %p and type = %p, should return %p',
        (date, anotherDate, expectedResult) => {
          expect(isDateAfter(date, anotherDate)).toEqual(expectedResult);
        }
      );
    });

    describe('generateDateRange', () => {
      it.each([
        ['2019-5-10', '2019-5-14', [...Array(5).keys()].map(day => dayjs(`2019-5-1${day}`))],
        [dayjs('2019-5-10'), dayjs('2019-5-14'), [...Array(5).keys()].map(day => dayjs(`2019-5-1${day}`))],
      ])(
        'when startDate = %p, endDate = %p, should return %p',
        (startDate, endDate, expectedResult) => {
          expect(generateDateRange(startDate, endDate)).toEqual(expectedResult);
        }
      );
    });

    describe('generateMonthAndYear', () => {
      it.each([
        [2019, { year: 2018, month: 2 }, 'year', { year: 2019, month: 2 }],
        [3, { year: 2018, month: 2 }, 'quarter', { year: 2018, month: 9 }],
        [3, { year: 2018, month: 2 }, 'month', { year: 2018, month: 3 }],
      ])(
        'when value = %p, currentDate = %p and mode = %p, should return %p',
        (value, currentDate, mode, expectedResult) => {
          expect(generateMonthAndYear(value, currentDate, mode)).toEqual(expectedResult);
        }
      );
    });
  });
});
