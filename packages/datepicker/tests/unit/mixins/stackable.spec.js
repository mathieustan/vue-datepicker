import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import stackable from '@/mixins/stackable';

describe('stackable', () => {
  let mountComponent;
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [stackable],
    props: ['isActive'],
    template: '<div class="stackable"></div>',
  });

  beforeEach(() => {
    mountComponent = () => shallowMount(EmptyComponent);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    document.body.innerHTML = '';
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.stackMinZIndex).toEqual(1000);
  });

  describe('computed', () => {
    describe('activeZIndex', () => {
      it('should return 0 if content isnt defined', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.activeZIndex).toEqual(0);
      });

      it('should return zIndex from content when NOT active', () => {
        const content = document.createElement('div');
        document.body.appendChild(content);

        const wrapper = mountComponent();
        wrapper.vm.$refs = { content };
        expect(wrapper.vm.activeZIndex).toEqual(0);
      });

      it('should return zIndex + 2 from content when active', () => {
        const content = document.createElement('div');
        document.body.appendChild(content);

        const wrapper = mountComponent();
        wrapper.setProps({ isActive: true });
        wrapper.vm.$refs = { content };
        expect(wrapper.vm.activeZIndex).toEqual(1002);
      });

      it('should increase zIndex if there is another menu active', () => {
        const content = document.createElement('div');
        const anotherMenu = document.createElement('div');
        anotherMenu.setAttribute('class', 'menu__content--active');
        anotherMenu.style.zIndex = 1002;

        document.body.appendChild(content);
        document.body.appendChild(anotherMenu);

        const wrapper = mountComponent();
        wrapper.setProps({ isActive: true });
        wrapper.vm.$refs = { content };
        expect(wrapper.vm.activeZIndex).toEqual(1004);
      });
    });
  });
});
