import Vue from 'vue';
import { mount } from '@vue/test-utils';
import VDIcon from '@/components/VDIcon';
import detachable from '@/mixins/detachable';

console.error = jest.fn();

const defaultVDIconHtml =
'<div class="mock">' +
  '<div class="content">' +
    '<span aria-hidden="true" class="vd-icon">' +
      '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" role="img" aria-hidden="true" data-icon="fa fa-test"><path fill="currentColor"></path></svg>' +
    '</span>' +
  '</div>' +
'</div>';

describe('detachable', () => {
  let mountComponent;
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [detachable],
    props: ['fullscreenMobile', 'isVisible'],
    template: '<div class="detachabled"></div>',
  });

  beforeEach(() => {
    mountComponent = ({
      slots,
      attachToDocument,
      props = {},
      render = function (h) {
        const content = h('div', {
          staticClass: 'content',
          ref: 'content',
        });

        return h('div', {
          staticClass: 'mock',
        }, [this.$slots.default, content]);
      },
    } = {}) => mount(EmptyComponent, {
      slots,
      propsData: props,
      attachToDocument,
      render,
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
    expect(wrapper.vm.hasDetached).toEqual(false);
  });

  describe('beforeMount', () => {
    it('should do nothing if activatorNode is undefined', async () => {
      const wrapper = mountComponent({
        slots: {
          activator: [{
            render: h => h(VDIcon, ['fa fa-test']),
          }],
        },
        render (h) {
          const content = h('div', {
            staticClass: 'content',
            ref: 'content',
          }, [this.$slots.activator]);

          return h('div', {
            staticClass: 'mock',
          }, [content]);
        },
      });

      expect(wrapper.html()).toEqual(defaultVDIconHtml);

      await wrapper.vm.$nextTick();
      expect(wrapper.html()).toEqual(defaultVDIconHtml);
    });

    it('should do nothing if wrapper does not have parent', async () => {
      const wrapper = mountComponent({
        slots: {
          activator: [{
            render: h => h(VDIcon, ['fa fa-test']),
          }],
        },
        render (h) {
          return h('div', {
            staticClass: 'content',
            ref: 'content',
          }, [this.$slots.activator]);
        },
      });
      wrapper.setData({ activatorNode: wrapper.vm.$slots.activator });

      expect(wrapper.html()).toEqual(
        '<div class="content">' +
          '<span aria-hidden="true" class="vd-icon">' +
            '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" role="img" aria-hidden="true" data-icon="fa fa-test"><path fill="currentColor"></path></svg>' +
          '</span>' +
        '</div>'
      );

      await wrapper.vm.$nextTick();
      expect(wrapper.html()).toEqual(
        '<div class="content">' +
          '<span aria-hidden="true" class="vd-icon">' +
            '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" role="img" aria-hidden="true" data-icon="fa fa-test"><path fill="currentColor"></path></svg>' +
          '</span>' +
        '</div>'
      );
    });

    it('should remove activator from wrapper', async () => {
      const wrapper = mountComponent({
        attachToDocument: true,
        slots: {
          activator: [{
            render: h => h(VDIcon, ['fa fa-test']),
          }],
        },
        render (h) {
          const content = h('div', {
            staticClass: 'content',
            ref: 'content',
          }, [this.$slots.activator]);

          return h('div', {
            staticClass: 'mock',
          }, [content]);
        },
      });
      wrapper.setData({ activatorNode: wrapper.vm.$slots.activator });

      expect(wrapper.html()).toEqual(defaultVDIconHtml);

      await wrapper.vm.$nextTick();
      expect(wrapper.html()).toEqual(
        '<div class="mock"><div class="content"></div></div>'
      );
    });

    it('should remove activator from properly if there are other divs', async () => {
      const divApp = document.createElement('div');
      divApp.setAttribute('id', 'app');
      document.body.appendChild(divApp);

      const wrapper = mountComponent({
        attachToDocument: true,
        slots: {
          activator: [{
            render: h => h(VDIcon, ['fa fa-test']),
          }],
        },
        render (h) {
          const content = h('div', {
            staticClass: 'content',
            ref: 'content',
          }, [this.$slots.activator]);

          return h('div', {
            staticClass: 'mock',
          }, [content]);
        },
      });
      wrapper.setData({ activatorNode: wrapper.vm.$slots.activator });

      expect(wrapper.html()).toEqual(defaultVDIconHtml);

      await wrapper.vm.$nextTick();
      expect(wrapper.html()).toEqual(
        '<div class="mock"><div class="content"></div></div>'
      );
    });
  });

  describe('beforeDestroy', () => {
    it('should do nothing if $refs.content isn\'t defined', () => {
      const wrapper = mountComponent();
      wrapper.destroy();

      expect(wrapper.vm.$refs.content).toEqual(undefined);
    });

    it('should remove element from Dom ONLY IF $refs.content is defined', () => {
      const wrapper = mountComponent();
      wrapper.vm.$refs = {
        content: {
          parentNode: { removeChild: jest.fn(() => true) },
        },
      };

      wrapper.destroy();
      expect(wrapper.vm.$refs.content.parentNode.removeChild).toHaveBeenCalled();
    });

    it('should remove activatorNode if defined', async () => {
      const wrapper = mountComponent({
        attachToDocument: true,
        slots: {
          activator: [{
            render: h => h(VDIcon, ['fa fa-test']),
          }],
        },
        render (h) {
          const content = h('div', {
            staticClass: 'content',
            ref: 'content',
          }, [this.$slots.activator]);

          return h('div', {
            staticClass: 'mock',
          }, [content]);
        },
      });
      wrapper.setData({ activatorNode: wrapper.vm.$slots.activator });

      await wrapper.vm.$nextTick();
      expect(document.body.querySelector('vd-icon')).toBeDefined();

      wrapper.destroy();
      expect(document.body.querySelector('vd-icon')).toEqual(null);
    });
  });

  describe('methods', () => {
    describe('initDetach', () => {
      it('should not detach if $refs.content not defined', () => {
        const wrapper = mountComponent();
        delete wrapper.vm.$refs.content;

        wrapper.vm.initDetach();
        expect(wrapper.vm.hasDetached).toEqual(false);
      });

      it('should return an error if attach isnt found', () => {
        const body = document.querySelector('body');
        const divApp = document.createElement('div');
        divApp.setAttribute('id', 'app');
        body.appendChild(divApp);

        const wrapper = mountComponent({ props: { attach: 'test' } });
        wrapper.vm.$refs = { content: wrapper.element };

        wrapper.vm.initDetach();
        expect(wrapper.vm.hasDetached).toEqual(false);
      });

      it('When $refs.content is defined, Should insert content into body', () => {
        const body = document.querySelector('body');
        const divApp = document.createElement('div');
        divApp.setAttribute('id', 'app');
        body.appendChild(divApp);

        const wrapper = mountComponent();
        wrapper.vm.$refs = { content: wrapper.element };

        wrapper.vm.initDetach();
        expect(wrapper.vm.hasDetached).toEqual(true);
      });

      it('When $refs.content is defined, Should insert content into specified div', () => {
        const body = document.querySelector('body');
        const divApp = document.createElement('div');
        divApp.setAttribute('id', 'app');
        body.appendChild(divApp);

        const wrapper = mountComponent({ props: { attach: divApp } });
        wrapper.vm.$refs = { content: wrapper.element };

        wrapper.vm.initDetach();
        expect(wrapper.vm.hasDetached).toEqual(true);
      });
    });
  });

  describe('behaviour', () => {
    beforeEach(() => {
      const divApp = document.createElement('div');
      divApp.setAttribute('id', 'app');
      document.body.appendChild(divApp);
    });

    it('should attach and detach', () => {
      const wrapper = mountComponent({
        attachToDocument: true,
        props: { attach: '' },
        slots: {
          default: [{
            render: h => h('div', { staticClass: 'foo' }),
          }],
        },
      });

      expect(wrapper.vm.initDetach()).toBeUndefined();

      wrapper.setProps({ attach: true });
      expect(wrapper.vm.initDetach()).toBeUndefined();

      wrapper.setProps({ attach: '#app' });
      wrapper.vm.initDetach();
      expect(wrapper.vm.hasDetached).toBe(true);

      wrapper.setData({ hasDetached: false });
      wrapper.setProps({ attach: '.foo' });
      wrapper.vm.initDetach();
      expect(wrapper.vm.hasDetached).toBe(true);

      wrapper.setData({ hasDetached: false });
      wrapper.setProps({ attach: '.bar' });
      wrapper.vm.initDetach();
      expect(console.error).toHaveBeenCalledWith(`Unable to locate target '.bar'`, wrapper.vm);

      delete wrapper.vm.$refs.content;
      wrapper.vm.$destroy();
    });

    it('should attach and detach with activatorNode', () => {
      const wrapper = mountComponent({
        attachToDocument: true,
        slots: {
          default: [{
            render: h => h('div', { staticClass: 'foo' }),
          }],
        },
      });

      const foo = wrapper.find('.foo');
      wrapper.setData({ activatorNode: foo });

      wrapper.vm.initDetach();
      expect(wrapper.vm.hasDetached).toBe(true);

      wrapper.vm.$destroy();
    });
  });
});
