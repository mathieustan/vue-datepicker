import { shallowMount } from '@vue/test-utils';
import VDOverlay from '@/components/VDOverlay';

describe('VDOverlay', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = ({ props = {}, slots } = {}) =>
      shallowMount(VDOverlay, {
        propsData: props,
        slots,
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
    expect(wrapper.vm.isActive).toBeTruthy();
  });

  describe('computed', () => {
    describe('classes', () => {
      [{
        description: 'return all classes to false by default',
        props: {},
        expectedResult: {
          'vd-overlay--absolute': false,
          'vd-overlay--active': true,
        },
      }, {
        description: 'return some classes to true',
        props: {
          absolute: true,
        },
        expectedResult: {
          'vd-overlay--absolute': true,
          'vd-overlay--active': true,
        },
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.classes).toEqual(expectedResult);
        });
      });
    });

    describe('computedOpacity', () => {
      [{
        description: 'return default or props opacity when active',
        props: { opacity: 0.7 },
        expectedResult: 0.7,
      }, {
        description: 'return 0 when inactive',
        props: { opacity: 0.7 },
        data: {
          isActive: false,
        },
        expectedResult: 0,
      }].forEach(({ description, props, data, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          wrapper.setData({ ...data });
          expect(wrapper.vm.computedOpacity).toEqual(expectedResult);
        });
      });
    });
  });
});
