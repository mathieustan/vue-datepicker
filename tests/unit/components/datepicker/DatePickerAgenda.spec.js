import dayjs from 'dayjs';
import mockDate from 'mockdate';
import { shallowMount } from '@vue/test-utils';
import DatePickerAgenda from '@/components/datepicker/DatePickerAgenda.vue';

import * as utilsFunctions from '@/utils/positions';

console.error = jest.fn();

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
    jest.spyOn(utilsFunctions, 'getDynamicPosition').mockReturnValue({
      top: 0,
      left: 0,
      origin: 'origin',
    });
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation(cb => cb());

    mountComponent = ({
      date = dummyDate,
      minDate,
      endDate,
      locale = { lang: 'en' },
      isVisible = true,
      inline = false,
      type = 'date',
    } = {}) =>
      shallowMount(DatePickerAgenda, {
        propsData: {
          date,
          minDate,
          endDate,
          isVisible,
          inline,
          locale,
          color: 'color',
          close: jest.fn(),
          type,
        },
        attachToDocument: true,
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.isVisible).toEqual(true);
    expect(wrapper.vm.locale).toEqual({ lang: 'en' });
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
    describe('classWeeks', () => {
      it.each([
        [dayjs(new Date([2018, 5, 16])), 'has-5-weeks'],
        [dayjs(new Date([2018, 9, 16])), 'has-6-weeks'],
      ])('when date equal %p, should return %p', (date, expectedResult) => {
        const wrapper = mountComponent({ date });
        expect(wrapper.vm.classWeeks).toEqual(expectedResult);
      });
    });

    describe('spaceBeforeFirstDay', () => {
      it.each([
        [dayjs(new Date([2018, 5, 16])), [0, 1]],
        [dayjs(new Date([2018, 9, 16])), [0, 1, 2, 3, 4, 5]],
      ])(
        'when date equal %p, should return %p (amount of days before month start)',
        (date, expectedResult) => {
          const wrapper = mountComponent({ date });
          expect(wrapper.vm.spaceBeforeFirstDay).toEqual(expectedResult);
        }
      );
    });

    describe('shouldShowAgenda', () => {
      it.each([
        [{ isVisible: true, inline: false }, true],
        [{ isVisible: false, inline: true }, true],
        [{ isVisible: false, inline: false }, false],
      ])('when props equal %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.shouldShowAgenda).toEqual(expectedResult);
      });
    });
  });

  describe('watch', () => {
    describe('date', () => {
      it('should update currentDate & mutableDate when date change', () => {
        const wrapper = mountComponent({ isVisible: false, inline: true });
        const newDate = dummyDate.add(1, 'day');

        expect(wrapper.vm.currentDate).toEqual({
          start: dummyDate.startOf('month'),
          end: dummyDate.endOf('month'),
          month: 4,
          year: 2019,
        });
        expect(wrapper.vm.mutableDate).toEqual(dummyDate);

        wrapper.setProps({ date: newDate });

        expect(wrapper.vm.currentDate).toEqual({
          start: newDate.startOf('month'),
          end: newDate.endOf('month'),
          month: 4,
          year: 2019,
        });
        expect(wrapper.vm.mutableDate).toEqual(newDate);
      });
    });

    describe('shouldShowAgenda', () => {
      it('should init currentDate & mutableDate if isVisible equal true', async () => {
        const wrapper = mountComponent({ isVisible: false });
        jest.spyOn(wrapper.vm, 'initDetach').mockReturnValue(true);
        jest.spyOn(wrapper.vm, 'initResizeListener').mockReturnValue(true);
        jest.spyOn(wrapper.vm, 'updatePosition').mockReturnValue(true);

        expect(wrapper.vm.currentDate).toEqual(undefined);
        expect(wrapper.vm.mutableDate).toEqual(undefined);

        wrapper.setProps({ isVisible: true });

        expect(wrapper.vm.currentDate).toEqual({
          start: dummyDate.startOf('month'),
          end: dummyDate.endOf('month'),
          month: 4,
          year: 2019,
        });
        expect(wrapper.vm.mutableDate).toEqual(dummyDate);

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.initDetach).toHaveBeenCalled();
        expect(wrapper.vm.initResizeListener).toHaveBeenCalled();
        expect(wrapper.vm.updatePosition).toHaveBeenCalled();
      });

      it('should not update position if inline equal true', async () => {
        const wrapper = mountComponent({ isVisible: false, inline: false });
        jest.spyOn(wrapper.vm, 'initDetach').mockReturnValue(true);
        jest.spyOn(wrapper.vm, 'initResizeListener').mockReturnValue(true);
        jest.spyOn(wrapper.vm, 'updatePosition').mockReturnValue(true);

        expect(wrapper.vm.currentDate).toEqual(undefined);
        expect(wrapper.vm.mutableDate).toEqual(undefined);

        wrapper.setProps({ inline: true });

        expect(wrapper.vm.currentDate).toEqual({
          start: dummyDate.startOf('month'),
          end: dummyDate.endOf('month'),
          month: 4,
          year: 2019,
        });
        expect(wrapper.vm.mutableDate).toEqual(dummyDate);

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.initDetach).not.toHaveBeenCalled();
        expect(wrapper.vm.initResizeListener).not.toHaveBeenCalled();
        expect(wrapper.vm.updatePosition).not.toHaveBeenCalled();
      });

      it('should reset if isVisible equal false', () => {
        const wrapper = mountComponent({ isVisible: true });

        wrapper.setData({
          isActive: true,
          transitionDaysName: 'test',
          transitionLabelName: 'test',
          shouldShowYearMonthSelector: true,
          yearMonthMode: 'month',
        });

        wrapper.setProps({ isVisible: false });
        expect(wrapper.vm.isActive).toEqual(false);
        expect(wrapper.vm.transitionDaysName).toEqual('slide-h-next');
        expect(wrapper.vm.transitionLabelName).toEqual('slide-v-next');
        expect(wrapper.vm.shouldShowYearMonthSelector).toEqual(undefined);
        expect(wrapper.vm.yearMonthMode).toEqual(undefined);
      });

    });

    describe('type', () => {
      it('should init shouldShowYearMonthSelector && yearMonthMode from type', () => {
        const wrapper = mountComponent({ type: 'month' });
        expect(wrapper.vm.shouldShowYearMonthSelector).toEqual(true);
        expect(wrapper.vm.yearMonthMode).toEqual('month');

        wrapper.setProps({ type: 'date' });
        expect(wrapper.vm.shouldShowYearMonthSelector).toEqual(false);
        expect(wrapper.vm.yearMonthMode).toEqual('date');
      });

      it('should init shouldShowYearMonthSelector && yearMonthMode from type', () => {
        const wrapper = mountComponent({ type: 'date' });
        expect(wrapper.vm.shouldShowYearMonthSelector).toEqual(false);
        expect(wrapper.vm.yearMonthMode).toEqual('date');

        wrapper.setProps({ type: 'month' });
        expect(wrapper.vm.shouldShowYearMonthSelector).toEqual(true);
        expect(wrapper.vm.yearMonthMode).toEqual('month');
      });
    });
  });

  describe('methods', () => {
    describe('setActive', () => {
      it('should update isActive to true', () => {
        const wrapper = mountComponent();
        wrapper.vm.setActive();
        expect(wrapper.vm.isActive).toEqual(true);
      });
    });

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

    describe('isDisabled', () => {
      it.each([
        [{ minDate: undefined, endDate: undefined }, dayjs(new Date([2018, 5, 16])), false],
        [{ minDate: '2018-5-1', endDate: '2018-5-20' }, dayjs(new Date([2018, 5, 16])), false],
        [{ minDate: '2018-5-17', endDate: '2018-5-20' }, dayjs(new Date([2018, 5, 16])), true],
        [{ minDate: '2018-5-1', endDate: '2018-5-15' }, dayjs(new Date([2018, 5, 16])), true],
      ])(
        'when currentDate equal %p, and selected date is %p, should return %p',
        (allowedDates, selectedDate, expectedResult) => {
          const { minDate, endDate } = allowedDates;
          const wrapper = mountComponent({ minDate, endDate });
          expect(wrapper.vm.isDisabled(selectedDate)).toEqual(expectedResult);
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
      it('Should send an event with selected date & update transition with next', () => {
        const wrapper = mountComponent();
        jest.spyOn(wrapper.vm, 'updateTransitions');
        const newDate = dayjs(new Date([2019, 9, 16]));
        wrapper.vm.selectDate(newDate);

        expect(wrapper.vm.updateTransitions).toHaveBeenCalledWith('next');
        expect(wrapper.vm.mutableDate).toEqual(newDate);
        expect(wrapper.emitted().selectDate).toBeTruthy();
        expect(wrapper.vm.close).toHaveBeenCalled();
      });

      it('Should send an event with selected date & update transaction with prev', () => {
        const wrapper = mountComponent();
        jest.spyOn(wrapper.vm, 'updateTransitions');
        const newDate = dayjs(new Date([2019, 4, 16]));
        wrapper.vm.selectDate(newDate);

        expect(wrapper.vm.updateTransitions).toHaveBeenCalledWith('prev');
        expect(wrapper.vm.mutableDate).toEqual(newDate);
        expect(wrapper.emitted().selectDate).toBeTruthy();
        expect(wrapper.vm.close).toHaveBeenCalled();
      });
    });

    describe('updateDate', () => {
      it('Should update currentDate & mutableDate for MONTH mode', () => {
        const newDate = dayjs('2019-04', 'YYYY-MM');
        const wrapper = mountComponent({
          isVisible: false,
          inline: true,
          type: 'month',
        });

        wrapper.vm.updateDate(newDate);
        expect(wrapper.vm.currentDate).toEqual({
          start: newDate.startOf('month'),
          end: newDate.endOf('month'),
          month: 3,
          year: 2019,
        });
        expect(wrapper.vm.mutableDate).toEqual(newDate);
      });

      it('Should update currentDate & mutableDate for QUARTER mode', () => {
        const newDate = dayjs('2019-2', 'YYYY-Q');
        const wrapper = mountComponent({
          isVisible: false,
          inline: true,
          type: 'quarter',
        });

        wrapper.vm.updateDate(newDate);
        expect(wrapper.vm.currentDate).toEqual({
          start: newDate.month(3).startOf('month'),
          end: newDate.month(3).endOf('month'),
          month: 3,
          year: 2019,
        });
        expect(wrapper.vm.mutableDate).toEqual(newDate.month(3));
      });
    });

    describe('changeMonth', () => {
      it.each([
        ['next', dummyDate, {
          start: dummyDate.add(1, 'month').startOf('month'),
          end: dummyDate.add(1, 'month').endOf('month'),
          month: 5,
          year: 2019,
        }],
        ['next', dayjs(new Date([2019, 12, 16])), {
          start: dayjs(new Date([2019, 12, 16])).add(1, 'month').startOf('month'),
          end: dayjs(new Date([2019, 12, 16])).add(1, 'month').endOf('month'),
          month: 0,
          year: 2020,
        }],
        ['prev', dummyDate, {
          start: dummyDate.subtract(1, 'month').startOf('month'),
          end: dummyDate.subtract(1, 'month').endOf('month'),
          month: 3,
          year: 2019,
        }],
        ['prev', dayjs(new Date([2019, 1, 16])), {
          start: dayjs(new Date([2019, 1, 16])).subtract(1, 'month').startOf('month'),
          end: dayjs(new Date([2019, 1, 16])).subtract(1, 'month').endOf('month'),
          month: 11,
          year: 2018,
        }],
      ])(
        'When direction is %p, date equal %p, currentDate should be %p',
        (direction, date, expectedResult) => {
          const wrapper = mountComponent({ date });
          wrapper.vm.changeMonth(direction);

          expect(wrapper.vm.transitionDaysName).toEqual(`slide-h-${direction}`);
          expect(wrapper.vm.transitionLabelName).toEqual(`slide-v-${direction}`);
          expect(wrapper.vm.currentDate).toEqual(expectedResult);
        }
      );
    });

    describe('changeYear', () => {
      it.each([
        ['next', dummyDate, {
          start: dummyDate.add(1, 'year').startOf('month'),
          end: dummyDate.add(1, 'year').endOf('month'),
          month: 4,
          year: 2020,
        }],
        ['prev', dummyDate, {
          start: dummyDate.subtract(1, 'year').startOf('month'),
          end: dummyDate.subtract(1, 'year').endOf('month'),
          month: 4,
          year: 2018,
        }],
      ])(
        'When direction is %p, date equal %p, currentDate should be %p',
        (direction, date, expectedResult) => {
          const wrapper = mountComponent({ date });
          wrapper.vm.changeYear(direction);

          expect(wrapper.vm.transitionDaysName).toEqual(`slide-h-${direction}`);
          expect(wrapper.vm.transitionLabelName).toEqual(`slide-v-${direction}`);
          expect(wrapper.vm.currentDate).toEqual(expectedResult);
        }
      );
    });

    describe('updateTransitions', () => {
      it.each([
        ['next', 'slide-h-next', 'slide-v-next'],
        ['prev', 'slide-h-prev', 'slide-v-prev'],
      ])('Should update transition names', (direction, daysName, labelName) => {
        const wrapper = mountComponent();
        wrapper.vm.updateTransitions(direction);

        expect(wrapper.vm.transitionDaysName).toEqual(daysName);
        expect(wrapper.vm.transitionLabelName).toEqual(labelName);
      });
    });

    describe('showYearMonthSelector', () => {
      it('Should set yearMonth mode & show selector', () => {
        const wrapper = mountComponent();
        wrapper.vm.showYearMonthSelector('year');

        expect(wrapper.vm.yearMonthMode).toEqual('year');
        expect(wrapper.vm.shouldShowYearMonthSelector).toBeTruthy();
      });
    });

    describe('hideYearMonthSelector', () => {
      it('Should close yearMonth selector & reset state', () => {
        const wrapper = mountComponent();
        wrapper.setData({ yearMonthMode: 'month', shouldShowYearMonthSelector: true });

        wrapper.vm.hideYearMonthSelector();

        expect(wrapper.vm.yearMonthMode).toEqual(undefined);
        expect(wrapper.vm.shouldShowYearMonthSelector).toBeFalsy();
      });
    });

    describe('selectedYearMonth', () => {
      it.each([
        ['date', 2018, 'year', {
          start: dummyDate.set('year', 2018).startOf('month'),
          end: dummyDate.set('year', 2018).endOf('month'),
          month: 4,
          year: 2018,
        }],
        ['month', 2018, 'year', {
          start: dummyDate.set('year', 2018).startOf('month'),
          end: dummyDate.set('year', 2018).endOf('month'),
          month: 4,
          year: 2018,
        }],
        [undefined, 2, 'month', {
          start: dummyDate.set('month', 2).startOf('month'),
          end: dummyDate.set('month', 2).endOf('month'),
          month: 2,
          year: 2019,
        }],
      ])(
        'When value selected is %p, mode equal %p, currentDate should equal %p',
        (type, value, mode, expectedResult) => {
          const wrapper = mountComponent({ type });
          jest.spyOn(wrapper.vm, 'hideYearMonthSelector');
          wrapper.vm.selectedYearMonth(value, mode);

          expect(wrapper.vm.currentDate).toEqual(expectedResult);
          expect(wrapper.vm.yearMonthMode).toEqual(type === 'date' ? 'month' : type);

          if (mode === 'month') {
            expect(wrapper.vm.hideYearMonthSelector).toHaveBeenCalled();
          }
        }
      );

      it('should update selected date when type is month', () => {
        const wrapper = mountComponent({ type: 'month' });
        jest.spyOn(wrapper.vm, 'hideYearMonthSelector');

        wrapper.vm.selectedYearMonth(2, 'month');
        expect(wrapper.vm.currentDate).toEqual({
          start: dummyDate.set('month', 2).startOf('month'),
          end: dummyDate.set('month', 2).endOf('month'),
          month: 2,
          year: 2019,
        });
        expect(wrapper.emitted().selectDate[0]).toEqual([dayjs().year(2019).month(2).startOf('month')]);
        expect(wrapper.vm.hideYearMonthSelector).not.toHaveBeenCalled();
      });
    });
  });
});
