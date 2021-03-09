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
      [{
        description: 'return undefined if color isn\'t a css color',
        color: 'color',
        data: undefined,
        expectedResult: undefined,
      }, {
        description: 'return style for background-color if data is undefined',
        color: '#FFFFFF',
        data: undefined,
        expectedResult: { 'background-color': '#FFFFFF', 'border-color': '#FFFFFF' },
      }, {
        description: 'return merged data with style',
        color: '#FFFFFF',
        data: { staticClass: 'class' },
        expectedResult: {
          staticClass: 'class',
          style: { 'background-color': '#FFFFFF', 'border-color': '#FFFFFF' },
        },
      }].forEach(({ description, color, data, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent();
          expect(wrapper.vm.setBackgroundColor(color, data)).toEqual(expectedResult);
        });
      });
    });

    describe('setTextColor', () => {
      [{
        description: 'return undefined if color isn\'t a css color',
        color: 'color',
        data: undefined,
        expectedResult: undefined,
      }, {
        description: 'return style for color if data is undefined',
        color: '#FFFFFF',
        data: undefined,
        expectedResult: { color: '#FFFFFF' },
      }, {
        description: 'return merged data with style',
        color: '#FFFFFF',
        data: { staticClass: 'class' },
        expectedResult: {
          staticClass: 'class',
          style: { color: '#FFFFFF' },
        },
      }].forEach(({ description, color, data, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent();
          expect(wrapper.vm.setTextColor(color, data)).toEqual(expectedResult);
        });
      });
    });
  });
});
