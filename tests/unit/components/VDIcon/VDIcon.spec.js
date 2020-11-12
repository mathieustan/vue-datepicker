import { mount } from '@vue/test-utils';
import VDIcon from '@/components/VDIcon/VDIcon';

import { ICONS } from '@/constants/icons';

describe('VDIcon', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = ({ iconName = 'check', props = {}, listeners = {} } = {}) =>
      mount(VDIcon, {
        slots: {
          default: iconName,
        },
        propsData: props,
        listeners,
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
    expect(wrapper.vm.size).toEqual(undefined);
  });

  describe('methods', () => {
    describe('getDefaultData', () => {
      [{
        description: 'return default data for svg or i',
        iconName: 'check',
        expectedResult: {
          staticClass: 'vd-icon',
          class: {
            'vd-icon--disabled': false,
            'vd-icon--link': false,
          },
          attrs: {
            'aria-hidden': true,
            disabled: false,
            type: undefined,
          },
          on: {},
        },
      }, {
        description: 'allow to click on icon',
        iconName: 'fa fa-check',
        listeners: { click: jest.fn() },
        expectedResult: {
          staticClass: 'vd-icon',
          class: {
            'vd-icon--disabled': false,
            'vd-icon--link': true,
          },
          attrs: {
            'aria-hidden': false,
            disabled: false,
            type: 'button',
          },
          on: {
            click: expect.any(Function),
          },
        },
      }, {
        description: 'disabled icon',
        iconName: 'fa fa-check',
        listeners: { click: jest.fn() },
        props: { disabled: true },
        expectedResult: {
          staticClass: 'vd-icon',
          class: {
            'vd-icon--disabled': true,
            'vd-icon--link': true,
          },
          attrs: {
            'aria-hidden': false,
            disabled: true,
            type: 'button',
          },
          on: {
            click: expect.any(Function),
          },
        },
      }].forEach(({ description, iconName, listeners, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ iconName, listeners, props });
          expect(wrapper.vm.getDefaultData()).toEqual(expectedResult);
        });
      });
    });

    describe('getIcon', () => {
      [{
        description: 'return an empty string if slot is empty',
        iconName: '',
        expectedResult: '',
      }, {
        description: 'return an icon from ICONS',
        iconName: 'close',
        expectedResult: ICONS.close,
      }, {
        description: 'return iconName if not found in ICONS',
        iconName: 'fa fa-test',
        expectedResult: 'fa fa-test',
      }].forEach(({ description, iconName, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ iconName });
          expect(wrapper.vm.getIcon()).toEqual(expectedResult);
        });
      });
    });
  });

  describe('behaviour', () => {
    it('Default icon size should be 16', () => {
      const wrapper = mountComponent();
      const iconSvg = wrapper.find('svg');
      expect(iconSvg.attributes('height')).toEqual('16');
    });

    it('should allow to update icon size', () => {
      const wrapper = mountComponent({ props: { size: 24 } });
      const iconSvg = wrapper.find('svg');
      expect(iconSvg.attributes('height')).toEqual('24');
    });
  });
});
