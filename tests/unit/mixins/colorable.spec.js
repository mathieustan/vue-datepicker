import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import colorable from '@/mixins/colorable';

describe('colorable', () => {
  let mountComponent;
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [colorable],
    template: '<div class="colorable"></div>',
  });

  beforeEach(() => {
    mountComponent = () => shallowMount(EmptyComponent);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.color).toEqual(undefined);
  });

  describe('methods', () => {
    describe('setBackgroundColor', () => {
      it.each([
        ['color', undefined],
        ['#fff', { 'background-color': '#fff', 'border-color': '#fff' }],
      ])(
        'When color = %p, should return data = %p',
        (color, expectedResult) => {
          const wrapper = mountComponent();
          expect(wrapper.vm.setBackgroundColor(color)).toEqual(expectedResult);
        }
      );
    });

    describe('setTextColor', () => {
      it.each([
        ['color', undefined],
        ['#fff', { 'color': '#fff' }],
      ])(
        'When color = %p, should return data = %p',
        (color, expectedResult) => {
          const wrapper = mountComponent();
          expect(wrapper.vm.setTextColor(color)).toEqual(expectedResult);
        }
      );
    });
  });
});
