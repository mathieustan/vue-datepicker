import dayjs from 'dayjs';
import mockDate from 'mockdate';
import { mount } from '@vue/test-utils';

import VDPickerTableDay from '@/components/VDPicker/VDPickerTableDay';

beforeEach(() => {
  mockDate.set('2019-5-16');
});

afterEach(() => {
  mockDate.reset();
});

describe('VDPickerTableDay', () => {
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
      const day = props.day || dummyDate;

      return mount(VDPickerTableDay, {
        provide,
        propsData: {
          ...props,
          mutableDate,
          day,
        },
        mocks: {
          $vuedatepicker: { lang: 'en' },
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
    describe('isSelected', () => {
      [{
        description: 'return true if selected date equals mutableDate',
        props: {
          mutableDate: dayjs('2018-5-16'),
          day: dayjs('2018-5-16'),
        },
        expectedResult: true,
      }, {
        description: 'return false',
        props: {
          mutableDate: dayjs('2018-5-16'),
          day: dayjs('2018-5-17'),
        },
        expectedResult: false,
      }, {
        description: 'return true if any dates in range equals mutableDate',
        props: {
          mutableDate: {
            start: dayjs('2018-5-16'), end: undefined,
          },
          range: true,
          day: dayjs('2018-5-16'),
        },
        expectedResult: true,
      }, {
        description: 'return false if any dates in range NOT equals mutableDate',
        props: {
          mutableDate: {
            start: dayjs('2018-5-16'), end: undefined,
          },
          range: true,
          day: dayjs('2018-5-17'),
        },
        expectedResult: false,
      }, {
        description: 'return true if any dates in range',
        props: {
          mutableDate: {
            start: dayjs('2018-5-16'), end: dayjs('2018-5-17'),
          },
          range: true,
          day: dayjs('2018-5-17'),
        },
        expectedResult: true,
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.isSelected).toEqual(expectedResult);
        });
      });
    });

    describe('isBetween', () => {
      [{
        description: 'not be between if selected day & day are the same',
        props: {
          mutableDate: dayjs('2018-5-16'),
          day: dayjs('2018-5-16'),
          range: true,
        },
        expectedResult: false,
      }, {
        description: 'not be between if day is after range',
        props: {
          mutableDate: { start: dayjs('2018-5-16'), end: dayjs('2018-5-17') },
          day: dayjs('2018-5-18'),
          range: true,
        },
        expectedResult: false,
      }, {
        description: 'not between if day is between range',
        props: {
          mutableDate: { start: dayjs('2018-5-16'), end: dayjs('2018-5-20') },
          day: dayjs('2018-5-18'),
          range: true,
        },
        expectedResult: true,
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.isBetween).toEqual(expectedResult);
        });
      });
    });

    describe('isInRange', () => {
      [{
        description: 'not be in range when there is no hovered day',
        props: {
          day: dayjs('2018-5-16'),
          mutableDate: undefined,
          range: true,
          rangeCurrentHoveredDay: undefined,
        },
        expectedResult: false,
      }, {
        description: 'not be in range if day is after hovered day',
        props: {
          day: dayjs('2018-5-16'),
          mutableDate: { start: dayjs('2018-5-10'), end: undefined },
          range: true,
          rangeCurrentHoveredDay: '2018-5-15',
        },
        expectedResult: false,
      }, {
        description: 'be in range if day is before hovered day',
        props: {
          day: dayjs('2018-5-17'),
          mutableDate: { start: dayjs('2018-5-10'), end: undefined },
          range: true,
          rangeCurrentHoveredDay: '2018-5-18',
        },
        expectedResult: true,
      }, {
        description: 'be in range if day is before hovered day (even if selected day is end date)',
        props: {
          day: dayjs('2018-5-17'),
          mutableDate: { start: undefined, end: dayjs('2018-5-20') },
          range: true,
          rangeCurrentHoveredDay: '2018-5-15',
        },
        expectedResult: true,
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.isInRange).toEqual(expectedResult);
        });
      });
    });

    describe('firstInRange', () => {
      [{
        description: 'should be true if day is the same as start date selected',
        props: {
          mutableDate: { start: dayjs('2018-5-16'), end: undefined },
          range: true,
          day: dayjs('2018-5-16'),
        },
        expectedResult: true,
      }, {
        description: 'should be false if day is different than start date selected',
        props: {
          mutableDate: { start: dayjs('2018-5-17'), end: undefined },
          range: true,
          day: dayjs('2018-5-16'),
        },
        expectedResult: false,
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.firstInRange).toEqual(expectedResult);
        });
      });
    });

    describe('lastInRange', () => {
      [{
        description: 'should be true if day is the same as end date selected',
        props: {
          mutableDate: { start: dayjs('2018-5-16'), end: dayjs('2018-5-19') },
          range: true,
          day: dayjs('2018-5-19'),
        },
        expectedResult: true,
      }, {
        description: 'should be false if day is different than end date selected',
        props: {
          mutableDate: { start: dayjs('2018-5-17'), end: dayjs('2018-5-19') },
          range: true,
          day: dayjs('2018-5-17'),
        },
        expectedResult: false,
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.lastInRange).toEqual(expectedResult);
        });
      });
    });

    describe('isDisabled', () => {
      [{
        description: 'not be disabled by default',
        props: {
          minDate: undefined,
          maxDate: undefined,
          day: dayjs('2018-5-16'),
        },
        expectedResult: false,
      }, {
        description: 'not be disabled if day is not before minDate or after maxDate',
        props: {
          minDate: '2018-5-10',
          maxDate: '2018-5-20',
          day: dayjs('2018-5-16'),
        },
        expectedResult: false,
      }, {
        description: 'be disabled if day is before minDate',
        props: {
          minDate: '2018-5-20',
          maxDate: undefined,
          day: dayjs('2018-5-8'),
        },
        expectedResult: true,
      }, {
        description: 'be disabled if day is after maxDate',
        props: {
          minDate: undefined,
          maxDate: '2018-5-20',
          day: dayjs('2018-5-22'),
        },
        expectedResult: true,
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.isDisabled).toEqual(expectedResult);
        });
      });
    });

    describe('isCurrent', () => {
      [{
        description: 'be true if day is the same as today\'s date',
        props: {
          day: dayjs('2019-5-16'),
        },
        expectedResult: true,
      }, {
        description: 'be false if day is the different from today\'s date',
        props: {
          day: dayjs('2019-5-17'),
        },
        expectedResult: false,
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.isCurrent).toEqual(expectedResult);
        });
      });
    });
  });

  describe('behaviour', () => {
    it('should emit new day when click on it', () => {
      const wrapper = mountComponent();

      wrapper.trigger('click');
      expect(wrapper.emitted()['select-day']).toBeTruthy();
    });
  });
});
