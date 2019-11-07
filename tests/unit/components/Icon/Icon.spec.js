import { shallowMount } from '@vue/test-utils';
import Icon from '@/components/Icon/Icon.vue';

import { ICONS } from '@/constants/icons';

describe('Icon', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = ({ iconName = 'check', props = {}, listeners = {} } = {}) =>
      shallowMount(Icon, {
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
    expect(wrapper.vm.height).toEqual(16);
    expect(wrapper.vm.width).toEqual(16);
  });

  describe('computed', () => {
    describe('defaultData', () => {
      [{
        description: 'return an default data',
        iconName: 'close',
        expectedResult: {
          staticClass: 'icon',
          class: {
            'icon--disabled': false,
            'icon--link': false,
          },
          attrs: {
            'aria-hidden': true,
            'aria-label': undefined,
            height: 16,
            role: 'img',
            viewBox: '0 0 320 512',
            width: 16,
            xmlns: 'http://www.w3.org/2000/svg',
          },
          on: {},
        },
      }, {
        description: 'return data as a button if clickable',
        iconName: 'close',
        listeners: { click: jest.fn() },
        expectedResult: {
          staticClass: 'icon',
          class: {
            'icon--disabled': false,
            'icon--link': true,
          },
          attrs: {
            'aria-hidden': true,
            'aria-label': undefined,
            height: 16,
            role: 'img',
            viewBox: '0 0 320 512',
            width: 16,
            xmlns: 'http://www.w3.org/2000/svg',
          },
          on: {
            click: expect.any(Function),
          },
        },
      }].forEach(({ description, iconName, listeners, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ iconName, listeners });
          expect(wrapper.vm.defaultData).toEqual(expectedResult);
        });
      });
    });
  });

  describe('methods', () => {
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
});
