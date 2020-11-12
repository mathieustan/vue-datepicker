import dayjs from 'dayjs';
import mockDate from 'mockdate';
import { shallowMount } from '@vue/test-utils';
import VDPickerMonths from '@/components/VDPicker/VDPickerMonths';

// PickerDate Class
import PickerDate from '@/components/VDPicker/utils/PickerDate';

describe('VDPickerMonths', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mockDate.set(dummyDate);
    mountComponent = ({
      active = false,
      date = new PickerDate(dummyDate.month(), dummyDate.year(), { lang: 'en' }),
      max,
      min,
      type = 'day',
      mutableDate,
      range,
      allowedDates,
    } = {}) =>
      shallowMount(VDPickerMonths, {
        propsData: {
          active,
          color: 'color',
          pickerDate: date,
          isVisible: true,
          max,
          min,
          type,
          mutableDate,
          range,
          allowedDates,
          transitionName: 'transitionName',
        },
        mocks: {
          $vuedatepicker: { lang: 'en' },
        },
      });
  });

  afterEach(() => {
    mockDate.reset();
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.vm.transitionName).toEqual('transitionName');
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
    describe('yearFormatted', () => {
      it('should return year with format YYYY', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.yearFormatted).toEqual('2019');
      });
    });

    describe('getMonths', () => {
      it('should return a range of months', () => {
        const wrapper = mountComponent();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        expect(wrapper.vm.getMonths).toEqual(months);
      });
    });
  });

  describe('methods', () => {
    describe('isCurrent', () => {
      // todaysDate = new Date([2019, 5, 16]);
      [{
        description: `be TRUE when month & year are same as today (type: month)`,
        props: {
          mutableDate: dayjs('2019-5-16'),
        },
        monthIndex: 4,
        expectedResult: true,
      }, {
        description: `be FALSE when month & year are NOT same as today (type: month)`,
        props: {
          mutableDate: dayjs('2019-5-16'),
        },
        monthIndex: 5,
        expectedResult: false,
      }].forEach(({ description, props, monthIndex, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent(props);
          expect(wrapper.vm.isCurrent(monthIndex)).toEqual(expectedResult);
        });
      });
    });

    describe('isSelected', () => {
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
          expect(wrapper.vm.isSelected(monthIndex)).toEqual(expectedResult);
        }
      );
    });

    describe('isAllowed', () => {
      const allowedMonths = date => parseInt(date.split('-')[1], 10) % 2 === 0;

      it.each([
        [{ min: undefined, max: undefined }, 4, true],
        [{ min: '2019-1', max: '2019-3' }, 0, true],
        [{ min: '2019-1', max: '2019-3' }, 1, true],
        [{ min: '2019-1', max: '2019-3' }, 2, true],
        [{ min: '2019-1', max: '2019-3' }, 3, false],
        [{ min: '2019-1', max: '2019-3' }, 4, false],
        [{ allowedDates: allowedMonths }, 4, false],
        [{ allowedDates: allowedMonths }, 5, true],
      ])(
        'when allowed dates = %p and mode = %p and monthIndex = %p, should return %p',
        (props, monthIndex, expectedResult) => {
          const wrapper = mountComponent(props);
          expect(wrapper.vm.isAllowed(monthIndex)).toEqual(expectedResult);
        }
      );
    });

  });

  describe('behaviour', () => {
    describe('behaviour', () => {
      it('should emit clicked value', () => {
        const wrapper = mountComponent({ active: true });
        const button = wrapper.find('.vd-picker__months-button');

        button.trigger('click');
        expect(wrapper.emitted().input[0]).toEqual([0, 'month']);
      });
    });
  });

});
