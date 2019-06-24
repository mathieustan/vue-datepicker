import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import detachable from '@/mixins/detachable';

console.error = jest.fn();

describe('detachable', () => {
  let mountComponent;
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [detachable],
    props: ['fullscreenMobile', 'isVisible'],
    template: '<div class="detachabled"></div>',
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
    expect(wrapper.vm.hasDetached).toEqual(false);
  });

  describe('beforeDestroy', () => {
    it('should do nothing if $refs.content isn\'t defined', () => {
      const wrapper = mountComponent();
      wrapper.destroy();

      expect(wrapper.vm.$refs.content).toEqual(undefined);
    });

    it('should remove element from Dom ONLY OF $refs.content is defined', () => {
      const wrapper = mountComponent();
      wrapper.vm.$refs = {
        content: {
          parentNode: { removeChild: jest.fn(() => true) },
        },
      };

      wrapper.destroy();
      expect(wrapper.vm.$refs.content.parentNode.removeChild).toHaveBeenCalled();
    });
  });

  describe('methods', () => {
    describe('initDetach', () => {
      it('should not detach if $refs.content not defined', () => {
        const wrapper = mountComponent();

        wrapper.vm.initDetach();
        expect(wrapper.vm.hasDetached).toEqual(false);
      });

      it('should detach if $refs.content is defined, and insert content into #app', () => {
        const wrapper = mountComponent();

        const body = document.querySelector('body');
        const divApp = document.createElement('div');
        divApp.setAttribute('id', 'app');
        body.appendChild(divApp);

        wrapper.vm.$refs = { content: wrapper.element };

        wrapper.vm.initDetach();
        expect(wrapper.vm.hasDetached).toEqual(true);
      });
    });
  });
});
