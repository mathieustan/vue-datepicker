import dayjs from 'dayjs';
import mockDate from 'mockdate';
import 'dayjs/locale/fr';

import { en, fr, es } from '@/locale';

import {
  DEFAULT_INPUT_DATE_FORMAT,
  DEFAULT_HEADER_DATE_FORMAT,
  DEFAULT_OUTPUT_DATE_FORMAT,
} from '@/constants';

import Dates, {
  areSameDates,
  convertQuarterToMonth,
  generateDate,
  generateDateFormatted,
  generateDateRange,
  generateDateRangeWithoutDisabled,
  generateDateWithYearAndMonth,
  generateMonthAndYear,
  getDefaultHeaderFormat,
  getDefaultInputFormat,
  getDefaultOutputFormat,
  getRangeDatesFormatted,
  getWeekDays,
  initDate,
  isAfterDate,
  isBeforeDate,
  isBetweenDates,
  isDateAfter,
  isDateAllowed,
  isDateToday,
  transformDateForModel,
} from '@/utils/Dates';

describe('Dates: Functions', () => {
  let todaysDate;
  let dummyDate;
  let newDate;

  beforeEach(() => {
    todaysDate = new Date([2019, 5, 16]);
    mockDate.set(todaysDate);
    dummyDate = dayjs(todaysDate);
    newDate = new Dates(dummyDate.month(), dummyDate.year(), { lang: en });
  });

  afterEach(() => {
    mockDate.reset();
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('Dates', () => {
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
      Object.defineProperty(global, 'navigator', { value: { userLanguage: en }, writable: true });
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
    // -----------------------------------------
    // Init Date
    // -----------------------------------------
    describe('initDate', () => {
      it.each([
        [
          { start: null, end: null },
          { range: true, locale: { lang: en } },
          { start: undefined, end: undefined },
        ],
        [
          { start: new Date([2019, 5, 16]), end: undefined },
          { range: true, locale: { lang: en } },
          { start: dayjs(new Date([2019, 5, 16]), DEFAULT_OUTPUT_DATE_FORMAT.date), end: undefined },
        ],
        [
          { start: new Date([2019, 5, 16]), end: new Date([2019, 5, 17]) },
          { range: true, locale: { lang: en } },
          {
            start: dayjs(new Date([2019, 5, 16]), DEFAULT_OUTPUT_DATE_FORMAT.date),
            end: dayjs(new Date([2019, 5, 17]), DEFAULT_OUTPUT_DATE_FORMAT.date),
          },
        ],
        [
          null,
          { range: false, locale: { lang: en } },
          undefined,
        ],
        [
          undefined,
          { range: false, locale: { lang: en } },
          undefined,
        ],
        [
          new Date([2019, 5, 16]),
          { range: false, locale: { lang: en } },
          dayjs(new Date([2019, 5, 16]), DEFAULT_OUTPUT_DATE_FORMAT.date),
        ],
      ])(
        'when date equal %p && params = %p, should return %p',
        (date, params, expectedResult) => {
          const result = initDate(date, params);
          expect(result).toEqual(expectedResult);
        },
      );

      describe('should return correct year for each lang when type is year', () => {
        const date = new Date([2019, 5, 16]);

        it('when default lang', () => {
          const params = { range: false, locale: { lang: en }, type: 'year' };
          expect(initDate(date, params).get('year')).toEqual(2019);
        });

        it('when default fr', () => {
          const params = { range: false, locale: { lang: fr }, type: 'year' };
          expect(initDate(date, params).get('year')).toEqual(2019);
        });
      });
    });

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
    describe('generateDate', () => {
      it.each([
        [dayjs(new Date([2019, 5, 16])), { lang: en }, 'May'],
        [dayjs(new Date([2019, 5, 16])), { lang: fr }, 'Mai'],
      ])(
        'when date = %p, local is %p, should return %p',
        (selectedDate, locale, expectedResult) => {
          expect(generateDate(selectedDate, locale).format('MMM')).toEqual(expectedResult);
        }
      );
    });

    describe('generateDateFormatted', () => {
      it.each([
        [dayjs(new Date([2019, 5, 16])), { lang: en }, 'MMM', 'May'],
        [dayjs(new Date([2019, 5, 16])), { lang: fr }, 'MMM', 'Mai'],
      ])(
        'when currentDate equal %p, local is %p and format equal %p, should return %p',
        (selectedDate, locale, format, expectedResult) => {
          expect(generateDateFormatted(selectedDate, locale, format)).toEqual(expectedResult);
        }
      );
    });

    describe('generateDateWithYearAndMonth', () => {
      it.each([
        [2018, 2, '2018-03'],
        [2019, 3, '2019-04'],
      ])(
        'when year = %p, month = %p should return %p when formatted with YYYY-MM',
        (year, month, expectedResult) => {
          expect(generateDateWithYearAndMonth(year, month).format('YYYY-MM')).toEqual(expectedResult);
        }
      );
    });

    describe('generateDateRange', () => {
      it.each([
        ['2019-5-10', '2019-5-14', [...Array(5).keys()].map(day => dayjs(`2019-5-1${day}`))],
        [dayjs('2019-5-10'), dayjs('2019-5-14'), [...Array(5).keys()].map(day => dayjs(`2019-5-1${day}`))],
      ])(
        'when startDate = %p, maxDate = %p, should return %p',
        (startDate, maxDate, expectedResult) => {
          expect(generateDateRange(startDate, maxDate)).toEqual(expectedResult);
        }
      );
    });

    describe('generateDateRangeWithoutDisabled', () => {
      it.each([
        [{ start: '2018-01-01', end: '2018-01-31' }, undefined, undefined, 31],
        [{ start: '2018-01-01', end: '2018-01-31' }, '2018-01-20', undefined, 12],
        [{ start: '2018-01-01', end: '2018-01-31' }, undefined, '2018-01-30', 30],
        [{ start: '2018-01-01', end: '2018-01-31' }, '2018-01-20', '2018-02-05', 12],
        [{ start: '2018-01-01', end: '2018-01-31' }, '2017-12-01', '2018-01-10', 10],
        [{ start: '2018-01-01', end: '2018-01-31' }, '2019-01-01', '2019-01-31', 0],
      ])(
        'when dates = %p, minDate = %p, maxDate = %p, should return %p date available',
        (dates, minDate, maxDate, expectedResult) => {
          const ranges = generateDateRangeWithoutDisabled(dates, minDate, maxDate);
          expect(ranges.length).toEqual(expectedResult);
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

    describe('transformDateForModel', () => {
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
          expect(transformDateForModel(date, format, range)).toEqual(expectedResult);
        }
      );
    });

    describe('convertQuarterToMonth', () => {
      it('should multiply by 3 given month number', () => {
        expect(convertQuarterToMonth(1)).toEqual(3);
      });
    });

    // -----------------------------------------
    // Getters
    // - getDefaultInputFormat : Return format string for input
    // - getDefaultHeaderFormat : Return format string for header (in agenda)
    // - getDefaultOutputFormat : Return format string when date selected
    // - getWeekDays : Return an array with days in weeks (from lang)
    // - getRangeDatesFormatted : Return dates formatted for range
    // -----------------------------------------
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

    describe('getWeekDays', () => {
      it.each([
        [
          { lang: fr, weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] },
          ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
        ],
        [{ lang: fr }, ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']],
        [{ lang: es }, ['lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.']],
      ])(
        'when lang equal %p, should return %p',
        (locale, expectedResult) => {
          expect(getWeekDays(locale)).toEqual(expectedResult);
        }
      );
    });

    describe('getRangeDatesFormatted', () => {
      it.each([
        [undefined, {}, 'YYYY-MM-DD', '__ ~ __'],
        [{ start: '2019-5-15', end: undefined }, { lang: en }, 'YYYY-MM-DD', '2019-05-15 ~ __'],
        [{ start: undefined, end: '2019-5-15' }, { lang: en }, 'YYYY-MM-DD', '__ ~ 2019-05-15'],
        [{ start: '2019-5-15', end: undefined }, { lang: en }, 'YYYY-MM-DD', '2019-05-15 ~ __'],
        [{ start: '2019-5-15', end: '2019-5-17' }, { lang: en }, 'YYYY-MM-DD', '2019-05-15 ~ 2019-05-17'],
        [{ start: '2019-5-15', end: '2019-5-17' }, { lang: en }, 'DD MMMM', '15 May ~ 17 May'],
        [{ start: '2019-5-15', end: '2019-5-17' }, { lang: fr }, 'DD MMMM', '15 Mai ~ 17 Mai'],
      ])(
        'when year = %p, month = %p should return %p when formatted with YYYY-MM',
        (dates, locale, format, expectedResult) => {
          expect(getRangeDatesFormatted(dates, locale, format)).toEqual(expectedResult);
        }
      );
    });

    // -----------------------------------------
    // Compare Dates
    // - isDateAllowed: Return if a specific date is allowed
    // - isDateToday : Return Boolean if date is today
    // - areSameDates : Return Boolean if dates are the same
    // - isBeforeDate : Return Boolean if date is before minDate (from props)
    // - isAfterDate : Return Boolean if date is after maxDate (from props)
    // - isDateAfter : Return Boolean if date are after a specific date
    // -----------------------------------------
    describe('isDateAllowed', () => {
      [{
        description: 'return true by default',
        data: {
          date: dayjs(new Date([2019, 5, 16])),
        },
        expectedResult: true,
      }, {
        description: 'return true if date is validated by allowedDates',
        data: {
          date: dayjs(new Date([2019, 5, 16])),
          allowedFn: (date) => date.getDate() === 16,
        },
        expectedResult: true,
      }, {
        description: 'return true if date is validated by allowedDates and equal min date',
        data: {
          date: dayjs(new Date([2019, 5, 16])),
          allowedFn: (date) => date.getDate() === 16,
          minDate: '2019-5-16',
        },
        expectedResult: true,
      }, {
        description: 'return true if date is validated by allowedDates and equal max date',
        data: {
          date: dayjs(new Date([2019, 5, 16])),
          allowedFn: (date) => date.getDate() === 16,
          maxDate: '2019-5-16',
        },
        expectedResult: true,
      }].forEach(({ description, data, expectedResult }) => {
        it(`should ${description}`, () => {
          expect(isDateAllowed(data)).toEqual(expectedResult);
        });
      });
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
        'when date = %p, maxDate = %p and type = %p, should return %p',
        (date, anotherDate, expectedResult) => {
          expect(isDateAfter(date, anotherDate)).toEqual(expectedResult);
        }
      );
    });
  });
});
