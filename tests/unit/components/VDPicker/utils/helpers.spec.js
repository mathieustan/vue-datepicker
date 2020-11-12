import dayjs from 'dayjs';
import mockDate from 'mockdate';
import 'dayjs/locale/fr';

import { en, fr } from '@/locale';

import {
  DEFAULT_INPUT_DATE_FORMAT,
  DEFAULT_HEADER_DATE_FORMAT,
  DEFAULT_OUTPUT_DATE_FORMAT,
} from '@/constants';

import {
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
  // genFormattedInputDate,
} from '@/components/VDPicker/utils/helpers';

describe('Dates: Functions', () => {
  let todaysDate;

  beforeEach(() => {
    todaysDate = new Date([2019, 5, 16]);
    mockDate.set(todaysDate);
  });

  afterEach(() => {
    mockDate.reset();
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('Functions', () => {
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

    describe('convertQuarterToMonth', () => {
      it('should multiply by 3 given month number', () => {
        expect(convertQuarterToMonth(1)).toEqual(3);
      });
    });

    // -------------------------------
    // Initialize dates for components
    // -------------------------------
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

    describe('generateDates', () => {
      const defaultResult = {
        formattedHeaderYear: '2019',
        formattedHeaderDate: '--',
        minDate: undefined,
        maxDate: undefined,
        minMonth: undefined,
        maxMonth: undefined,
        minYear: undefined,
        maxYear: undefined,
      };

      [{
        description: 'return default values',
        props: {},
        expectedResult: defaultResult,
      }, {
        description: 'return set min/max dates',
        props: {
          maxDate: '2020-01-01',
          minDate: '2019-01-01',
        },
        expectedResult: {
          ...defaultResult,
          maxDate: '2020-01-01',
          minDate: '2019-01-01',
          maxMonth: '2020-01',
          minMonth: '2019-01',
          minYear: '2019',
          maxYear: '2020',
        },
      }, {
        description: 'return formatted header date',
        props: {
          range: false,
          mutableDate: dayjs(new Date([2019, 5, 16])),
          headerFormat: 'dddd DD MMM',
        },
        expectedResult: {
          ...defaultResult,
          formattedHeaderDate: 'Thursday 16 May',
        },
      }, {
        description: 'return formatted header date for range with start only',
        props: {
          range: true,
          mutableDate: { start: dayjs(new Date([2019, 5, 16])), end: undefined },
          rangeHeaderText: 'From %d To %d',
          headerFormat: 'YYYY-MM-DD',
        },
        expectedResult: {
          ...defaultResult,
          formattedHeaderYear: 'Invalid Date',
          formattedHeaderDate: ['From 2019-05-16', 'To __'],
        },
      }, {
        description: 'return formatted header date for complete range',
        props: {
          range: true,
          mutableDate: { start: dayjs(new Date([2019, 5, 16])), end: dayjs(new Date([2019, 5, 16])) },
          rangeHeaderText: 'From %d To %d',
          headerFormat: 'YYYY-MM-DD',
        },
        expectedResult: {
          ...defaultResult,
          formattedHeaderYear: 'Invalid Date',
          formattedHeaderDate: ['From 2019-05-16', 'To 2019-05-16'],
        },
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          expect(generateDates(props)).toEqual(expectedResult);
        });
      });
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

    // -------------------------------
    // Compares Dates
    // -------------------------------
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
          allowedFn: (date) => parseInt(date.split('-')[2], 10) === 16,
        },
        expectedResult: true,
      }, {
        description: 'return true if date is validated by allowedDates and equal min date',
        data: {
          date: dayjs(new Date([2019, 5, 16])),
          allowedFn: (date) => parseInt(date.split('-')[2], 10) === 16,
          minDate: '2019-5-16',
        },
        expectedResult: true,
      }, {
        description: 'return true if date is validated by allowedDates and equal max date',
        data: {
          date: dayjs(new Date([2019, 5, 16])),
          allowedFn: (date) => parseInt(date.split('-')[2], 10) === 16,
          maxDate: '2019-5-16',
        },
        expectedResult: true,
      }].forEach(({ description, data, expectedResult }) => {
        it(`should ${description}`, () => {
          expect(isDateAllowed(data)).toEqual(expectedResult);
        });
      });
    });

    describe('isCurrent', () => {
      // todaysDate = new Date([2019, 5, 16]);
      [{
        description: `be TRUE when date is same as today (type: date)`,
        options: {
          date: dayjs('2019-5-16'),
          type: 'date',
          locale: { lang: en },
        },
        expectedResult: true,
      }, {
        description: `be FALSE when date is NOT same as today (type: date)`,
        options: {
          date: dayjs('2019-5-17'),
          type: 'date',
          locale: { lang: en },
        },
        expectedResult: false,
      }, {
        description: `be TRUE when month & year are same as today (type: month)`,
        options: {
          date: dayjs('2019-5-17'),
          type: 'month',
          locale: { lang: en },
        },
        expectedResult: true,
      }, {
        description: `be FALSE when month & year are NOT same as today (type: month)`,
        options: {
          date: dayjs('2019-6-16'),
          type: 'month',
          locale: { lang: en },
        },
        expectedResult: false,
      }, {
        description: `be TRUE when quarter & year are same as today (type: quarter)`,
        options: {
          date: dayjs('2019-4'),
          type: 'quarter',
          locale: { lang: en },
        },
        expectedResult: true,
      }, {
        description: `be FALSE when quarter & year are NOT same as today (type: quarter)`,
        options: {
          date: dayjs('2019-7'),
          type: 'quarter',
          locale: { lang: en },
        },
        expectedResult: false,
      }, {
        description: `be TRUE when year is same as today (type: year)`,
        options: {
          date: dayjs('2019-6-17'),
          type: 'year',
          locale: { lang: en },
        },
        expectedResult: true,
      }, {
        description: `be FALSE when year is NOT same as today (type: year)`,
        options: {
          date: dayjs('2020-5-16'),
          type: 'year',
          locale: { lang: en },
        },
        expectedResult: false,
      }].forEach(({ description, options, expectedResult }) => {
        it(`should ${description}`, () => {
          expect(isCurrent(options)).toEqual(expectedResult);
        });
      });
    });

    describe('areSameDates', () => {
      it.each([
        ['2019-01-02', '2019-01-02', undefined, true],
        ['2019-01', '2019-01', 'month', true],
        ['2019-1', '2019-1', 'month', true],
        ['2018-1', '2019-1', 'month', false],
        ['2019-1', '2019-2', 'month', false],
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

    // -------------------------------
    // Generate Date properly formatted with locale
    // -------------------------------
    describe('generateDate', () => {
      it.each([
        [dayjs(new Date([2019, 5, 16])), { lang: en }, 'May'],
        [dayjs(new Date([2019, 5, 16])), { lang: fr }, 'Mai'],
      ])(
        'when date = %p, local is %p, should return %p',
        (date, locale, expectedResult) => {
          expect(generateDate({ date, locale }).format('MMM')).toEqual(expectedResult);
        }
      );
    });

    describe('generateDateFormatted', () => {
      it.each([
        [dayjs(new Date([2019, 5, 16])), { lang: en }, 'MMM', 'May'],
        [dayjs(new Date([2019, 5, 16])), { lang: fr }, 'MMM', 'Mai'],
      ])(
        'when currentDate equal %p, local is %p and format equal %p, should return %p',
        (date, locale, format, expectedResult) => {
          expect(generateDateFormatted({ date, locale, format })).toEqual(expectedResult);
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
          expect(generateDateWithYearAndMonth({ year, month }).format('YYYY-MM')).toEqual(expectedResult);
        }
      );
    });

    describe('generateDateRange', () => {
      it.each([
        ['2019-5-10', '2019-5-14', [...Array(5).keys()].map(day => dayjs(`2019-5-1${day}`))],
        [dayjs('2019-5-10'), dayjs('2019-5-14'), [...Array(5).keys()].map(day => dayjs(`2019-5-1${day}`))],
      ])(
        'when startDate = %p, maxDate = %p, should return %p',
        (startDate, endDate, expectedResult) => {
          expect(generateDateRange({ startDate, endDate })).toEqual(expectedResult);
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
          const ranges = generateDateRangeWithoutDisabled({ dates, minDate, maxDate });
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
          expect(getRangeDatesFormatted({ dates, locale, format })).toEqual(expectedResult);
        }
      );
    });

  });
});
