import dayjs from 'dayjs';
import mockDate from 'mockdate';
import * as bodyScrollLockFunctions from 'body-scroll-lock';
import { mount } from '@vue/test-utils';

import VDPickerAgenda from '@/components/VDPicker/VDPickerAgenda';

// Lang
import { en } from '@/locale';

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

describe('VDPickerAgenda', () => {
  let mountComponent;
  const dummyDate = dayjs('2019-5-16');
  const defaultVDPickerProvider = { $scopedSlots: {}, $slots: {} };

  beforeEach(() => {
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation(cb => cb());

    mountComponent = ({
      date = dummyDate,
      minDate,
      maxDate,
      fullscreen = false,
      noHeader = false,
      type = 'date',
      validate,
      range,
      rangePresets,
      locale = { lang: en },
      rtl,
    } = {}) =>
      mount(VDPickerAgenda, {
        provide: {
          VDPicker: defaultVDPickerProvider,
        },
        propsData: {
          date,
          minDate,
          maxDate,
          color: 'color',
          close: jest.fn(),
          type,
          validate,
          range,
          rangePresets,
          fullscreen,
          noHeader,
          locale,
          rtl,
        },
        mocks: {
          $vuedatepicker: { lang: 'en' },
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
    expect(wrapper.vm.color).toEqual('color');

    expect(wrapper.vm.pickerDate).toEqual({
      start: dummyDate.startOf('month'),
      end: dummyDate.endOf('month'),
      month: 4,
      year: 2019,
      locale: { lang: en },
    });
    expect(wrapper.vm.mutableDate).toEqual(dummyDate);
  });

  describe('computed', () => {
    describe('classes', () => {
      it.each([
        [
          { fullscreenMobile: true, inline: false, fullscreen: true, noHeader: true, validate: true },
          {
            'vd-picker--rtl': false,
            'vd-picker--bottomsheet': true,
            'vd-picker--no-header': true,
            'vd-picker--validate': true,
            'vd-picker--range': false,
            'vd-picker--range-selecting': false,
          },
        ],
        [
          {
            fullscreenMobile: false,
            inline: true,
            noHeader: false,
            range: true,
            date: { start: dayjs('2018-01-01'), end: dayjs('2018-02-01') },
            rtl: true,
          },
          {
            'vd-picker--rtl': true,
            'vd-picker--bottomsheet': false,
            'vd-picker--no-header': false,
            'vd-picker--validate': false,
            'vd-picker--range': true,
            'vd-picker--range-selecting': false,
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
    it('should init pickerDate & mutableDate ', async () => {
      const wrapper = mountComponent();

      expect(wrapper.vm.pickerDate).toEqual({
        start: dummyDate.startOf('month'),
        end: dummyDate.endOf('month'),
        month: 4,
        year: 2019,
        locale: { lang: en },
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
      it('should update pickerDate & mutableDate when date change', () => {
        const wrapper = mountComponent();
        const newDate = dummyDate.add(1, 'day');

        expect(wrapper.vm.pickerDate).toEqual({
          start: dummyDate.startOf('month'),
          end: dummyDate.endOf('month'),
          month: 4,
          year: 2019,
          locale: { lang: en },
        });
        expect(wrapper.vm.mutableDate).toEqual(dummyDate);

        wrapper.setProps({ date: newDate });

        expect(wrapper.vm.pickerDate).toEqual({
          start: newDate.startOf('month'),
          end: newDate.endOf('month'),
          month: 4,
          year: 2019,
          locale: { lang: en },
        });
        expect(wrapper.vm.mutableDate).toEqual(newDate);
      });
    });

    describe('fullscreen', () => {
      it('should disable body scroll when visible', async () => {
        const wrapper = mountComponent({ fullscreen: true });
        await wrapper.vm.$nextTick();
        const datepickerContent = document.querySelector('.vd-picker__body');
        expect(bodyScrollLockFunctions.disableBodyScroll).toHaveBeenCalledWith(datepickerContent);
      });

      it('should enable body scroll when hidden', async () => {
        const wrapper = mountComponent({ fullscreen: false });
        await wrapper.vm.$nextTick();
        expect(bodyScrollLockFunctions.enableBodyScroll).toHaveBeenCalled();
      });
    });

    describe('mode', () => {
      let wrapper, datepickerContent, datepickerYearMonth;
      beforeEach(() => {
        wrapper = mountComponent({ fullscreen: true });
        datepickerContent = document.querySelector('.vd-picker__body');
        datepickerYearMonth = document.querySelector('.vd-picker__years');
      });

      it('should do nothing if active mode isnt year && should\'nt show bottom sheet', () => {
        wrapper.setData({ mode: 'month' });

        wrapper.vm.$nextTick(() => {
          expect(bodyScrollLockFunctions.enableBodyScroll).not.toHaveBeenCalledWith(datepickerContent);
          expect(bodyScrollLockFunctions.disableBodyScroll).not.toHaveBeenCalledWith(datepickerYearMonth);
        });

      });

      it('should update body scroll when mode is year', () => {
        wrapper.setData({ mode: 'year' });

        wrapper.vm.$nextTick(() => {
          expect(bodyScrollLockFunctions.enableBodyScroll).toHaveBeenCalledWith(datepickerContent);
          expect(bodyScrollLockFunctions.disableBodyScroll).toHaveBeenCalledWith(datepickerYearMonth);
        });

      });
    });

    describe('type', () => {
      it('should update mode', () => {
        const wrapper = mountComponent({ type: 'month' });
        expect(wrapper.vm.mode).toEqual('month');

        wrapper.setProps({ type: 'date' });
        expect(wrapper.vm.mode).toEqual('date');
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

    describe('initDatesForPicker', () => {
      it('Should update pickerDate & mutableDate for MONTH mode', () => {
        const newDate = dayjs('2019-04', 'YYYY-MM');
        const wrapper = mountComponent({
          isVisible: false,
          inline: true,
          type: 'month',
        });

        wrapper.vm.initDatesForPicker(newDate);
        expect(wrapper.vm.pickerDate).toEqual({
          start: newDate.startOf('month'),
          end: newDate.endOf('month'),
          month: 3,
          year: 2019,
          locale: { lang: en },
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

        wrapper.vm.initDatesForPicker(newDate);
        expect(wrapper.vm.pickerDate).toEqual({
          start: expectedDate.startOf('month'),
          end: expectedDate.endOf('month'),
          month: 2,
          year: 2019,
          locale: { lang: en },
        });
        expect(wrapper.vm.mutableDate).toEqual(expectedDate);
      });

      it('Should update pickerDate & mutableDate for QUARTER mode', () => {
        const newDate = dayjs('2019-2', 'YYYY-Q');
        const wrapper = mountComponent({
          isVisible: false,
          inline: true,
          type: 'quarter',
        });

        wrapper.vm.initDatesForPicker(newDate);
        expect(wrapper.vm.pickerDate).toEqual({
          start: newDate.month(3).startOf('month'),
          end: newDate.month(3).endOf('month'),
          month: 3,
          year: 2019,
          locale: { lang: en },
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
          locale: { lang: en },
        }],
        ['next', dayjs(new Date([2019, 12, 16])), {
          start: dayjs(new Date([2019, 12, 16])).add(1, 'month').startOf('month'),
          end: dayjs(new Date([2019, 12, 16])).add(1, 'month').endOf('month'),
          month: 0,
          year: 2020,
          locale: { lang: en },
        }],
        ['prev', dummyDate, {
          start: dummyDate.subtract(1, 'month').startOf('month'),
          end: dummyDate.subtract(1, 'month').endOf('month'),
          month: 3,
          year: 2019,
          locale: { lang: en },
        }],
        ['prev', dayjs(new Date([2019, 1, 16])), {
          start: dayjs(new Date([2019, 1, 16])).subtract(1, 'month').startOf('month'),
          end: dayjs(new Date([2019, 1, 16])).subtract(1, 'month').endOf('month'),
          month: 11,
          year: 2018,
          locale: { lang: en },
        }],
      ])(
        'When direction is %p, date equal %p, pickerDate should be %p',
        (direction, date, expectedResult) => {
          const wrapper = mountComponent({ date });
          wrapper.vm.changeMonth(direction);

          expect(wrapper.vm.transitionDaysName).toEqual(`slide-h-${direction}`);
          expect(wrapper.vm.transitionLabelName).toEqual(`slide-v-${direction}`);
          expect(wrapper.vm.pickerDate).toEqual(expectedResult);
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
          locale: { lang: en },
        }],
        ['prev', dummyDate, {
          start: dummyDate.subtract(1, 'year').startOf('month'),
          end: dummyDate.subtract(1, 'year').endOf('month'),
          month: 4,
          year: 2018,
          locale: { lang: en },
        }],
      ])(
        'When direction is %p, date equal %p, pickerDate should be %p',
        (direction, date, expectedResult) => {
          const wrapper = mountComponent({ date });
          wrapper.vm.changeYear(direction);

          expect(wrapper.vm.transitionDaysName).toEqual(`slide-h-${direction}`);
          expect(wrapper.vm.transitionLabelName).toEqual(`slide-v-${direction}`);
          expect(wrapper.vm.pickerDate).toEqual(expectedResult);
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

    describe('updateSelectedYearMonth', () => {
      [{
        description: 'should update year and show month picker',
        props: {
          type: 'date',
        },
        options: {
          value: 2018,
          mode: 'year',
        },
        expectedDate: {
          start: dummyDate.set('year', 2018).startOf('month'),
          end: dummyDate.set('year', 2018).endOf('month'),
          month: 4,
          year: 2018,
          locale: { lang: en },
        },
        expectedMode: 'month',
      }, {
        description: 'should update month and show date picker',
        props: {
          type: 'date',
        },
        options: {
          value: 2,
          mode: 'month',
        },
        expectedDate: {
          start: dummyDate.set('month', 2).startOf('month'),
          end: dummyDate.set('month', 2).endOf('month'),
          month: 2,
          year: 2019,
          locale: { lang: en },
        },
        expectedMode: 'date',
      }, {
        description: 'should update year and show quarter',
        props: {
          type: 'quarter',
          date: dayjs('2019-2'),
        },
        options: {
          value: 2018,
          mode: 'year',
        },
        expectedDate: {
          start: dummyDate.set('year', 2018).set('month', 3).startOf('month'),
          end: dummyDate.set('year', 2018).set('month', 3).endOf('month'),
          month: 3,
          year: 2018,
          locale: { lang: en },
        },
        expectedMode: 'quarter',
      }, {
        description: 'should update year and selectDate date when type is year',
        props: {
          type: 'year',
        },
        options: {
          value: 2018,
          mode: 'year',
        },
        expectedDate: {
          start: dummyDate.set('year', 2018).startOf('month'),
          end: dummyDate.set('year', 2018).endOf('month'),
          month: 4,
          year: 2018,
          locale: { lang: en },
        },
        expectedMode: 'year',
        callSelectDate: true,
      }, {
        description: 'should update month and select date when type is month',
        props: {
          type: 'month',
        },
        options: {
          value: 2,
          mode: 'month',
        },
        expectedDate: {
          start: dummyDate.set('month', 2).startOf('month'),
          end: dummyDate.set('month', 2).endOf('month'),
          month: 2,
          year: 2019,
          locale: { lang: en },
        },
        expectedMode: 'month',
        callSelectDate: true,
      }].forEach(({ description, props, options, expectedDate, expectedMode, callSelectDate }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent(props);
          jest.spyOn(wrapper.vm, 'selectDate');
          wrapper.vm.updateSelectedYearMonth(options.value, options.mode);

          expect(wrapper.vm.pickerDate).toEqual(expectedDate);
          expect(wrapper.vm.mode).toEqual(expectedMode);

          if (callSelectDate) expect(wrapper.vm.selectDate).toHaveBeenCalled();
        });
      });
    });

  });

  describe('behaviour', () => {
    it('should emit close when click on a close button', () => {
      const wrapper = mountComponent({ fullscreen: true });
      const icon = wrapper.find('.vd-picker__title-close > .vd-icon');
      icon.trigger('click');

      expect(wrapper.emitted().close).toBeTruthy();
    });

    it('should emit cancel when click on cancel button', () => {
      const wrapper = mountComponent({ validate: true });
      const button = wrapper.find('.vd-picker-validate__button-cancel');
      button.trigger('click');

      expect(wrapper.emitted().close).toBeTruthy();
    });

    it('should emit validate when click on validate button', () => {
      const wrapper = mountComponent({ validate: true });
      const button = wrapper.find('.vd-picker-validate__button-validate');
      button.trigger('click');

      expect(wrapper.emitted().validateDate).toBeTruthy();
    });
  });
});
