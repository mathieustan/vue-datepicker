import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import activatable from '@/mixins/activatable';

jest.spyOn(console, 'error').mockReturnValue(true);

describe('activatable', () => {
  let mountComponent;
  let vm = new Vue();
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [activatable],
    data: () => ({ isActive: false }),
    template: '<div class="activatable"></div>',
  });

  beforeEach(() => {
    mountComponent = (props) => shallowMount(EmptyComponent, props);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    document.body.innerHTML = '';
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.activatorElement).toEqual(undefined);
    expect(wrapper.vm.activatorNode).toEqual([]);
  });

  describe('watch', () => {
    it('should reset activator when change', async () => {
      const DOMelement = document.createElement('button');
      DOMelement.id = 'activator';
      document.body.appendChild(DOMelement);
      const anotherDOMelement = document.createElement('button');
      anotherDOMelement.id = 'activator_2';
      document.body.appendChild(anotherDOMelement);

      const wrapper = mountComponent({
        propsData: {
          activator: '#activator',
        },
      });

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.activatorElement).toEqual(DOMelement);

      wrapper.setProps({ activator: '#activator_2' });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.activatorElement).toEqual(anotherDOMelement);
    });
  });

  describe('mounted', () => {
    it('should warn when activator hasn\'t got a scope', () => {
      mountComponent({
        slots: {
          activator: '<div></div>',
        },
        scopedSlots: {
          activator: '<div></div>',
        },
      });
      expect(console.error).toHaveBeenCalledWith(
        `The activator slot must be bound, try '<template v-slot:activator="{ on }"><button v-on="on">'`,
        expect.any(Object),
      );
    });

    it('should pass value to the activator slot', () => {
      const wrapper = mountComponent({
        scopedSlots: {
          activator: scope => vm.$createElement('button', {
            on: {
              click () {
                scope.value = !scope.value;
              },
            },
          }, [String(scope.value)]),
        },
        render (h) {
          return h('div', [this.genActivator()]);
        },
      });

      expect(wrapper.find('button').text()).toBe('false');
      wrapper.find('button').trigger('click');
      expect(wrapper.find('button').text()).toBe('true');
    });

    it('should find a custom activator with querySelector', () => {
      const DOMelement = document.createElement('button');
      DOMelement.id = 'activator';
      document.body.appendChild(DOMelement);

      const wrapper = mountComponent({
        propsData: {
          activator: '#activator',
        },
      });

      expect(wrapper.vm.activatorElement).toEqual(DOMelement);
    });

    it('should find a custom activator with $el', () => {
      const DOMelement = document.createElement('button');
      DOMelement.id = 'activator';
      document.body.appendChild(DOMelement);

      const wrapper = mountComponent({
        propsData: {
          activator: { $el: DOMelement },
        },
      });

      expect(wrapper.vm.activatorElement).toEqual(DOMelement);
    });

    it('should set a custom activator with a DOM element', () => {
      const DOMelement = document.createElement('button');
      DOMelement.id = 'activator';
      document.body.appendChild(DOMelement);

      const wrapper = mountComponent({
        propsData: {
          activator: DOMelement,
        },
      });

      expect(wrapper.vm.activatorElement).toEqual(DOMelement);
    });
  });

  describe('methods', () => {
    describe('genActivator', () => {
      it('should return an empty array if there is no slot activator', () => {
        const wrapper = mountComponent({
          slots: {},
          scopedSlots: {},
        });
        expect(wrapper.vm.genActivator()).toEqual([]);
      });
    });

    describe('getActivator', () => {
      it('Should update activatorElement with an event target', () => {
        const DOMelement = document.createElement('button');
        DOMelement.id = 'activator';
        document.body.appendChild(DOMelement);

        const wrapper = mountComponent();

        wrapper.vm.getActivator({ target: DOMelement });
        expect(wrapper.vm.activatorElement).toEqual(DOMelement);

        // Should not update activatorElement if already defined
        wrapper.vm.getActivator();
        expect(wrapper.vm.activatorElement).toEqual(DOMelement);
      });
    });

    describe('getContentSlot', () => {
      it('should return default slot & allow to update isActive', () => {
        const wrapper = mountComponent({
          scopedSlots: {
            activator: props => vm.$createElement('button', props),
          },
          slots: {
            default: `
              <div class="list">
                <button class="list-item">Button 1</button>
                <button class="list-item" disabled> Button 2</button>
              </div>`,
          },
          render (h) {
            return h('div', [this.genActivator()]);
          },
        });

        expect(wrapper.vm.getContentSlot()).toEqual(expect.any(Object));
      });
    });
  });
});
