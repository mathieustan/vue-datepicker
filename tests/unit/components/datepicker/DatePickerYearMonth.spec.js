import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePickerYearMonth from '@/components/datepicker/DatePickerYearMonth.vue';

import Dates from '@/utils/Dates';
import * as utilsFunction from '@/utils/positions';

describe('DatePickerYearMonth', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({
      date = new Dates(dummyDate.month(), dummyDate.year(), { lang: 'en' }),
      mutableDate = dummyDate,
      mode = 'month',
      minDate,
      endDate,
    } = {}) =>
      shallowMount(DatePickerYearMonth, {
        propsData: {
          transitionName: 'transitionName',
          color: 'color',
          mode,
          currentDate: date,
          mutableDate,
          isVisible: true,
          showYearMonthSelector: jest.fn(),
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
    expect(wrapper.vm.transitionName).toEqual('transitionName');
    expect(wrapper.vm.color).toEqual('color');
    expect(wrapper.vm.mode).toEqual('month');
    expect(wrapper.vm.currentDate).toEqual({
      start: dummyDate.startOf('month'),
      end: dummyDate.endOf('month'),
      month: 4,
      year: 2019,
    });
    expect(wrapper.vm.showYearMonthSelector).toEqual(expect.any(Function));
  });

  describe('computed', () => {
    describe('yearFormatted', () => {
      it('should return year with format YYYY', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.yearFormatted).toEqual('2019');
      });
    });

    describe('getYears', () => {
      it('should return a range of years', () => {
        const wrapper = mountComponent();
        // current year is 2019 - 10 => 2009
        // Should show 10 years before 2019 + 10 years after 2019 => 21 years
        const years = [...Array(21).keys()].map(i => 2009 + i);
        expect(wrapper.vm.getYears).toEqual(years);
      });
    });

    describe('getMonths', () => {
      it('should return a range of months', () => {
        const wrapper = mountComponent();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        expect(wrapper.vm.getMonths).toEqual(months);
      });
    });

    describe('getQuarters', () => {
      it('should return a range of quarters', () => {
        const wrapper = mountComponent();
        const expectedQuarters = [
          'January - March',
          'April - June',
          'July - September',
          'October - December',
        ];
        expect(wrapper.vm.getQuarters).toEqual(expectedQuarters);
      });
    });
  });

  describe('watch', () => {
    beforeEach(() => {
      jest.spyOn(utilsFunction, 'computeYearsScrollPosition').mockReturnValue(100);
    });

    it('should do nothing if mode change to month', async () => {
      const wrapper = mountComponent({ mode: 'year' });
      utilsFunction.computeYearsScrollPosition.mockClear();
      wrapper.setProps({ mode: 'month' });
      await wrapper.vm.$nextTick();

      expect(utilsFunction.computeYearsScrollPosition).not.toHaveBeenCalled();
    });

    it('should scroll to active yeart if mode is year', async () => {
      const wrapper = mountComponent({ mode: 'month' });
      utilsFunction.computeYearsScrollPosition.mockClear();
      wrapper.setProps({ mode: 'year' });
      await wrapper.vm.$nextTick();

      const containerToScroll = wrapper.element.querySelector('.datepicker-years__list');
      expect(utilsFunction.computeYearsScrollPosition).toHaveBeenCalled();
      expect(containerToScroll.scrollTop).toEqual(100);
    });
  });

  describe('methods', () => {
    describe('isSelectedYear', () => {
      it.each([
        [dayjs(new Date([2018, 5, 16])), 2018, true],
        [dayjs(new Date([2018, 5, 16])), 2019, false],
      ])(
        'when currentDate equal %p, and year is %p, should return %p',
        (date, year, expectedResult) => {
          const wrapper = mountComponent({
            date: new Dates(date.month(), date.year(), { lang: 'en' }),
          });
          expect(wrapper.vm.isSelectedYear(year)).toEqual(expectedResult);
        }
      );
    });

    describe('isSelectedMonthOrQuarter', () => {
      it.each([
        [dayjs(new Date([2019, 5, 16])), 4, true],
        [dayjs(new Date([2018, 5, 16])), 4, false],
        [dayjs(new Date([2019, 5, 16])), 12, false],
      ])(
        'when mutableDate = %p, and month is %p, should return %p',
        (mutableDate, monthIndex, expectedResult) => {
          const wrapper = mountComponent({ mutableDate });
          expect(wrapper.vm.isSelectedMonthOrQuarter(monthIndex)).toEqual(expectedResult);
        }
      );
    });

    describe('isYearDisabled', () => {
      it.each([
        [{ minDate: undefined, endDate: undefined }, 2019, false],
        [{ minDate: '2018-1-1', endDate: '2020-12-31' }, 2019, false],
        [{ minDate: '2020-1-1', endDate: '2020-12-31' }, 2019, true],
        [{ minDate: '2018-1-1', endDate: '2018-12-31' }, 2019, true],
      ])(
        'when allowed dates = %p and year = %p, should return %p',
        (allowedDates, year, expectedResult) => {
          const { minDate, endDate } = allowedDates;
          const wrapper = mountComponent({ minDate, endDate, mode: 'year' });
          expect(wrapper.vm.isYearDisabled(year)).toEqual(expectedResult);
        }
      );
    });

    describe('isMonthOrQuarterDisabled', () => {
      it.each([
        [{ minDate: undefined, endDate: undefined }, 'month', 4, false],
        [{ minDate: '2019-1', endDate: '2019-12' }, 'month', 4, false],
        [{ minDate: '2019-5', endDate: '2019-12' }, 'month', 3, true],
        [{ minDate: '2019-1', endDate: '2019-5' }, 'month', 5, true],
        [{ minDate: '2019-2', endDate: '2019-3' }, 'quarter', 1, false],
        [{ minDate: '2019-2', endDate: '2019-3' }, 'quarter', 0, true],
        [{ minDate: '2019-2', endDate: '2019-3' }, 'quarter', 3, true],
      ])(
        'when allowed dates = %p and month = %p and mode = %p, should return %p',
        (allowedDates, mode, month, expectedResult) => {
          const { minDate, endDate } = allowedDates;
          const wrapper = mountComponent({ minDate, endDate, mode });
          expect(wrapper.vm.isMonthOrQuarterDisabled(month)).toEqual(expectedResult);
        }
      );
    });

    describe('changeYear', () => {
      it('Should send an event to update year', () => {
        const wrapper = mountComponent();
        wrapper.vm.changeYear('prev');

        expect(wrapper.emitted().changeYear[0]).toEqual(['prev']);
      });
    });

    describe('onSelect', () => {
      it('Should send an event to update year', () => {
        const wrapper = mountComponent();
        wrapper.vm.onSelect(2);

        expect(wrapper.emitted().selectedYearMonth[0]).toEqual([2, 'month']);
      });
    });
  });
});
