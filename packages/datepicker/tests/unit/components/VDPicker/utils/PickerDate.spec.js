import dayjs from 'dayjs';
import mockDate from 'mockdate';
import 'dayjs/locale/fr';

import { en, fr, es } from '@/locale';

import PickerDate from '@/components/VDPicker/utils/PickerDate';

describe('Dates: Functions', () => {
  let todaysDate;
  let dummyDate;
  let newDate;

  beforeEach(() => {
    todaysDate = new Date([2019, 5, 16]);
    mockDate.set(todaysDate);
    dummyDate = dayjs(todaysDate);
    newDate = new PickerDate(dummyDate.month(), dummyDate.year(), { lang: en });
  });

  afterEach(() => {
    mockDate.reset();
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('PickerDate', () => {
    it('should init Dates class with a date', () => {
      expect(newDate).toEqual({
        start: dummyDate.startOf('month'),
        end: dummyDate.endOf('month'),
        month: 4,
        year: 2019,
        locale: { lang: en },
      });
    });

    it('should init Dates class with default EN if language not found', () => {
      jest.spyOn(dayjs, 'locale');
      Object.defineProperty(global, 'navigator', { value: { userLanguage: 'toto' }, writable: true });
      const dateWithDefaultLocale = new PickerDate(dummyDate.month(), dummyDate.year());
      expect(dayjs.locale).toHaveBeenCalledWith(en);
      expect(dateWithDefaultLocale).toEqual({
        start: dummyDate.startOf('month'),
        end: dummyDate.endOf('month'),
        month: 4,
        year: 2019,
        locale: { lang: en },
      });
    });

    it('should init Dates class with a date (WITHOUT LOCALE)', () => {
      jest.spyOn(dayjs, 'locale');
      Object.defineProperty(global, 'navigator', { value: { userLanguage: en }, writable: true });
      const dateWithDefaultLocale = new PickerDate(dummyDate.month(), dummyDate.year());
      expect(dayjs.locale).toHaveBeenCalled();
      expect(dateWithDefaultLocale).toEqual({
        start: dummyDate.startOf('month'),
        end: dummyDate.endOf('month'),
        month: 4,
        year: 2019,
        locale: { lang: en },
      });
    });

    it('should init Dates class with a date', () => {
      expect(newDate).toEqual({
        start: dummyDate.startOf('month'),
        end: dummyDate.endOf('month'),
        month: 4,
        year: 2019,
        locale: { lang: en },
      });
    });

    it('should return a number when week start', () => {
      expect(newDate.getWeekStart()).toEqual(3);
    });

    describe('getWeekDays', () => {
      const initPickerDate = (locale) => new PickerDate(dummyDate.month(), dummyDate.year(), locale);

      [{
        description: 'return week days from default lang behaviour',
        locale: { lang: fr },
        expectedResult: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      }, {
        description: 'return week days from locale weekDays',
        locale: { lang: fr, weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] },
        expectedResult: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      }, {
        description: 'return week days from default lang (es)',
        locale: { lang: es },
        expectedResult: ['lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.'],
      }].forEach(({ description, locale, expectedResult }) => {
        it(`should ${description}`, () => {
          const date = initPickerDate(locale);
          expect(date.getWeekDays()).toEqual(expectedResult);
        });
      });
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
      expect(newDate.generateYearsRange({ activeYear: 2018, visibleYearsNumber: 2 })).toEqual([2020, 2019, 2018, 2017, 2016]);
    });
  });

});
