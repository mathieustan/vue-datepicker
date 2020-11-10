import dayjs from 'dayjs';
import * as bodyScrollLockFunctions from 'body-scroll-lock';
import mockDate from 'mockdate';
import { mount } from '@vue/test-utils';
import VDPicker from '@/components/VDPicker/VDPicker';

// Helpers
import * as helpersFunction from '@/utils/helpers';
import { resizeWindow } from '../../../helpers';

// Constants
import {
  DEFAULT_INPUT_DATE_FORMAT,
  DEFAULT_HEADER_DATE_FORMAT,
  DEFAULT_OUTPUT_DATE_FORMAT,
  KEYCODES,
} from '@/constants';

jest.useFakeTimers();

jest.mock('body-scroll-lock', () => ({
  disableBodyScroll: jest.fn(),
  enableBodyScroll: jest.fn(),
  clearAllBodyScrollLocks: jest.fn(),
}));

beforeEach(() => {
  mockDate.set(new Date([2019, 5, 16]));
});

afterEach(() => {
  mockDate.reset();
});

describe('VDPicker', () => {
  let mountComponent;
  const dummyDate = new Date([2019, 5, 16]);
  const dummyDateEnd = new Date([2019, 5, 17]);

  beforeEach(() => {
    jest.spyOn(helpersFunction, 'generateRandomId').mockReturnValue('randomId');
    mountComponent = ({ props = {}, scopedSlots = {} } = {}) =>
      mount(VDPicker, {
        scopedSlots,
        propsData: props,
        mocks: {
          $vuedatepicker: { lang: 'en' },
        },
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.date).toEqual(undefined);
    expect(wrapper.vm.isMenuActive).toEqual(false);
    expect(wrapper.vm.placeholder).toEqual('YYYY-MM-DD');
    expect(wrapper.vm.color).toEqual('#4f88ff');
    expect(wrapper.vm.minDate).toEqual(undefined);
    expect(wrapper.vm.maxDate).toEqual(undefined);
    expect(wrapper.vm.disabled).toEqual(false);
    expect(wrapper.vm.inline).toEqual(false);
    expect(wrapper.vm.fullscreenMobile).toEqual(false);
  });

  describe('computed', () => {
    describe('componentId', () => {
      it.each([
        [undefined, 'datepicker_randomId'],
        ['datepicker', 'datepicker'],
      ])('when id = %p, should return %p', (id, expectedResult) => {
        const wrapper = mountComponent({ props: { id } });
        expect(wrapper.vm.componentId).toEqual(expectedResult);
      });
    });

    describe('inputFormat', () => {
      it.each([
        [{ format: undefined }, DEFAULT_INPUT_DATE_FORMAT.date],
        [{ format: undefined, range: true }, DEFAULT_INPUT_DATE_FORMAT.range],
        [{ format: 'DD/MM/YYYY' }, 'DD/MM/YYYY'],
      ])('when props equal %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent({ props });
        expect(wrapper.vm.inputFormat).toEqual(expectedResult);
      });
    });

    describe('headerFormat', () => {
      it.each([
        [{ formatHeader: undefined }, DEFAULT_HEADER_DATE_FORMAT.date],
        [{ formatHeader: undefined, range: true }, DEFAULT_HEADER_DATE_FORMAT.range],
        [{ formatHeader: 'MMMM MM' }, 'MMMM MM'],
      ])('when format equal %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent({ props });
        expect(wrapper.vm.headerFormat).toEqual(expectedResult);
      });
    });

    describe('outputFormat', () => {
      it.each([
        [{}, DEFAULT_OUTPUT_DATE_FORMAT.date],
        [{ range: true }, DEFAULT_OUTPUT_DATE_FORMAT.range],
      ])('when format equal %p, should return %p', (formatOutput, expectedResult) => {
        const wrapper = mountComponent({ props: { formatOutput } });
        expect(wrapper.vm.outputFormat).toEqual(expectedResult);
      });
    });

    describe('textsFormat', () => {
      it.each([
        [{}, {
          buttonValidate: 'Ok',
          buttonCancel: 'Cancel',
          rangeHeaderText: 'From %d To %d',
        }],
        [{ locale: { lang: 'fr' } }, {
          buttonValidate: 'Ok',
          buttonCancel: 'Annuler',
          rangeHeaderText: 'Du %d Au %d',
        }],
        [{ buttonValidate: 'Validate', buttonCancel: 'Cancel', rangeHeaderText: 'Test %d Test %d' }, {
          buttonValidate: 'Validate',
          buttonCancel: 'Cancel',
          rangeHeaderText: 'Test %d Test %d',
        }],
        [{ locale: { lang: 'toto' } }, {
          buttonValidate: 'Ok',
          buttonCancel: 'Cancel',
          rangeHeaderText: 'From %d To %d',
        }],
      ])('when props equal %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent({ props });
        expect(wrapper.vm.textsFormat).toEqual(expectedResult);
      });
    });

    describe('isDateDefined', () => {
      it.each([
        [undefined, false],
        [{ value: dayjs('2019-5-16') }, true],
        [{ range: true, value: {} }, false],
        [{ range: true, value: { start: dayjs('2019-5-16') } }, false],
        [{ range: true, value: { start: dayjs('2019-5-16'), end: dayjs('2019-5-17') } }, true],

      ])('When props equal %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent({ props });
        expect(wrapper.vm.isDateDefined).toEqual(expectedResult);
      });
    });

    describe('formattedInputDate', () => {
      [{
        description: 'return false by default',
        props: {},
        expectedResult: undefined,
      }, {
        description: 'return date formatted',
        props: { value: dayjs('2019-2-12') },
        expectedResult: '12 February 2019',
      }, {
        description: 'return month formatted',
        props: { value: dayjs('2019-2-12'), type: 'month' },
        expectedResult: 'February 2019',
      }, {
        description: 'return month formatted',
        props: { value: dayjs('2019-2'), type: 'month' },
        expectedResult: 'February 2019',
      }, {
        description: 'return quarter formatted',
        props: { value: dayjs('2019-2-12'), type: 'quarter' },
        expectedResult: '2019-Q2',
      }, {
        description: 'return quarter formatted',
        props: { value: dayjs('2019-2'), type: 'quarter' },
        expectedResult: '2019-Q2',
      }, {
        description: 'return undefined if range is enable and date is not fully selected',
        props: {
          value: { start: dayjs('2018-5-16'), end: undefined },
          range: true,
        },
        expectedResult: undefined,
      }, {
        description: 'return range formatted by default',
        props: {
          value: { start: dayjs('2018-5-16'), end: dayjs('2018-5-17') },
          range: true,
        },
        expectedResult: '16 May 2018 ~ 17 May 2018',
      }, {
        description: 'return range formatted with custom range format',
        props: {
          value: { start: dayjs('2018-5-16'), end: dayjs('2018-5-17') },
          range: true,
          rangeInputText: 'From %d to %d',
        },
        expectedResult: 'From 16 May 2018 to 17 May 2018',
      }, {
        description: 'return range formatted with another custom range format',
        props: {
          value: { start: dayjs('2018-5-16'), end: dayjs('2018-5-17') },
          range: true,
          rangeInputText: '%d to %d',
        },
        expectedResult: '16 May 2018 to 17 May 2018',
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.formattedInputDate).toEqual(expectedResult);
        });
      });
    });

    describe('isFullScreenMode', () => {
      [{
        description: 'return false when width is greater than mobileBreakpoint',
        props: {},
        expectedResult: false,
      }, {
        description: 'return true if mobileBreakpoint is greater than window width',
        props: {
          fullscreenMobile: true,
          mobileBreakpoint: 1200,
        },
        expectedResult: true,
      }, {
        description: 'return false if mobileBreakpoint is less than window width',
        props: {
          fullscreenMobile: true,
          mobileBreakpoint: 500,
        },
        expectedResult: false,
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          resizeWindow(1000);
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.isFullScreenMode).toEqual(expectedResult);
        });
      });
    });
  });

  describe('watch', () => {
    describe('value', () => {
      it.each([
        [
          { value: { start: dummyDate, end: undefined }, range: true },
          { start: dayjs(dummyDate, DEFAULT_OUTPUT_DATE_FORMAT.date), end: undefined },
        ],
        [
          { value: { start: dummyDate, end: dummyDateEnd }, range: true },
          {
            start: dayjs(dummyDate, DEFAULT_OUTPUT_DATE_FORMAT.date),
            end: dayjs(dummyDateEnd, DEFAULT_OUTPUT_DATE_FORMAT.date),
          },
        ],
        [{ value: dummyDate }, dayjs(dummyDate, DEFAULT_OUTPUT_DATE_FORMAT.date)],
        [{ value: undefined }, undefined],
      ])('when props equal %p, date should be equal to %p', (props, expectedResult) => {
        const wrapper = mountComponent({ props });
        expect(wrapper.vm.internalDate).toEqual(expectedResult);
      });
    });
  });

  describe('beforeDestroy', () => {
    it('should emit destroy event && hide datepicker', () => {
      const wrapper = mountComponent();
      wrapper.setData({ isMenuActive: true });

      wrapper.destroy();
      expect(wrapper.vm.isMenuActive).toEqual(false);
      expect(wrapper.emitted().onDestroy).toBeTruthy();
    });
  });

  describe('methods', () => {

    describe('showDatePicker', () => {
      it('should do nothing if disabled', () => {
        const wrapper = mountComponent({ props: { disabled: true } });
        wrapper.setData({ isMenuActive: false });

        wrapper.vm.showDatePicker();
        expect(wrapper.vm.isMenuActive).toEqual(false);
        expect(wrapper.emitted().onOpen).toBeFalsy();
      });

      it.each([
        [
          { value: { start: dummyDate, end: undefined }, range: true },
          { start: dayjs('2019-02-01'), end: dayjs('2019-03-01') },
          { start: dayjs(dummyDate, DEFAULT_OUTPUT_DATE_FORMAT.date), end: undefined },
        ],
        [{ value: dummyDate }, dayjs('2019-02-01'), dayjs(dummyDate, DEFAULT_OUTPUT_DATE_FORMAT.date)],
        [{ value: undefined }, dayjs('2019-02-01'), undefined],
      ])(
        'when props = %p, date = %p, should reset date to %p & close',
        (props, currentDate, expectedResult) => {
          const wrapper = mountComponent({ props });
          wrapper.setData({ date: currentDate });
          jest.spyOn(wrapper.vm, 'hideDatePicker');

          wrapper.vm.showDatePicker();
          expect(wrapper.vm.internalDate).toEqual(expectedResult);
          expect(wrapper.vm.isMenuActive).toEqual(true);
          expect(wrapper.emitted().onOpen).toBeTruthy();
        },
      );
    });

    describe('hideDatePicker', () => {
      it('should set isMenuActive to false', () => {
        const wrapper = mountComponent();
        wrapper.setData({ isMenuActive: true });

        wrapper.vm.hideDatePicker();
        expect(wrapper.vm.isMenuActive).toEqual(false);
        expect(bodyScrollLockFunctions.clearAllBodyScrollLocks).toHaveBeenCalled();
        expect(wrapper.emitted().onClose).toBeTruthy();
      });

      it('should do nothing if datepicker isn\'t opened', () => {
        const wrapper = mountComponent();
        wrapper.setData({ isMenuActive: false });

        wrapper.vm.hideDatePicker();
        expect(wrapper.vm.isMenuActive).toEqual(false);
        expect(bodyScrollLockFunctions.clearAllBodyScrollLocks).not.toHaveBeenCalled();
        expect(wrapper.emitted().onClose).toBeFalsy();
      });
    });

    describe('changeDate', () => {
      it('should update date', () => {
        const wrapper = mountComponent();
        wrapper.vm.changeDate(dayjs('2019-5-18'));
        expect(wrapper.vm.date.format('YYYY-MM-DD')).toEqual('2019-05-18');
        expect(wrapper.emitted().input[0]).toEqual(['2019-05-18']);
        expect(wrapper.emitted().onChange).toBeTruthy();
      });

      it('should update date but not value if validate equal true', () => {
        const wrapper = mountComponent({ props: { validate: true } });
        wrapper.vm.changeDate(dayjs('2019-5-18'));
        expect(wrapper.vm.date.format('YYYY-MM-DD')).toEqual('2019-05-18');
        expect(wrapper.emitted().input).toBeFalsy();
        expect(wrapper.emitted().onChange).toBeFalsy();
      });

      it('should update dates when range is active', () => {
        const wrapper = mountComponent({ props: { range: true } });
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

    describe('validateDate', () => {
      it('should not update date if undefined', () => {
        const wrapper = mountComponent();

        wrapper.vm.validateDate();
        expect(wrapper.emitted().input).toBeFalsy();
        expect(wrapper.emitted().onChange).toBeFalsy();
      });

      it('should update date', () => {
        const wrapper = mountComponent();
        wrapper.setData({ date: dayjs('2019-5-18') });
        wrapper.vm.validateDate();
        expect(wrapper.emitted().input[0]).toEqual(['2019-05-18']);
        expect(wrapper.emitted().onChange).toBeTruthy();
      });
    });

    describe('onKeyDown', () => {
      [{
        description: 'do not close menu if key isnt tab or esc',
        event: { keyCode: KEYCODES.enter },
        expectedResult: true,
      }, {
        description: 'do nothing in menu is undefined',
        event: { keyCode: KEYCODES.enter },
        $refs: { menu: undefined },
        expectedResult: true,
      }, {
        description: 'close menu on esc',
        event: { keyCode: KEYCODES.esc },
        expectedResult: false,
      }, {
        description: 'close menu on tab',
        event: { keyCode: KEYCODES.tab },
        expectedResult: false,
      }].forEach(({ description, event, $refs, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props: { visible: true } });
          if ($refs) {
            wrapper.vm.$refs = $refs;
          }
          wrapper.vm.onKeyDown({ ...event, preventDefault: jest.fn() });
          expect(wrapper.vm.isMenuActive).toEqual(expectedResult);
        });
      });
    });

    describe('onClearDate', () => {
      it('should $emit date undefined', () => {
        const wrapper = mountComponent();
        wrapper.setData({ date: dayjs('2019-5-18') });
        wrapper.vm.onClearDate();
        expect(wrapper.emitted().input[0]).toEqual([undefined]);
        expect(wrapper.emitted().onChange).toBeTruthy();
      });
    });
  });

  describe('behaviour', () => {
    it('should not mount GMenu if inline', () => {
      const wrapper = mountComponent({
        props: { inline: true },
      });
      expect(wrapper.find('vd-menu').exists()).toBe(false);
    });

    it('should mount a custom input if slot is defined', () => {
      const wrapper = mountComponent({
        scopedSlots: {
          activator: '<input id="input" :value="props.displayedDate" readonly />',
        },
      });
      expect(wrapper.find('#input')).toBeDefined();
    });

    it('should mount an overlay if fullscreenMobile is true', () => {
      resizeWindow(400);
      const wrapper = mountComponent({
        props: { fullscreenMobile: true, visible: true },
      });
      expect(wrapper.find('.datepicker-overlay')).toBeDefined();
    });

    it('should hide datepicker when click outside', async () => {
      const wrapper = mountComponent({
        scopedSlots: {
          activator: '<input id="input" :value="props.displayedDate" readonly />',
        },
        props: { visible: true },
      });
      await wrapper.vm.$nextTick();
      jest.runOnlyPendingTimers(); // timeout when init click-outside directive

      const button = document.createElement('button');
      button.addEventListener('click', jest.fn());
      document.body.appendChild(button);

      expect(wrapper.vm.isMenuActive).toEqual(true);

      // Should close menu when on a button outisde
      button.click();
      jest.runOnlyPendingTimers();

      expect(wrapper.vm.isMenuActive).toEqual(false);
      expect(wrapper.vm.isBooted).toEqual(false);
    });

    it('should set is booted when received transitionEnd from GMenu', () => {
      const wrapper = mountComponent();
      wrapper.setData({ isMenuActive: true });
      wrapper.vm.$refs.menu.$emit('transitionEnd');

      expect(wrapper.vm.isBooted).toEqual(true);
    });

    it('should open agenda & overlay when window size change', async () => {
      resizeWindow(1200);
      const wrapper = mountComponent({
        props: { fullscreenMobile: true },
      });

      wrapper.setData({ isMenuActive: true, isBooted: true });
      await wrapper.vm.$nextTick();

      expect(document.body.querySelector('.vd-overlay')).not.toBeTruthy();
      expect(document.body.querySelector('.vd-menu__content')).toBeDefined();

      resizeWindow(400);
      await wrapper.vm.$nextTick();
      jest.runOnlyPendingTimers();
      expect(wrapper.vm.isMenuActive).toEqual(true);

      expect(document.body.querySelector('.vd-overlay')).toBeDefined();
    });
  });
});
