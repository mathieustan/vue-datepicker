import Vue from 'vue';
import * as bodyScrollLockFunctions from 'body-scroll-lock';
import { shallowMount } from '@vue/test-utils';
import dynamicPosition from '@/mixins/dynamicPosition';

import * as utilsFunctions from '@/utils/positions';

jest.mock('body-scroll-lock', () => ({
  disableBodyScroll: jest.fn(),
  enableBodyScroll: jest.fn(),
  clearAllBodyScrollLocks: jest.fn(),
}));

describe('dynamicPosition', () => {
  let mountComponent;
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [dynamicPosition],
    props: ['fullscreenMobile', 'isVisible'],
    template: '<div></div>',
  });

  beforeEach(() => {
    jest.spyOn(utilsFunctions, 'getDynamicPosition').mockReturnValue({
      top: 0,
      left: 0,
      origin: 'origin',
    });
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
    mountComponent = ({
      fullscreenMobile = false,
      isVisible = false,
    } = {}) => shallowMount(EmptyComponent, {
      propsData: {
        fullscreenMobile,
        isVisible,
      },
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
    expect(wrapper.vm.offset).toEqual(28);
    expect(wrapper.vm.left).toEqual(0);
    expect(wrapper.vm.top).toEqual(0);
    expect(wrapper.vm.origin).toEqual('top center');
  });

  describe('computed', () => {
    describe('styles', () => {
      it('should return styles from data', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.styles).toEqual({
          top: '0px',
          left: '0px',
          transformOrigin: 'top center',
        });
      });
    });
  });

  describe('mounted', () => {
    it('should init listeners', () => {
      const wrapper = mountComponent({ isVisible: true });
      wrapper.destroy();
      expect(bodyScrollLockFunctions.clearAllBodyScrollLocks).toHaveBeenCalledWith();
    });
  });

  describe('methods', () => {
    describe('initResizeListener', () => {
      it('should init resize listener', () => {
        jest.spyOn(window, 'addEventListener').mockImplementation((type, cb) => cb());

        const wrapper = mountComponent({ isVisible: true });
        wrapper.vm.initResizeListener();
        jest.spyOn(wrapper.vm, 'updatePosition').mockReturnValue(true);

        expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
      });
    });

    describe('removeResizeListener', () => {
      it('should init resize listener', () => {
        jest.spyOn(window, 'removeEventListener').mockReturnValue(true);

        const wrapper = mountComponent({ isVisible: true });
        wrapper.vm.removeResizeListener();

        jest.spyOn(wrapper.vm, 'updatePosition').mockReturnValue(true);

        expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
      });
    });

    describe('updatePosition', () => {
      it('should call getDynamicPosition & update windowWidth', () => {
        const wrapper = mountComponent();

        wrapper.vm.updatePosition();
        expect(utilsFunctions.getDynamicPosition).toHaveBeenCalled();
      });

      it('should lock body scroll if fullscreenMobile equal true & innerWidth < 768', () => {
        const wrapper = mountComponent({ fullscreenMobile: true, isVisible: true });
        wrapper.vm.$refs = { content: wrapper.element };
        global.innerWidth = 479;
        wrapper.vm.updatePosition();

        expect(bodyScrollLockFunctions.disableBodyScroll).toHaveBeenCalledWith(wrapper.element);

        global.innerWidth = 1000;
        wrapper.vm.updatePosition();

        expect(bodyScrollLockFunctions.enableBodyScroll).toHaveBeenCalledWith(wrapper.element);
      });
    });
  });
});
