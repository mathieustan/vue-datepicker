import dayjs from 'dayjs';
import mockDate from 'mockdate';
import { shallowMount } from '@vue/test-utils';
import DatePickerAgenda from '@/components/DatePickerAgenda.vue';

jest.useFakeTimers();

beforeEach(() => {
  mockDate.set(new Date([2019, 5, 16]));
});

afterEach(() => {
  mockDate.reset();
});

describe('DatePickerAgenda', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({
      date = dummyDate,
      locale = { days: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] },
    } = {}) =>
      shallowMount(DatePickerAgenda, {
        propsData: {
          date,
          locale,
          color: 'color',
          close: jest.fn(),
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
    expect(wrapper.vm.isVisible).toEqual(false);
    expect(wrapper.vm.locale).toEqual({ days: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] });
    expect(wrapper.vm.color).toEqual('color');
    expect(wrapper.vm.close).toEqual(expect.any(Function));

    expect(wrapper.vm.currentDate).toEqual({
      start: dummyDate.startOf('month'),
      end: dummyDate.endOf('month'),
      month: 4,
      year: 2019,
    });
    expect(wrapper.vm.mutableDate).toEqual(dummyDate);
  });

  describe('computed', () => {
    describe('year', () => {
      it('should return date formatted', () => {
        const wrapper = mountComponent({ date: dayjs(new Date([2018, 5, 16])) });
        expect(wrapper.vm.year).toEqual('2018');
      });
    });

    describe('dateFormatted', () => {
      it('should return dateFormatted for header', () => {
        const wrapper = mountComponent({ date: dayjs(new Date([2018, 5, 16])) });
        expect(wrapper.vm.dateFormatted).toEqual('Wednesday 16 May');
      });
    });

    describe('monthFormatted', () => {
      it('should return month with format MMMM', () => {
        const wrapper = mountComponent({ date: dayjs(new Date([2018, 5, 16])) });
        expect(wrapper.vm.monthFormatted).toEqual('May');
      });
    });

    describe('yearFormatted', () => {
      it('should return year with format YYYY', () => {
        const wrapper = mountComponent({ date: dayjs(new Date([2018, 5, 16])) });
        expect(wrapper.vm.yearFormatted).toEqual('2018');
      });
    });

    describe('classWeeks', () => {
      it.each([
        [dayjs(new Date([2018, 5, 16])), 'has-5-weeks'],
        [dayjs(new Date([2018, 9, 16])), 'has-6-weeks'],
      ])('when date equal %p, should return %p', (date, expectedResult) => {
        const wrapper = mountComponent({ date });
        expect(wrapper.vm.classWeeks).toEqual(expectedResult);
      });
    });
  });

  describe('methods', () => {
    describe('isSelected', () => {
      it.each([
        [dayjs(new Date([2018, 5, 16])), dayjs(new Date([2018, 5, 16])), true],
        [dayjs(new Date([2018, 9, 16])), dayjs(new Date([2018, 5, 17])), false],
      ])(
        'when currentDate equal %p, and selected date is %p, should return %p',
        (date, selectedDate, expectedResult) => {
          const wrapper = mountComponent({ date });
          expect(wrapper.vm.isSelected(selectedDate)).toEqual(expectedResult);
        }
      );
    });

    describe('isToday', () => {
      it.each([
        [dayjs(new Date([2019, 5, 16])), true],
        [dayjs(new Date([2019, 9, 16])), false],
      ])(
        'when currentDate equal %p, should return %p',
        (selectedDate, expectedResult) => {
          const wrapper = mountComponent();
          expect(wrapper.vm.isToday(selectedDate)).toEqual(expectedResult);
        }
      );
    });

    describe('selectDate', () => {
      it('Should send an event with selected date', () => {
        const wrapper = mountComponent();
        const newDate = dayjs(new Date([2019, 9, 16]));
        wrapper.vm.selectDate(newDate);

        expect(wrapper.vm.mutableDate).toEqual(newDate);
        expect(wrapper.emitted().selectDate).toBeTruthy();
        expect(wrapper.vm.close).toHaveBeenCalled();
      });
    });

    describe('nextMonth', () => {
      it.each([
        [dummyDate, {
          start: dummyDate.add(1, 'month').startOf('month'),
          end: dummyDate.add(1, 'month').endOf('month'),
          month: 5,
          year: 2019,
        }],
        [dayjs(new Date([2019, 12, 16])), {
          start: dayjs(new Date([2019, 12, 16])).add(1, 'month').startOf('month'),
          end: dayjs(new Date([2019, 12, 16])).add(1, 'month').endOf('month'),
          month: 0,
          year: 2020,
        }],
      ])('Should update dates to next month', (date, expectedResult) => {
        const wrapper = mountComponent({ date });
        wrapper.vm.nextMonth();

        expect(wrapper.vm.transitionDaysName).toEqual('slide-h-next');
        expect(wrapper.vm.transitionLabelName).toEqual('slide-v-next');
        expect(wrapper.vm.currentDate).toEqual(expectedResult);
      });
    });

    describe('prevMonth', () => {
      it.each([
        [dummyDate, {
          start: dummyDate.subtract(1, 'month').startOf('month'),
          end: dummyDate.subtract(1, 'month').endOf('month'),
          month: 3,
          year: 2019,
        }],
        [dayjs(new Date([2019, 1, 16])), {
          start: dayjs(new Date([2019, 1, 16])).subtract(1, 'month').startOf('month'),
          end: dayjs(new Date([2019, 1, 16])).subtract(1, 'month').endOf('month'),
          month: 11,
          year: 2018,
        }],
      ])('Should update dates to next month', (date, expectedResult) => {
        const wrapper = mountComponent({ date });
        wrapper.vm.prevMonth();

        expect(wrapper.vm.transitionDaysName).toEqual('slide-h-prev');
        expect(wrapper.vm.transitionLabelName).toEqual('slide-v-prev');
        expect(wrapper.vm.currentDate).toEqual(expectedResult);
      });
    });
  });
});
