import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import overlayable from '@/mixins/overlayable';

describe('overlayable', () => {
  let mountComponent;
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [overlayable],
    template: '<div class="overlayable" style="z-index:200;"></div>',
    props: ['activeZIndex'],
  });

  beforeEach(() => {
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation(cb => cb());
    mountComponent = ({ props, methods } = {}) => shallowMount(EmptyComponent, {
      propsData: props,
      methods,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.overlay).toEqual(undefined);
  });

  describe('beforeDestroy', () => {
    it('should remove overlay', () => {
      const cb = jest.fn();
      const wrapper = mountComponent({
        methods: { removeOverlay: cb },
      });
      wrapper.destroy();

      expect(cb).toHaveBeenCalled();
    });
  });

  describe('methods', () => {
    describe('genOverlay', () => {
      it('should mount GOverlay and append it to body', () => {
        const wrapper = mountComponent();
        wrapper.setProps({ activeZIndex: '1050' });
        wrapper.vm.genOverlay();

        expect(wrapper.vm.overlay).toBeDefined();
        expect(wrapper.vm.overlay.zIndex).toEqual('1049');
        expect(document.body.querySelectorAll('.vd-overlay').length).toEqual(1);
      });

      it('should mount GOverlay once', () => {
        const wrapper = mountComponent();
        wrapper.setProps({ activeZIndex: '1050' });
        wrapper.vm.genOverlay();
        wrapper.vm.genOverlay();

        expect(wrapper.vm.overlay).toBeDefined();
        expect(wrapper.vm.overlay.zIndex).toEqual('1049');
        expect(document.body.querySelectorAll('.vd-overlay').length).toEqual(1);
      });

      it('should use element zIndex if activeZIndex is undefined', () => {
        const wrapper = mountComponent();
        wrapper.setProps({ activeZIndex: undefined });

        wrapper.vm.genOverlay();

        expect(wrapper.vm.overlay).toBeDefined();
        expect(wrapper.vm.overlay.zIndex).toEqual(200);
        expect(document.body.querySelectorAll('.vd-overlay').length).toEqual(1);
      });

      it('should not set zIndex if activeZIndex or $el z-index isnt defined', () => {
        const wrapper = mountComponent();
        wrapper.setProps({ activeZIndex: undefined });
        wrapper.element.style.zIndex = null;

        wrapper.vm.genOverlay();

        expect(wrapper.vm.overlay).toBeDefined();
        expect(wrapper.vm.overlay.zIndex).toEqual(0);
        expect(document.body.querySelectorAll('.vd-overlay').length).toEqual(1);
      });
    });

    describe('removeOverlay', () => {
      it('should only remove wheel & keydown listener if overlay undefined', () => {
        jest.spyOn(global, 'removeEventListener');
        const wrapper = mountComponent();
        wrapper.setProps({ activeZIndex: '1050' });

        expect(wrapper.vm.overlay).toBeFalsy();

        wrapper.destroy();
        expect(wrapper.vm.overlay).toBeFalsy();
        expect(window.removeEventListener).toHaveBeenCalledTimes(2);
      });

      it('should remove GOverlay if defined and mounted', () => {
        const wrapper = mountComponent();
        wrapper.setProps({ activeZIndex: '1050' });
        wrapper.vm.genOverlay();

        expect(wrapper.vm.overlay).toBeDefined();
        expect(document.body.querySelectorAll('.vd-overlay').length).toEqual(1);

        wrapper.destroy();

        const event = new Event('transitionend');
        wrapper.vm.overlay.$el.dispatchEvent(event);
        expect(wrapper.vm.overlay).toBeFalsy();
        expect(document.body.querySelectorAll('.vd-overlay').length).toEqual(0);
      });
    });
  });

  describe('behaviour', () => {
    it('should avoid removing overlay', () => {
      const wrapper = mountComponent();
      wrapper.vm.genOverlay();

      expect(wrapper.vm.overlay).toBeTruthy();

      wrapper.vm.removeOverlay();
      // Simular overlay being rapidly opened/closed
      wrapper.vm.overlay.value = true;

      const event = new Event('transitionend');

      wrapper.vm.overlay.$el.dispatchEvent(event);
      expect(wrapper.vm.overlay).toBeTruthy();

      wrapper.vm.removeOverlay();

      wrapper.vm.overlay.$el.dispatchEvent(event);
      expect(wrapper.vm.overlay).toBeFalsy();
    });

    it('should get root element z-index if activeIndex is not available', () => {
      const wrapper = mountComponent();
      wrapper.vm.$el.style.zIndex = 8;

      wrapper.vm.genOverlay();
      expect(wrapper.vm.overlay.zIndex).toBe(8);
    });
  });
});
