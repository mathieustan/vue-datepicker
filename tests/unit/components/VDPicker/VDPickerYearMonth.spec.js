import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import VDPickerYearMonth from '@/components/VDPicker/VDPickerYearMonth/VDPickerYearMonth';

import Dates from '@/utils/Dates';
import * as utilsFunction from '@/utils/positions';

describe('VDPickerYearMonth', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({
      active = false,
      date = new Dates(dummyDate.month(), dummyDate.year(), { lang: 'en' }),
      maxDate,
      minDate,
      mode = 'month',
      mutableDate,
      range,
    } = {}) =>
      shallowMount(VDPickerYearMonth, {
        propsData: {
          active,
          color: 'color',
          currentDate: date,
          isVisible: true,
          maxDate,
          minDate,
          mode,
          mutableDate,
          range,
          showYearMonthSelector: jest.fn(),
          transitionName: 'transitionName',
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

    describe('shouldComputeYearPosition', () => {
      [{
        description: 'return false if not active',
        props: {
          active: false,
        },
        expectedResult: false,
      }, {
        description: 'return false if active but selected mode is month',
        props: {
          active: true,
          mode: 'month',
        },
        expectedResult: false,
      }, {
        description: 'return true if active & selected mode is year',
        props: {
          active: true,
          mode: 'year',
        },
        expectedResult: 10, // it's visibleYearsNumber
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ ...props });
          expect(wrapper.vm.shouldComputeYearPosition).toEqual(expectedResult);
        });
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

    it('should scroll to active year if mode is year', async () => {
      const wrapper = mountComponent({ active: true, mode: 'month' });
      utilsFunction.computeYearsScrollPosition.mockClear();
      wrapper.setProps({ mode: 'year' });

      const containerToScroll = wrapper.element.querySelector('.vd-picker__selects-years__wrapper');
      Object.defineProperties(containerToScroll, {
        scrollTop: { get: () => 100, set: () => 100 },
      }, { writable: true });
      await wrapper.vm.$nextTick();

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
        [{ mutableDate: undefined }, 4, false],
        [{ mutableDate: dayjs(new Date([2019, 5, 16])) }, 4, true],
        [{ mutableDate: dayjs(new Date([2018, 5, 16])) }, 4, false],
        [{ mutableDate: dayjs(new Date([2019, 5, 16])) }, 12, false],
        [{ mutableDate: dayjs(new Date([2019, 5, 16])), range: true }, 4, false],
        [{ mutableDate: dayjs(new Date([2019, 5, 16])), range: true }, 12, false],
      ])(
        'when props = %p, and month is %p, should return %p',
        (props, monthIndex, expectedResult) => {
          const wrapper = mountComponent(props);
          expect(wrapper.vm.isSelectedMonthOrQuarter(monthIndex)).toEqual(expectedResult);
        }
      );
    });

    describe('isYearDisabled', () => {
      it.each([
        [{ minDate: undefined, maxDate: undefined }, 2019, false],
        [{ minDate: '2018-1-1', maxDate: '2020-12-31' }, 2019, false],
        [{ minDate: '2020-1-1', maxDate: '2020-12-31' }, 2019, true],
        [{ minDate: '2018-1-1', maxDate: '2018-12-31' }, 2019, true],
      ])(
        'when allowed dates = %p and year = %p, should return %p',
        (allowedDates, year, expectedResult) => {
          const { minDate, maxDate } = allowedDates;
          const wrapper = mountComponent({ minDate, maxDate, mode: 'year' });
          expect(wrapper.vm.isYearDisabled(year)).toEqual(expectedResult);
        }
      );
    });

    describe('isMonthOrQuarterDisabled', () => {
      it.each([
        [{ minDate: undefined, maxDate: undefined }, 'month', 4, false],
        [{ minDate: '2019-1', maxDate: '2019-3' }, 'month', 0, false],
        [{ minDate: '2019-1', maxDate: '2019-3' }, 'month', 1, false],
        [{ minDate: '2019-1', maxDate: '2019-3' }, 'month', 2, false],
        [{ minDate: '2019-1', maxDate: '2019-3' }, 'month', 3, true],
        [{ minDate: '2019-1', maxDate: '2019-3' }, 'month', 4, true],
        [{ minDate: '2019-1', maxDate: '2019-3' }, 'quarter', 0, false],
        [{ minDate: '2019-1', maxDate: '2019-3' }, 'quarter', 1, false],
        [{ minDate: '2019-1', maxDate: '2019-3' }, 'quarter', 2, false],
        [{ minDate: '2019-1', maxDate: '2019-3' }, 'quarter', 3, true],
        [{ minDate: '2019-1', maxDate: '2019-3' }, 'quarter', 4, true],
        [{ minDate: '2019-2', maxDate: '2019-3' }, 'quarter', 5, true],
      ])(
        'when allowed dates = %p and mode = %p and monthIndex = %p, should return %p',
        (allowedDates, mode, monthIndex, expectedResult) => {
          const { minDate, maxDate } = allowedDates;
          const wrapper = mountComponent({ minDate, maxDate, mode });
          expect(wrapper.vm.isMonthOrQuarterDisabled(monthIndex)).toEqual(expectedResult);
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

  describe('behaviour', () => {
    it('Year : should call onSelect on button click', () => {
      const wrapper = mountComponent({ mode: 'year' });
      const yearButton = wrapper.find('.vd-picker__selects-years__list > button');
      jest.spyOn(wrapper.vm, 'onSelect');

      yearButton.trigger('click');
      expect(wrapper.vm.onSelect).toHaveBeenCalled();
    });

    it('Month : should call onSelect on button click', () => {
      const wrapper = mountComponent({ mode: 'month' });
      const yearButton = wrapper.find('.vd-picker__selects-months > button');
      jest.spyOn(wrapper.vm, 'onSelect');

      yearButton.trigger('click');
      expect(wrapper.vm.onSelect).toHaveBeenCalled();
    });
  });
});
