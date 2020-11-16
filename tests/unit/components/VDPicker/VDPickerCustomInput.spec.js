import Vue from 'vue';
import dayjs from 'dayjs';
import { mount } from '@vue/test-utils';
import VDPickerCustomInput from '@/components/VDPicker/VDPickerCustomInput';

jest.useFakeTimers();

describe('VDPickerCustomInput', () => {
  let mountComponent;
  let vm = new Vue();

  const dummyDate = dayjs(new Date([2019, 5, 16]));
  const defaultVDPickerProvider = { $scopedSlots: {}, $slots: {} };

  beforeEach(() => {
    mountComponent = ({
      props = {},
      provide = {
        VDPicker: defaultVDPickerProvider,
      },
    } = {}) =>
      mount(VDPickerCustomInput, {
        propsData: props,
        provide,
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('Should init data', () => {
    const wrapper = mountComponent({ props: { date: dummyDate, name: 'datepicker', color: 'color' } });
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.name).toEqual('datepicker');
    expect(wrapper.vm.date).toEqual(dummyDate);
    expect(wrapper.vm.color).toEqual('color');
    expect(wrapper.vm.disabled).toEqual(false);
  });

  describe('computed', () => {
    describe('computedColor', () => {
      [{
        description: 'return empty by default',
        props: {},
        expectedResult: '',
      }, {
        description: 'return empty if disabled',
        props: { disabled: true, color: '#ffffff', isMenuActive: true },
        expectedResult: '',
      }, {
        description: 'return empty if menu is not active',
        props: { color: '#ffffff', isMenuActive: false },
        expectedResult: '',
      }, {
        description: 'return color if menu is active',
        props: { color: '#ffffff', isMenuActive: true },
        expectedResult: '#ffffff',
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.computedColor).toEqual(expectedResult);
        });
      });
    });

    describe('isDirty', () => {
      [{
        description: 'return false by default',
        props: {},
        expectedResult: false,
      }, {
        description: 'return true if date is defined',
        props: { isDateDefined: true },
        expectedResult: true,
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.isDirty).toEqual(expectedResult);
        });
      });
    });
  });

  describe('behaviour', () => {
    it('should emit keydown', () => {
      const wrapper = mountComponent({ props: { date: dummyDate } });
      const input = wrapper.find('input');
      input.trigger('keydown.esc');

      expect(wrapper.emitted().keydown).toBeTruthy();
    });

    it('should emit clearDate when clicking on clear icon', () => {
      const wrapper = mountComponent({
        props: {
          date: dummyDate,
          isDateDefined: true,
          clearable: true,
        },
      });

      const clearIcon = wrapper.find('.vd-picker__input-clear__icon > button');
      clearIcon.trigger('mouseup');
      expect(wrapper.emitted().clearDate).toBeFalsy();

      clearIcon.trigger('click');

      expect(wrapper.emitted().clearDate).toBeTruthy();
    });

    it('should have an input-icon slot', () => {
      const VDPickerProviderWithIcon = {
        $scopedSlots: {},
        $slots: {
          'input-icon': vm.$createElement('div', { staticClass: 'icon-slot' }),
        },
      };
      const wrapper = mountComponent({
        provide: {
          VDPicker: VDPickerProviderWithIcon,
        },
      });

      expect(wrapper.find('.icon-slot').exists()).toBeTruthy();
    });

  });
});
