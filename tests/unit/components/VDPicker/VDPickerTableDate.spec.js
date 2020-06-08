import dayjs from 'dayjs';
import mockDate from 'mockdate';
import { mount } from '@vue/test-utils';

import VDPickerTableDate from '@/components/VDPicker/VDPickerTableDate/VDPickerTableDate';

// Functions
import Dates from '@/utils/Dates';

// Tests helpers
import { touch } from '../../../helpers';

// locale
import { en } from '@/locale';

console.error = jest.fn();

beforeEach(() => {
  mockDate.set('2019-5-16');
});

afterEach(() => {
  mockDate.reset();
});

describe('VDPickerTableDate', () => {
  let mountComponent;
  const dummyDate = dayjs('2019-5-16');
  const dummyDateRange = { start: dummyDate, end: undefined };
  const defaultVDPickerProvider = { $scopedSlots: {}, $slots: {} };

  beforeEach(() => {
    mountComponent = ({
      props = {},
      provide = {
        VDPicker: defaultVDPickerProvider,
      },
    } = {}) => {
      const dummyDates = props.range ? dummyDateRange : dummyDate;
      const mutableDate = props.mutableDate || dummyDates;
      const newDate = props.range ? (mutableDate.end || mutableDate.start) : mutableDate;
      const currentDate = new Dates(newDate.month(), newDate.year(), { lang: 'en' });

      return mount(VDPickerTableDate, {
        provide,
        propsData: {
          ...props,
          mutableDate,
          currentDate,
          locale: { lang: en },
        },
        attachToDocument: true,
      });
    };
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('computed', () => {
    describe('classWeeks', () => {
      [{
        description: 'return undefined if yearMonth panel is opened',
        props: {
          mutableDate: dayjs('2018-5-16'),
          shouldShowYearMonthSelector: true,
        },
        expectedResult: undefined,
      }, {
        description: 'return has-5-weeks',
        props: {
          mutableDate: dayjs('2018-5-16'),
        },
        expectedResult: 'has-5-weeks',
      }, {
        description: 'return has-6-weeks',
        props: {
          mutableDate: dayjs('2018-9-16'),
        },
        expectedResult: 'has-6-weeks',
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.classWeeks).toEqual(expectedResult);
        });
      });
    });

    describe('spaceBeforeFirstDay', () => {
      [{
        description: 'return an array of days before 1st month day [0, 1]',
        props: {
          mutableDate: dayjs('2018-5-16'),
        },
        expectedResult: [0, 1],
      }, {
        description: 'return an array of days before 1st month day [0, 1, 2, 3, 4, 5]',
        props: {
          mutableDate: dayjs('2018-9-16'),
        },
        expectedResult: [0, 1, 2, 3, 4, 5],
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.spaceBeforeFirstDay).toEqual(expectedResult);
        });
      });
    });
  });

  describe('methods', () => {
    describe('handleMouseMove', () => {
      let startDate;
      let maxDate;
      let defaultEvent = {
        target: {
          className: 'button',
          tagName: 'BUTTON',
        },
      };
      beforeEach(() => {
        startDate = dayjs('2019-5-15');
        maxDate = dayjs('2019-5-20');
      });

      it('should do nothing if range is false', () => {
        const wrapper = mountComponent();
        wrapper.vm.handleMouseMove(defaultEvent);
        expect(wrapper.vm.rangeCurrentHoveredDay).toEqual(undefined);
      });

      it('should do nothing if mutableDate.end is already defined', () => {
        const wrapper = mountComponent({
          props: {
            range: true,
            mutableDate: { start: startDate, end: maxDate },
            isRangeSelected: true,
          },
        });
        wrapper.vm.handleMouseMove(defaultEvent);
        expect(wrapper.vm.rangeCurrentHoveredDay).toEqual(undefined);
      });

      it('should do nothing if target is days wrapper', () => {
        const wrapper = mountComponent({
          props: {
            range: true,
            mutableDate: { start: startDate, end: undefined },
          },
        });
        wrapper.vm.handleMouseMove({
          target: {
            className: 'vd-picker__table-days',
            tagName: 'DIV',
          },
        });
        expect(wrapper.vm.rangeCurrentHoveredDay).toEqual(undefined);
      });

      it('should check parent if there is no dataset value', () => {
        const wrapper = mountComponent({
          props: {
            range: true,
            mutableDate: { start: startDate, end: undefined },
          },
        });
        wrapper.vm.handleMouseMove({
          target: {
            className: 'vd-picker__table-day-effect',
            dataset: {},
            parentNode: {
              dataset: { date: '2019-5-16' },
            },
          },
        });
        expect(wrapper.vm.rangeCurrentHoveredDay).toEqual('2019-5-16');
      });

      it('should reorder date if hovered day is before or after start', () => {
        const wrapper = mountComponent({
          props: {
            range: true,
            mutableDate: { start: startDate, end: undefined },
            isRangeSelected: false,
          },
        });
        wrapper.vm.handleMouseMove({
          target: {
            className: 'vd-picker__table-day',
            tagName: 'BUTTON',
            dataset: { date: '2019-5-10' },
          },
        });
        expect(wrapper.vm.rangeCurrentHoveredDay).toEqual('2019-5-10');
        expect(wrapper.emitted().reOrderSelectedDate).toBeTruthy();

        wrapper.vm.handleMouseMove({
          target: {
            className: 'vd-picker__table-day',
            tagName: 'BUTTON',
            dataset: { date: '2019-5-16' },
          },
        });
        expect(wrapper.vm.rangeCurrentHoveredDay).toEqual('2019-5-16');
        expect(wrapper.emitted().reOrderSelectedDate).toBeTruthy();
      });

      it('should not mutableDate when hoveredDay is now undefined', () => {
        const wrapper = mountComponent({
          props: {
            range: true,
            mutableDate: { start: startDate, end: undefined },
          },
        });
        wrapper.vm.handleMouseMove({
          target: {
            className: 'vd-picker__table-day',
            tagName: 'BUTTON',
            dataset: { date: '2019-5-10' },
          },
        });
        expect(wrapper.vm.rangeCurrentHoveredDay).toEqual('2019-5-10');
        expect(wrapper.emitted().reOrderSelectedDate).toBeTruthy();

        wrapper.setData({ rangeCurrentHoveredDay: undefined });
        expect(wrapper.emitted().reOrderSelectedDate).toBeTruthy();
      });
    });
  });

  describe('behaviour', () => {
    it('should call select date when click on a day', () => {
      const wrapper = mountComponent();

      const day = wrapper.findAll('.vd-picker__table-day').at(10);
      day.trigger('click');

      expect(wrapper.emitted().selectDate).toBeTruthy();
    });

    describe('swipe gesture', () => {
      it('should change month when swipping table', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.currentDate.month).toBe(4);

        const table = wrapper.findAll('.vd-picker__table').at(0);
        touch(table).start(0, 0).end(20, 0);
        expect(wrapper.emitted().changeMonth[0]).toEqual(['prev']);

        touch(table).start(0, 0).end(-20, 0);
        expect(wrapper.emitted().changeMonth[1]).toEqual(['next']);
      });

      it('[RTL] should change month when swipping table', () => {
        const wrapper = mountComponent({ props: { rtl: true } });
        expect(wrapper.vm.currentDate.month).toBe(4);

        const table = wrapper.findAll('.vd-picker__table').at(0);
        touch(table).start(0, 0).end(20, 0);
        expect(wrapper.emitted().changeMonth[0]).toEqual(['next']);

        touch(table).start(0, 0).end(-20, 0);
        expect(wrapper.emitted().changeMonth[1]).toEqual(['prev']);
      });
    });
  });
});
