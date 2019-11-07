import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import toggleable from '@/mixins/toggleable';

describe('toggleable', () => {
  let mountComponent;
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [toggleable],
    template: '<div class="toggleable"></div>',
  });

  beforeEach(() => {
    mountComponent = ({ value = false } = {}) => shallowMount(EmptyComponent, {
      propsData: {
        value,
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
    expect(wrapper.vm.isActive).toEqual(false);
  });

  describe('watch', () => {
    describe('value', () => {
      it.each([
        [true, true],
        [false, false],
      ])(
        'When value props = %p, should update isVisible to %p',
        (value, expectedResult) => {
          const wrapper = mountComponent({ value });
          expect(wrapper.vm.isActive).toEqual(expectedResult);
        }
      );
    });

    describe('isActive', () => {
      it('when isActive is equal to value, should do nothing', () => {
        const wrapper = mountComponent({ value: true });
        expect(wrapper.emitted().input).toBeFalsy();
      });

      it('when isActive is equal to value, should do nothing', () => {
        const wrapper = mountComponent({ value: true });

        wrapper.setData({ isActive: false });
        expect(wrapper.emitted().input).toBeTruthy();
      });
    });
  });
});
