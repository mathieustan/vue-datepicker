import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import VDPickerQuarters from '@/components/VDPicker/VDPickerQuarters';

// PickerDate Class
import PickerDate from '@/components/VDPicker/utils/PickerDate';

describe('VDPickerQuarters', () => {
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
    } = {}) =>
      shallowMount(VDPickerQuarters, {
        propsData: {
          active,
          color: 'color',
          pickerDate: date,
          isVisible: true,
          max,
          min,
          mutableDate,
          allowedDates,
          transitionName: 'transitionName',
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

  describe('methods', () => {
    describe('isSelected', () => {
      it.each([
        [{ mutableDate: undefined }, 1, false],
        [{ mutableDate: dayjs(new Date([2019, 5, 16])) }, 4, true],
        [{ mutableDate: dayjs(new Date([2018, 5, 16])) }, 4, false],
        [{ mutableDate: dayjs(new Date([2019, 5, 16])) }, 12, false],
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
        [{ min: '2019-1', max: '2019-3' }, 0, true],
        [{ min: '2019-1', max: '2019-3' }, 1, true],
        [{ min: '2019-1', max: '2019-3' }, 2, true],
        [{ min: '2019-1', max: '2019-3' }, 3, false],
        [{ min: '2019-1', max: '2019-3' }, 4, false],
        [{ min: '2019-2', max: '2019-3' }, 5, false],
        [{ allowedDates: allowedMonths }, 2, false],
        [{ allowedDates: allowedMonths }, 3, true],
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
    it('should emit clicked value', () => {
      const wrapper = mountComponent({ active: true });
      const button = wrapper.find('.vd-picker__quarters-button');

      button.trigger('click');
      expect(wrapper.emitted().input[0]).toEqual([0, 'quarter']);
    });
  });
});
