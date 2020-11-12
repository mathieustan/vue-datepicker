import dayjs from 'dayjs';
import mockDate from 'mockdate';
import { mount } from '@vue/test-utils';
import VDPickerYears from '@/components/VDPicker/VDPickerYears';

// PickerDate Class
import PickerDate from '@/components/VDPicker/utils/PickerDate';

// Utils
import * as utilsFunction from '@/utils/positions';

jest.useFakeTimers();

beforeEach(() => {
  mockDate.set(new Date([2019, 5, 16]));
});

afterEach(() => {
  mockDate.reset();
});

describe('VDPickerYears', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({
      active = false,
      date = new PickerDate(dummyDate.month(), dummyDate.year(), { lang: 'en' }),
      max,
      min,
      mutableDate,
      allowedDates,
      range,
    } = {}) =>
      mount(VDPickerYears, {
        propsData: {
          active,
          color: 'color',
          pickerDate: date,
          isVisible: true,
          max,
          min,
          mutableDate,
          allowedDates,
          range,
        },
        mocks: {
          $vuedatepicker: { lang: 'en' },
        },
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.vm.color).toEqual('color');
    expect(wrapper.vm.pickerDate).toEqual({
      start: dummyDate.startOf('month'),
      end: dummyDate.endOf('month'),
      month: 4,
      year: 2019,
      locale: { lang: 'en' },
    });
  });

  describe('computed', () => {
    describe('activeYear', () => {
      [{
        description: 'return undefined if range is true',
        props: {
          range: true,
        },
        expectedResult: undefined,
      }, {
        description: 'return year from mutableDate by default',
        props: {
          mutableDate: dayjs('2019-01-01'),
        },
        expectedResult: '2019',
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent(props);
          expect(wrapper.vm.activeYear).toEqual(expectedResult);
        });
      });
    });

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
        const years = [...Array(21).keys()].map(i => 2029 - i);
        expect(wrapper.vm.getYears).toEqual(years);
      });
    });
  });

  describe('watch', () => {
    beforeEach(() => {
      jest.spyOn(utilsFunction, 'computeYearsScrollPosition').mockReturnValue(100);
    });

    it('should not scroll for range', () => {
      const wrapper = mountComponent({ active: false, range: true });
      wrapper.setProps({ active: true });

      jest.runOnlyPendingTimers();

      expect(utilsFunction.computeYearsScrollPosition).not.toHaveBeenCalled();
    });

    it('should scroll to year when activate', () => {
      const wrapper = mountComponent({ active: false });

      Object.defineProperties(wrapper.element, {
        scrollTop: { get: () => 100, set: () => 100 },
      }, { writable: true });

      wrapper.setProps({ active: true });

      jest.runOnlyPendingTimers();

      expect(utilsFunction.computeYearsScrollPosition).toHaveBeenCalled();
      expect(wrapper.element.scrollTop).toEqual(100);
    });
  });

  describe('methods', () => {
    describe('isCurrent', () => {
      // todaysDate = new Date([2019, 5, 16]);
      [{
        description: `be TRUE when year is same as today`,
        props: {
          mutableDate: dayjs('2019-5-16'),
        },
        year: 2019,
        expectedResult: true,
      }, {
        description: `be FALSE when year is NOT same as today`,
        props: {
          mutableDate: dayjs('2019-5-16'),
        },
        year: 2020,
        expectedResult: false,
      }].forEach(({ description, props, year, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent(props);
          expect(wrapper.vm.isCurrent(year)).toEqual(expectedResult);
        });
      });
    });

    describe('isSelected', () => {
      it.each([
        [null, 2018, false],
        [dayjs('2018-5-16'), 2018, true],
        [dayjs('2018-5-16'), 2019, false],
      ])(
        'when pickerDate equal %p, and year is %p, should return %p',
        (mutableDate, year, expectedResult) => {
          const wrapper = mountComponent({ mutableDate });
          expect(wrapper.vm.isSelected(year)).toEqual(expectedResult);
        }
      );
    });

    describe('isAllowed', () => {
      const allowedYear = date => parseInt(date, 10) % 2 === 0;

      it.each([
        [{ min: undefined, max: undefined }, 2019, true],
        [{ min: '2018', max: '2020' }, 2019, true],
        [{ min: '2020', max: '2020' }, 2019, false],
        [{ min: '2018', max: '2018' }, 2019, false],
        [{ allowedDates: allowedYear }, 2019, false],
        [{ allowedDates: allowedYear }, 2020, true],
      ])(
        'when allowed dates = %p and year = %p, should return %p',
        (props, year, expectedResult) => {
          const wrapper = mountComponent(props);
          expect(wrapper.vm.isAllowed(year)).toEqual(expectedResult);
        }
      );
    });
  });

  describe('behaviour', () => {
    it('should emit clicked value', () => {
      const wrapper = mountComponent({ active: true });
      const yearButton = wrapper.find('.vd-picker__years-button');

      yearButton.trigger('click');
      expect(wrapper.emitted().input[0]).toEqual([2029, 'year']);
    });
  });
});
