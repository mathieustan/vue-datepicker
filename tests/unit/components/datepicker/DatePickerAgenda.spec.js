import dayjs from 'dayjs';
import mockDate from 'mockdate';
import * as bodyScrollLockFunctions from 'body-scroll-lock';
import { mount } from '@vue/test-utils';

// locale
import { en } from '@/locale';

import DatePickerAgenda from '@/components/DatePicker/DatePickerAgenda.vue';

jest.mock('body-scroll-lock', () => ({
  disableBodyScroll: jest.fn(),
  enableBodyScroll: jest.fn(),
  clearAllBodyScrollLocks: jest.fn(),
}));
console.error = jest.fn();

beforeEach(() => {
  mockDate.set('2019-5-16');
});

afterEach(() => {
  mockDate.reset();
});

describe('DatePickerAgenda', () => {
  let mountComponent;
  const dummyDate = dayjs('2019-5-16');

  beforeEach(() => {
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation(cb => cb());

    mountComponent = ({
      date = dummyDate,
      minDate,
      maxDate,
      locale = { lang: en },
      activeBottomSheet = false,
      noHeader = false,
      type = 'date',
      validate,
      range,
      rangePresets,
      rtl,
    } = {}) =>
      mount(DatePickerAgenda, {
        propsData: {
          date,
          minDate,
          maxDate,
          locale,
          color: 'color',
          close: jest.fn(),
          type,
          validate,
          range,
          rangePresets,
          activeBottomSheet,
          noHeader,
          rtl,
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
    expect(wrapper.vm.locale).toEqual({ lang: en });
    expect(wrapper.vm.color).toEqual('color');

    expect(wrapper.vm.currentDate).toEqual({
      start: dummyDate.startOf('month'),
      end: dummyDate.endOf('month'),
      month: 4,
      year: 2019,
    });
    expect(wrapper.vm.mutableDate).toEqual(dummyDate);
  });

  describe('computed', () => {
    describe('styles', () => {
      it('should return styles from data', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.styles).toEqual({
          height: 'auto',
        });
      });
    });

    describe('classes', () => {
      it.each([
        [
          { fullscreenMobile: true, inline: false, activeBottomSheet: true, noHeader: true, validate: true },
          {
            'datepicker--rtl': false,
            'datepicker--bottomsheet': true,
            'datepicker--no-header': true,
            'datepicker--validate': true,
            'datepicker--range': false,
            'datepicker--range-selecting': false,
          },
        ],
        [
          {
            rtl: true,
            fullscreenMobile: false,
            inline: true,
            noHeader: false,
            range: true,
            date: { start: dayjs('2018-01-01'), end: dayjs('2018-02-01') },
          },
          {
            'datepicker--rtl': true,
            'datepicker--bottomsheet': false,
            'datepicker--no-header': false,
            'datepicker--validate': false,
            'datepicker--range': true,
            'datepicker--range-selecting': false,
          },
        ],
      ])('when props = %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.classes).toEqual(expectedResult);
      });
    });

    describe('isRangeSelected', () => {
      it.each([
        [{ range: false, date: undefined }, false],
        [{ range: true, date: undefined }, false],
        [{ range: true, date: { start: dayjs('2018-01-01'), end: undefined } }, false],
        [{ range: true, date: { start: undefined, end: dayjs('2018-02-01') } }, false],
        [{ range: true, date: { start: dayjs('2018-01-01'), end: dayjs('2018-02-01') } }, true],
      ])('when props equal %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.isRangeSelected).toEqual(expectedResult);
      });
    });
  });

  describe('created', () => {
    it('should init currentDate & mutableDate ', async () => {
      const wrapper = mountComponent();

      expect(wrapper.vm.currentDate).toEqual({
        start: dummyDate.startOf('month'),
        end: dummyDate.endOf('month'),
        month: 4,
        year: 2019,
      });
      expect(wrapper.vm.mutableDate).toEqual(dummyDate);
    });
  });

  describe('destroyed', () => {
    it('should remove all body scroll locks', () => {
      const wrapper = mountComponent();

      wrapper.destroy();
      expect(bodyScrollLockFunctions.clearAllBodyScrollLocks).toHaveBeenCalledWith();
    });
  });

  describe('watch', () => {
    describe('date', () => {
      it('should update currentDate & mutableDate when date change', () => {
        const wrapper = mountComponent();
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

    describe('activeBottomSheet', () => {
      it('should disable body scroll when visible', async () => {
        const wrapper = mountComponent({ activeBottomSheet: true });
        wrapper.setData({ innerWidth: 400 });
        await wrapper.vm.$nextTick();
        const datepickerContent = document.querySelector('.datepicker__body');
        expect(bodyScrollLockFunctions.disableBodyScroll).toHaveBeenCalledWith(datepickerContent);
      });

      it('should enable body scroll when hidden', async () => {
        const wrapper = mountComponent({ activeBottomSheet: false });
        wrapper.setData({ innerWidth: 500 });
        await wrapper.vm.$nextTick();
        expect(bodyScrollLockFunctions.enableBodyScroll).toHaveBeenCalled();
      });
    });

    describe('yearMonthMode', () => {
      let wrapper, datepickerContent, datepickerYearMonth;
      beforeEach(() => {
        wrapper = mountComponent({ activeBottomSheet: true });
        datepickerContent = document.querySelector('.datepicker__body');
        datepickerYearMonth = document.querySelector('.datepicker-year-month');
      });

      it('should do nothing if active mode isnt year && should\'nt show bottom sheet', () => {
        wrapper.setData({ innerWidth: 400, yearMonthMode: 'month' });

        expect(bodyScrollLockFunctions.enableBodyScroll).not.toHaveBeenCalledWith(datepickerContent);
        expect(bodyScrollLockFunctions.disableBodyScroll).not.toHaveBeenCalledWith(datepickerYearMonth);
      });

      it('should do nothing if active mode isnt year && should\'nt show bottom sheet', () => {
        wrapper.setData({ innerWidth: 400, yearMonthMode: 'year' });

        expect(bodyScrollLockFunctions.enableBodyScroll).toHaveBeenCalledWith(datepickerContent);
        expect(bodyScrollLockFunctions.disableBodyScroll).toHaveBeenCalledWith(datepickerYearMonth);
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
    describe('reOrderSelectedDate', () => {
      [{
        description: 'do nothing if mutableDate is undefined',
        data: {
          mutableDate: undefined,
        },
        date: dummyDate,
        expectedMutableDate: undefined,
      }, {
        description: 'set mutable start to end',
        data: {
          mutableDate: { start: dummyDate.add(2, 'day'), end: undefined },
        },
        date: dummyDate,
        expectedMutableDate: { start: undefined, end: dummyDate.add(2, 'day') },
      }, {
        description: 'set mutable end to start',
        data: {
          mutableDate: { start: undefined, end: dummyDate.subtract(2, 'day') },
        },
        date: dummyDate,
        expectedMutableDate: { start: dummyDate.subtract(2, 'day'), end: undefined },
      }].forEach(({ description, data, date, expectedMutableDate }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent();
          wrapper.setData({ ...data });
          wrapper.vm.reOrderSelectedDate(date);
          expect(wrapper.vm.mutableDate).toEqual(expectedMutableDate);
        });
      });
    });

    describe('reOrderSelectedDate', () => {
      it('should reorder date in range mode when hovered date change', () => {
        const startDate = dayjs('2019-5-15');
        const wrapper = mountComponent({ range: true, date: { start: startDate, end: undefined } });

        wrapper.vm.reOrderSelectedDate('2019-5-10');
        expect(wrapper.vm.mutableDate).toEqual({ start: undefined, end: startDate });

        wrapper.vm.reOrderSelectedDate('2019-5-16');
        expect(wrapper.vm.mutableDate).toEqual({ start: startDate, end: undefined });
      });
    });

    describe('selectDate', () => {
      it('Range : should update start date if date start & end not defined', () => {
        const wrapper = mountComponent({
          range: true,
          date: { start: undefined, end: undefined },
        });
        const startDate = dayjs('2019-9-20');
        wrapper.vm.selectDate(startDate);

        expect(wrapper.vm.mutableDate).toEqual({ start: startDate, end: undefined });
        expect(wrapper.emitted().selectDate).toBeFalsy();
      });

      it('Range : should update start date if date already selected', () => {
        const wrapper = mountComponent({
          range: true,
          date: { start: dayjs('2019-9-10'), end: dayjs('2019-9-20') },
        });
        const startDate = dayjs('2019-9-20');
        wrapper.vm.selectDate(startDate);

        expect(wrapper.vm.mutableDate).toEqual({ start: startDate, end: undefined });
        expect(wrapper.emitted().selectDate).toBeFalsy();
      });

      it('Range : should update end date if start is already defined', () => {
        const wrapper = mountComponent({ range: true, date: { start: dummyDate, end: undefined } });
        const maxDate = dayjs('2019-9-20');
        wrapper.vm.selectDate(maxDate);

        expect(wrapper.vm.mutableDate).toEqual({ start: dummyDate, end: maxDate });
        expect(wrapper.emitted().selectDate).toBeTruthy();
      });

      it('Range : should update start date if end is already defined', () => {
        const wrapper = mountComponent({
          range: true,
          date: { start: undefined, end: dayjs('2019-9-20') },
        });
        const startDate = dayjs('2019-9-10');
        wrapper.vm.selectDate(startDate);

        expect(wrapper.vm.mutableDate).toEqual({ start: startDate, end: dayjs('2019-9-20') });
        expect(wrapper.emitted().selectDate).toBeTruthy();
      });

      it('Should send an event with selected date & update transition with next', () => {
        const wrapper = mountComponent();
        jest.spyOn(wrapper.vm, 'updateTransitions');
        const newDate = dayjs('2019-9-16');
        wrapper.vm.selectDate(newDate);

        expect(wrapper.vm.updateTransitions).toHaveBeenCalledWith('next');
        expect(wrapper.vm.mutableDate).toEqual(newDate);
        expect(wrapper.emitted().selectDate).toBeTruthy();
      });

      it('Should send an event with selected date & update transaction with prev', () => {
        const wrapper = mountComponent();
        jest.spyOn(wrapper.vm, 'updateTransitions');
        const newDate = dayjs('2019-4-16');
        wrapper.vm.selectDate(newDate);

        expect(wrapper.vm.updateTransitions).toHaveBeenCalledWith('prev');
        expect(wrapper.vm.mutableDate).toEqual(newDate);
        expect(wrapper.emitted().selectDate[0]).toEqual([newDate]);
      });
    });

    describe('emitSelectedDate', () => {
      it('should update mutableDate, and emit selectDate', () => {
        const wrapper = mountComponent({ range: true });
        const range = { start: dayjs('2019-4-16'), end: dayjs('2019-4-18') };
        wrapper.vm.emitSelectedDate(range);

        expect(wrapper.vm.mutableDate).toEqual(range);
        expect(wrapper.emitted().selectDate[0]).toEqual([range]);
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

      it('Should show last month available if today\'s date is after maxDate', () => {
        const newDate = dayjs('2019-5', 'YYYY-MM');
        const expectedDate = dayjs('2019-3', 'YYYY-MM');
        const wrapper = mountComponent({
          isVisible: false,
          inline: true,
          type: 'month',
          maxDate: '2019-03',
        });

        wrapper.vm.updateDate(newDate);
        expect(wrapper.vm.currentDate).toEqual({
          start: expectedDate.startOf('month'),
          end: expectedDate.endOf('month'),
          month: 2,
          year: 2019,
        });
        expect(wrapper.vm.mutableDate).toEqual(expectedDate);
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

  describe('behaviour', () => {
    it('should emit close when click on a close button', () => {
      const wrapper = mountComponent({ activeBottomSheet: true });
      const icon = wrapper.find('.datepicker__title-close > .vd-icon');
      icon.trigger('click');

      expect(wrapper.emitted().close).toBeTruthy();
    });

    it('should emit cancel when click on cancel button', () => {
      const wrapper = mountComponent({ validate: true });
      const button = wrapper.find('.datepicker-validate__button-cancel');
      button.trigger('click');

      expect(wrapper.emitted().close).toBeTruthy();
    });

    it('should emit validate when click on validate button', () => {
      const wrapper = mountComponent({ validate: true });
      const button = wrapper.find('.datepicker-validate__button-validate');
      button.trigger('click');

      expect(wrapper.emitted().validateDate).toBeTruthy();
    });
  });
});
