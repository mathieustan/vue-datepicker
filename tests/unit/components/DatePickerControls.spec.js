import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePickerControls from '@/components/DatePickerControls.vue';

import Dates from '@/utils/Dates';

jest.useFakeTimers();

describe('DatePickerControls', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({
      date = new Dates(dummyDate.month(), dummyDate.year(), { lang: 'en' }),
      mode = 'month',
      locale = { lang: 'en' },
      minDate,
      endDate,
    } = {}) =>
      shallowMount(DatePickerControls, {
        propsData: {
          currentDate: date,
          mode,
          locale,
          minDate,
          endDate,
        },
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.vm.currentDate).toEqual({
      start: dummyDate.startOf('month'),
      end: dummyDate.endOf('month'),
      month: 4,
      year: 2019,
    });
  });

  describe('computed', () => {
    describe('monthFormatted', () => {
      it('should return month with format MMMM', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.monthFormatted).toEqual('May');
      });
    });

    describe('yearFormatted', () => {
      it('should return year with format YYYY', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.yearFormatted).toEqual('2019');
      });
    });

    describe('isYearDisabled', () => {
      // current date = dayjs(new Date([2019, 5, 16]))
      it.each([
        [{ minDate: undefined, endDate: undefined }, false],
        [{ minDate: '2018-1-1', endDate: '2020-12-31' }, false],
        [{ minDate: '2020-1-1', endDate: '2020-12-31' }, true],
        [{ minDate: '2018-1-1', endDate: '2018-12-31' }, true],
      ])(
        'when allowed dates = %p, should return %p',
        (allowedDates, expectedResult) => {
          const { minDate, endDate } = allowedDates;
          const wrapper = mountComponent({ minDate, endDate });
          expect(wrapper.vm.isYearDisabled).toEqual(expectedResult);
        }
      );
    });

    describe('isPreviousDateDisabled', () => {
      // current date = dayjs(new Date([2019, 5, 16]))
      it.each([
        [{ minDate: undefined, endDate: undefined }, undefined, false],
        [{ minDate: '2018-1-1', endDate: '2020-12-31' }, 'year', false],
        [{ minDate: '2020-1-1', endDate: '2020-12-31' }, 'month', false],
        [{ minDate: '2020-1-1', endDate: '2020-12-31' }, 'year', true],
      ])(
        'when allowed dates = %p and mode = %p, should return %p',
        (allowedDates, mode, expectedResult) => {
          const { minDate, endDate } = allowedDates;
          const wrapper = mountComponent({ minDate, endDate, mode });
          expect(wrapper.vm.isPreviousDateDisabled).toEqual(expectedResult);
        }
      );
    });

    describe('isNextDateDisabled', () => {
      // current date = dayjs(new Date([2019, 5, 16]))
      it.each([
        [{ minDate: undefined, endDate: undefined }, undefined, false],
        [{ minDate: '2018-1-1', endDate: '2020-12-31' }, 'year', false],
        [{ minDate: '2018-1-1', endDate: '2018-12-31' }, 'month', false],
        [{ minDate: '2018-1-1', endDate: '2018-12-31' }, 'year', true],
      ])(
        'when allowed dates = %p and mode = %p, should return %p',
        (allowedDates, mode, expectedResult) => {
          const { minDate, endDate } = allowedDates;
          const wrapper = mountComponent({ minDate, endDate, mode });
          expect(wrapper.vm.isNextDateDisabled).toEqual(expectedResult);
        }
      );
    });
  });

  describe('methods', () => {
    describe('changeVisibleDate', () => {
      it('Should send an event to update month', () => {
        const wrapper = mountComponent();
        wrapper.vm.changeVisibleDate('prev');

        expect(wrapper.emitted().changeVisibleDate[0]).toEqual(['prev']);
      });
    });

    describe('showYearMonthSelector', () => {
      it('Should send an event to show year/month selector', () => {
        const wrapper = mountComponent();
        wrapper.vm.showYearMonthSelector('month');

        expect(wrapper.emitted().showYearMonthSelector[0]).toEqual(['month']);
      });
    });
  });
});
