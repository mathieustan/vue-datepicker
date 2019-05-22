import dayjs from 'dayjs';
import mockDate from 'mockdate';
import 'dayjs/locale/fr';

import Dates, {
  getDefaultLocale,
  setLocaleLang,
  getWeekDays,
  isDateToday,
  formatDateWithLocale,
  isBeforeMinDate,
  isAfterEndDate,
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
        [{ lang: 'fr' }, expect.any(Object)],
        [{ lang: 'toto' }, 'en'],
      ])(
        'when lang equal %p, should set dayjs locale with %p',
        (locale, expectedCall) => {
          jest.spyOn(dayjs, 'locale');
          setLocaleLang(locale);
          expect(dayjs.locale).toHaveBeenCalledWith(expectedCall);
        }
      );
    });

    describe('getWeekDays', () => {
      it.each([
        [{ lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] }, ['L', 'M', 'M', 'J', 'V', 'S', 'D']],
        [{ lang: 'fr' }, ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']],
        [{ lang: 'es' }, ['lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.']],
      ])(
        'when lang equal %p, should return %p',
        (locale, expectedResult) => {
          expect(getWeekDays(locale)).toEqual(expectedResult);
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

    describe('formatDateWithLocale', () => {
      it.each([
        [dayjs(new Date([2019, 5, 16])), { lang: 'en' }, 'MMM', 'May'],
        [dayjs(new Date([2019, 5, 16])), { lang: 'fr' }, 'MMM', 'mai'],
      ])(
        'when currentDate equal %p, local is %p and format equal %p, should return %p',
        (selectedDate, locale, format, expectedResult) => {
          expect(formatDateWithLocale(selectedDate, locale, format)).toEqual(expectedResult);
        }
      );
    });

    describe('isBeforeMinDate', () => {
      it.each([
        [dayjs(new Date([2018, 5, 16])), undefined, undefined, false],
        [dayjs(new Date([2018, 5, 16])), '2018-5-1', 'date', false],
        [dayjs(new Date([2018, 5, 16])), '2018-5-17', 'date', true],
        [2018, '2018-5-17', 'year', false],
        [2017, '2018-5-17', 'year', true],
      ])(
        'when date = %p, minDate = %p and type = %p, should return %p',
        (date, minDate, type, expectedResult) => {
          expect(isBeforeMinDate(date, minDate, type)).toEqual(expectedResult);
        }
      );
    });

    describe('isAfterEndDate', () => {
      it.each([
        [dayjs(new Date([2018, 5, 16])), undefined, undefined, false],
        [dayjs(new Date([2018, 5, 16])), '2018-5-17', 'date', false],
        [dayjs(new Date([2018, 5, 16])), '2018-5-15', 'date', true],
        [2018, '2018-5-17', 'year', false],
        [2019, '2018-5-17', 'year', true],
      ])(
        'when date = %p, endDate = %p and type = %p, should return %p',
        (date, endDate, type, expectedResult) => {
          expect(isAfterEndDate(date, endDate, type)).toEqual(expectedResult);
        }
      );
    });
  });
});
