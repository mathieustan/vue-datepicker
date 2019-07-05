import dayjs from 'dayjs';
import * as bodyScrollLockFunctions from 'body-scroll-lock';
import mockDate from 'mockdate';
import { shallowMount } from '@vue/test-utils';
import DatePicker from '@/components/datepicker/DatePicker.vue';

import {
  DEFAULT_INPUT_DATE_FORMAT,
  DEFAULT_HEADER_DATE_FORMAT,
  DEFAULT_OUTPUT_DATE_FORMAT,
} from '@/constants';

jest.mock('body-scroll-lock', () => ({
  clearAllBodyScrollLocks: jest.fn(),
}));

beforeEach(() => {
  mockDate.set(new Date([2019, 5, 16]));
});

afterEach(() => {
  mockDate.reset();
});

describe('DatePicker', () => {
  let mountComponent;
  const dummyDate = new Date([2019, 5, 16]);
  const dummyDateEnd = new Date([2019, 5, 17]);

  beforeEach(() => {
    mountComponent = ({
      date,
      disabled = false,
      format,
      formatHeader,
      formatOutput,
      type = 'date',
      range,
    } = {}) =>
      shallowMount(DatePicker, {
        propsData: {
          value: date,
          disabled,
          format,
          formatHeader,
          formatOutput,
          type,
          range,
        },
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.date).toEqual(undefined);
    expect(wrapper.vm.isVisible).toEqual(false);
    expect(wrapper.vm.placeholder).toEqual('YYYY-MM-DD');
    expect(wrapper.vm.color).toEqual('#4f88ff');
    expect(wrapper.vm.minDate).toEqual(undefined);
    expect(wrapper.vm.endDate).toEqual(undefined);
    expect(wrapper.vm.disabled).toEqual(false);
    expect(wrapper.vm.inline).toEqual(false);
    expect(wrapper.vm.fullscreenMobile).toEqual(false);
  });

  describe('computed', () => {
    describe('inputFormat', () => {
      it.each([
        [undefined, DEFAULT_INPUT_DATE_FORMAT.date],
        ['YYYY-MM-DD', 'YYYY-MM-DD'],
      ])('when format equal %p, should return %p', (format, expectedResult) => {
        const wrapper = mountComponent({ format });
        expect(wrapper.vm.inputFormat).toEqual(expectedResult);
      });
    });

    describe('headerFormat', () => {
      it.each([
        [undefined, DEFAULT_HEADER_DATE_FORMAT.date],
        ['MMMM MM', 'MMMM MM'],
      ])('when format equal %p, should return %p', (formatHeader, expectedResult) => {
        const wrapper = mountComponent({ formatHeader });
        expect(wrapper.vm.headerFormat).toEqual(expectedResult);
      });
    });

    describe('outputFormat', () => {
      it.each([
        [undefined, DEFAULT_OUTPUT_DATE_FORMAT.date],
        ['YYYY-MM', 'YYYY-MM'],
      ])('when format equal %p, should return %p', (formatOutput, expectedResult) => {
        const wrapper = mountComponent({ formatOutput });
        expect(wrapper.vm.outputFormat).toEqual(expectedResult);
      });
    });
  });

  describe('watch', () => {
    describe('value', () => {
      it.each([
        [
          { date: { start: dummyDate, end: undefined }, range: true },
          { start: dayjs(dummyDate, DEFAULT_OUTPUT_DATE_FORMAT.date), end: undefined },
        ],
        [
          { date: { start: dummyDate, end: dummyDateEnd }, range: true },
          {
            start: dayjs(dummyDate, DEFAULT_OUTPUT_DATE_FORMAT.date),
            end: dayjs(dummyDateEnd, DEFAULT_OUTPUT_DATE_FORMAT.date),
          },
        ],
        [{ date: dummyDate }, dayjs(dummyDate, DEFAULT_OUTPUT_DATE_FORMAT.date)],
        [{ date: undefined }, undefined],
      ])('when props equal %p, date should be equal to %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.date).toEqual(expectedResult);
      });
    });
  });

  describe('beforeDestroy', () => {
    it('should emit destroy event && hide datepicker', () => {
      const wrapper = mountComponent();
      wrapper.setData({ isVisible: true });

      wrapper.destroy();
      expect(wrapper.vm.isVisible).toEqual(false);
      expect(wrapper.emitted().onDestroy).toBeTruthy();
    });
  });

  describe('methods', () => {
    describe('toggleDatepicker', () => {
      it('should not show datepicker if disabled', () => {
        const wrapper = mountComponent({ disabled: true });
        expect(wrapper.vm.isVisible).toEqual(false);

        wrapper.vm.toggleDatepicker();
        expect(wrapper.vm.isVisible).toEqual(false);
      });

      it('should set isVisible to true', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.isVisible).toEqual(false);

        wrapper.vm.toggleDatepicker();
        expect(wrapper.vm.isVisible).toEqual(true);
      });

      it('should set isVisible to false iff already open', () => {
        const wrapper = mountComponent();
        wrapper.setData({ isVisible: true });

        wrapper.vm.toggleDatepicker();
        expect(wrapper.vm.isVisible).toEqual(false);
      });
    });

    describe('showDatePicker', () => {
      it('should set isVisible to true', () => {
        const wrapper = mountComponent();
        wrapper.setData({ isVisible: false });

        wrapper.vm.showDatePicker();
        expect(wrapper.vm.isVisible).toEqual(true);
        expect(wrapper.emitted().onOpen).toBeTruthy();
      });

      it('should do nothing if disabled', () => {
        const wrapper = mountComponent({ disabled: true });
        wrapper.setData({ isVisible: false });

        wrapper.vm.showDatePicker();
        expect(wrapper.vm.isVisible).toEqual(false);
        expect(wrapper.emitted().onOpen).toBeFalsy();
      });
    });

    describe('hideDatePicker', () => {
      it('should set isVisible to false', () => {
        const wrapper = mountComponent();
        wrapper.setData({ isVisible: true });

        wrapper.vm.hideDatePicker();
        expect(wrapper.vm.isVisible).toEqual(false);
        expect(bodyScrollLockFunctions.clearAllBodyScrollLocks).toHaveBeenCalled();
        expect(wrapper.emitted().onClose).toBeTruthy();
      });

      it('should do nothing if datepicker isn\'t opened', () => {
        const wrapper = mountComponent();
        wrapper.setData({ isVisible: false });

        wrapper.vm.hideDatePicker();
        expect(wrapper.vm.isVisible).toEqual(false);
        expect(bodyScrollLockFunctions.clearAllBodyScrollLocks).not.toHaveBeenCalled();
        expect(wrapper.emitted().onClose).toBeFalsy();
      });
    });

    describe('changeDate', () => {
      it('should update date', () => {
        const wrapper = mountComponent();
        wrapper.vm.changeDate(dayjs(new Date([2019, 5, 18])));
        expect(wrapper.vm.date.format('YYYY-MM-DD')).toEqual('2019-05-18');
        expect(wrapper.emitted().input[0]).toEqual(['2019-05-18']);
        expect(wrapper.emitted().onChange).toBeTruthy();
      });

      it('should update dates when range is active', () => {
        const wrapper = mountComponent({ range: true });
        const dates = {
          start: dayjs(dummyDate),
          end: dayjs(dummyDateEnd),
        };
        wrapper.vm.changeDate(dates);
        expect(wrapper.vm.date).toEqual(dates);

        expect(wrapper.emitted().input[0]).toEqual([{ start: '2019-05-16', end: '2019-05-17' }]);
        expect(wrapper.emitted().onChange).toBeTruthy();
      });
    });
  });
});
