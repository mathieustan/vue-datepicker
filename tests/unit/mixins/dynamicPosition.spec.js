import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import dynamicPosition from '@/mixins/dynamicPosition';

import * as utilsFunctions from '@/utils/positions';

describe('dynamicPosition', () => {
  let mountComponent;
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [dynamicPosition],
    props: ['activator', 'attach', 'allowOverflow', 'disabled'],
    template: '<div></div>',
  });

  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
    mountComponent = ({ slots, scopedSlots, props = {}, methods } = {}) => shallowMount(EmptyComponent, {
      slots,
      scopedSlots,
      propsData: props,
      methods,
    });
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.activatorFixed).toEqual(false);
    expect(wrapper.vm.dimensions).toEqual({
      activator: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        offsetTop: 0,
        scrollHeight: 0,
        offsetLeft: 0,
      },
      content: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        offsetTop: 0,
        scrollHeight: 0,
      },
    });
    expect(wrapper.vm.isContentActive).toEqual(false);
    expect(wrapper.vm.pageWidth).toEqual(0);
    expect(wrapper.vm.pageYOffset).toEqual(0);
  });

  describe('computed', () => {
    describe('isAttached', () => {
      [{
        description: 'return false by default',
        props: { attach: false },
        expectedResult: false,
      }, {
        description: 'return true if attach is defined',
        props: {
          attach: 'div',
        },
        expectedResult: true,
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.isAttached).toEqual(expectedResult);
        });
      });
    });

    describe('computedLeft', () => {
      [{
        description: 'return 0 by default',
        props: { attach: false },
        data: {},
        expectedResult: 0,
      }, {
        description: 'return activator left position if not attached',
        props: { attach: false },
        data: {
          dimensions: {
            activator: { left: 100, offsetLeft: 200 },
          },
        },
        expectedResult: 100,
      }, {
        description: 'return activator offsetLeft position if attached',
        props: { attach: 'something' },
        data: {
          dimensions: {
            activator: { left: 100, offsetLeft: 200 },
          },
        },
        expectedResult: 200,
      }].forEach(({ description, props, data, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          wrapper.setData({ ...data });
          expect(wrapper.vm.computedLeft).toEqual(expectedResult);
        });
      });
    });

    describe('computedTop', () => {
      [{
        description: 'return 0 by default',
        props: { attach: false },
        data: {},
        expectedResult: 0,
      }, {
        description: 'return activator top position if not attached',
        props: { attach: false },
        data: {
          dimensions: {
            activator: { top: 100, offsetTop: 200 },
          },
        },
        expectedResult: 100,
      }, {
        description: 'return activator offsetTop position if attached',
        props: { attach: 'something' },
        data: {
          dimensions: {
            activator: { top: 100, offsetTop: 200 },
          },
        },
        expectedResult: 200,
      }].forEach(({ description, props, data, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          wrapper.setData({ ...data });
          expect(wrapper.vm.computedTop).toEqual(expectedResult);
        });
      });
    });

    describe('hasActivator', () => {
      it('should return true if $slot.activator is defined', () => {
        const wrapper = mountComponent({
          slots: { activator: '<button class="activator"></button>' },
        });
        expect(wrapper.vm.hasActivator).toEqual(true);
      });

      it('should return true if $scopedSlots.activator is defined', () => {
        const wrapper = mountComponent({
          scopedSlots: { activator: '<button class="activator"></button>' },
        });
        expect(wrapper.vm.hasActivator).toEqual(true);
      });

      it('should return true if activator props is defined', () => {
        const wrapper = mountComponent({
          props: { activator: '<button class="activator"></button>' },
        });
        expect(wrapper.vm.hasActivator).toEqual(true);
      });
    });
  });

  describe('watch', () => {
    describe('disabled', () => {
      it('should desactivate menu when disabled props change to true', () => {
        const wrapper = mountComponent();
        wrapper.setData({ isContentActive: true });
        wrapper.setProps({ disabled: true });

        expect(wrapper.vm.isContentActive).toEqual(false);
      });
    });
  });

  describe('methods', () => {
    describe('callDeactivate', () => {
      it('should close menu', () => {
        const wrapper = mountComponent();
        wrapper.setData({ isContentActive: true });
        wrapper.vm.callDeactivate();

        expect(wrapper.vm.isContentActive).toEqual(false);
      });
    });

    describe('calcLeft', () => {
      [{
        description: 'return scrollbarWidth if left is less',
        props: { attach: false },
        data: {
          pageWidth: 800,
        },
        menuWidth: 300,
        expectedResult: '12px',
      }, {
        description: 'return 0 pageWidth is too small',
        props: { attach: false },
        data: {
          pageWidth: 300,
          dimensions: {
            activator: { left: 100, offsetLeft: 0 },
          },
        },
        menuWidth: 300,
        expectedResult: '0px',
      }, {
        description: 'return activator left position if not attached',
        props: { attach: false },
        data: {
          pageWidth: 800,
          dimensions: {
            activator: { left: 100, offsetLeft: 0 },
          },
        },
        menuWidth: 300,
        expectedResult: '100px',
      }, {
        description: 'return activator offsetLeft position if attached',
        props: { attach: 'something' },
        data: {
          pageWidth: 800,
          dimensions: {
            activator: { left: 100, offsetLeft: 200 },
          },
        },
        menuWidth: 300,
        expectedResult: '200px',
      }].forEach(({ description, props, data, menuWidth, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          wrapper.setData({ ...data });
          expect(wrapper.vm.calcLeft(menuWidth)).toEqual(expectedResult);
        });
      });
    });

    describe('calcTop', () => {
      [{
        description: 'return 12px by default',
        props: { attach: false },
        data: {
          pageYOffset: 0,
        },
        clientHeight: 800,
        expectedResult: '12px',
      }, {
        description: 'return activator top position if not attached',
        props: { attach: false },
        data: {
          pageYOffset: 0,
          dimensions: {
            activator: { top: 100, offsetTop: 0, height: 50 },
          },
        },
        clientHeight: 800,
        expectedResult: '150px', // top + height + pageYOffset
      }, {
        description: 'return activator offsetTop position if attached',
        props: {
          attach: 'something',
        },
        data: {
          pageYOffset: 0,
          dimensions: {
            activator: { top: 100, offsetTop: 200, height: 50 },
          },
        },
        clientHeight: 800,
        expectedResult: '250px',
      }, {
        description: 'place above if there is not enought height bellow',
        props: { attach: false },
        data: {
          pageYOffset: 100,
          dimensions: {
            activator: { top: 700, offsetTop: 0, height: 50 },
            content: { height: 200 },
          },
        },
        clientHeight: 800,
        expectedResult: '600px',
      }, {
        description: 'overflow bottom',
        props: { attach: false, allowOverflow: false },
        data: {
          pageYOffset: 50,
          dimensions: {
            activator: { top: 100, offsetTop: 0, height: 50 },
            content: { height: 200 },
          },
        },
        clientHeight: 300,
        expectedResult: '138px',
      }, {
        description: 'overflow top',
        props: { attach: false, allowOverflow: false },
        data: {
          pageYOffset: 50,
          dimensions: {
            activator: { top: -100, offsetTop: 0, height: 50 },
            content: { height: 200 },
          },
        },
        clientHeight: 800,
        expectedResult: '62px',
      }].forEach(({ description, props, data, clientHeight, expectedResult }) => {
        it(`should ${description}`, () => {
          jest.spyOn(utilsFunctions, 'getInnerHeight').mockReturnValue(clientHeight);
          const wrapper = mountComponent({ props });
          wrapper.setData({ ...data });
          expect(wrapper.vm.calcTop()).toEqual(expectedResult);
        });
      });
    });

    describe('checkForPageYOffset', () => {
      [{
        description: 'return 0 if activator is fixed',
        props: { attach: false },
        data: {
          activatorFixed: true,
        },
        expectedResult: 0,
      }, {
        description: 'return offsetTop if activator isnt fixed',
        props: { attach: false },
        data: {
          activatorFixed: false,
        },
        expectedResult: 200,
      }].forEach(({ description, props, data, expectedResult }) => {
        it(`should ${description}`, () => {
          jest.spyOn(utilsFunctions, 'getOffsetTop').mockReturnValue(200);
          const wrapper = mountComponent({ props });
          wrapper.setData({ ...data });
          wrapper.vm.checkForPageYOffset();
          expect(wrapper.vm.pageYOffset).toEqual(expectedResult);
        });
      });
    });

    describe('checkActivatorFixed', () => {
      it('should return false if attach is defined', () => {
        const wrapper = mountComponent({
          props: { attach: 'div' },
          methods: {
            getActivator () {
              const activator = document.createElement('div');
              activator.style.position = 'fixed';
              return activator;
            },
          },
        });
        wrapper.vm.checkActivatorFixed();
        expect(wrapper.vm.activatorFixed).toEqual(false);
      });

      it('should return true if activator element is fixed', () => {
        const wrapper = mountComponent({
          props: { attach: false },
          methods: {
            getActivator () {
              const activator = document.createElement('div');
              activator.style.position = 'fixed';
              return activator;
            },
          },
        });
        wrapper.vm.checkActivatorFixed();
        expect(wrapper.vm.activatorFixed).toEqual(true);
      });
    });

    describe('sneakPeek', () => {
      it('should call a callback if element isnt defined', () => {
        const wrapper = mountComponent();
        const callback = jest.fn();
        wrapper.vm.$refs.content = undefined;

        wrapper.vm.sneakPeek(callback);

        expect(callback).toHaveBeenCalled();
      });

      it('should call a callback if element is defined and visible', () => {
        const wrapper = mountComponent();
        const callback = jest.fn();
        wrapper.vm.$refs.content = document.createElement('div');
        wrapper.vm.$refs.content.style.display = 'flex';

        wrapper.vm.sneakPeek(callback);

        expect(callback).toHaveBeenCalled();
      });

      it('should call a callback if element is defined and hidden', () => {
        const wrapper = mountComponent();
        const callback = jest.fn();
        wrapper.vm.$refs.content = document.createElement('div');
        wrapper.vm.$refs.content.style.display = 'none';

        wrapper.vm.sneakPeek(callback);

        expect(callback).toHaveBeenCalled();
      });
    });

    describe('updateDimensions', () => {
      it('should not init activator & content dimensions if there is no activator', () => {
        const defaultDimensions = { top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 };
        const wrapper = mountComponent({
          props: { attach: false },
          methods: {
            getActivator () {
              return;
            },
          },
        });

        wrapper.vm.updateDimensions();
        expect(wrapper.vm.dimensions).toEqual({
          activator: { ...defaultDimensions, offsetLeft: 0, offsetTop: 0, scrollHeight: 0 },
          content: { ...defaultDimensions, offsetTop: 0, scrollHeight: 0 },
        });
      });

      it('should init activator & content dimensions', () => {
        const fakeDimensions = {
          top: 100,
          left: 102,
          bottom: 100,
          right: 100,
          width: 100,
          height: 100,
        };

        jest.spyOn(utilsFunctions, 'measure').mockReturnValue(fakeDimensions);
        const wrapper = mountComponent({
          props: { attach: false },
          methods: {
            getActivator () {
              const activator = document.createElement('div');
              return activator;
            },
          },
        });

        wrapper.vm.updateDimensions();
        expect(wrapper.vm.dimensions).toEqual({
          activator: fakeDimensions,
          content: fakeDimensions,
        });
      });

      it('should init activator & content dimensions with offsetTop if attached', () => {
        const fakeDimensions = {
          offsetTop: 100,
          top: 100,
          left: 102,
          bottom: 100,
          right: 100,
          width: 100,
          height: 100,
        };

        jest.spyOn(utilsFunctions, 'measure').mockReturnValue(fakeDimensions);
        const wrapper = mountComponent({
          props: { attach: 'body' },
          methods: {
            getActivator () {
              const activator = document.createElement('div');
              return activator;
            },
          },
        });

        wrapper.vm.updateDimensions();
        expect(wrapper.vm.dimensions).toEqual({
          activator: fakeDimensions,
          content: fakeDimensions,
        });
      });
    });
  });
});
