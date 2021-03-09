import { shallowMount } from '@vue/test-utils';
import VDMenu from '@/components/VDMenu/VDMenu';

jest.useFakeTimers();

const defaultDimensions = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0,
  offsetTop: 0,
  scrollHeight: 0,
  offsetLeft: 0,
};

describe('VDMenu', () => {
  let mountComponent;

  beforeEach(() => {
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation(cb => cb());
    mountComponent = ({
      slots = {
        default: `
        <div class="g-list">
          <button id="button1" type="button" class="g-list-item">Button 1</button>
          <button id="button2" type="button" class="g-list-item" disabled> Button 2</button>
        </div>`,
      },
      props = {},
      methods,
    } = {}) =>
      shallowMount(VDMenu, {
        slots,
        scopedSlots: {
          activator: '<button id="activator" v-on="props.on"></button>',
        },
        propsData: props,
        methods,
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
    expect(wrapper.vm.zIndex).toEqual(undefined);
    expect(wrapper.vm.transition).toEqual('menu-transition');
    expect(wrapper.vm.isContentActive).toEqual(false);
  });

  describe('computed', () => {
    describe('styles', () => {
      it.each([
        [{
          props: {},
          expectedResult: {
            left: '0px',
            top: '12px',
            transformOrigin: 'top left',
            maxHeight: 'auto',
            minWidth: '0px',
            zIndex: 0,
          },
        }],
        [{
          props: { zIndex: 2000, maxHeight: '200px' },
          expectedResult: {
            left: '0px',
            top: '12px',
            transformOrigin: 'top left',
            maxHeight: '200px',
            minWidth: '0px',
            zIndex: 2000,
          },
        }],
      ])(
        'Should return computed styles with %p',
        ({ props, expectedResult }) => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.styles).toEqual(expectedResult);
        },
      );
    });

    describe('calculedMenuMaxHeight', () => {
      [{
        description: 'return auto by default',
        props: {},
        expectedResult: 'auto',
      }, {
        description: 'return maxHeight if defined in props',
        props: {
          maxHeight: '300px',
        },
        expectedResult: '300px',
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.calculedMenuMaxHeight).toEqual(expectedResult);
        });
      });
    });

    describe('calculedMaxWidth', () => {
      [{
        description: 'return undefined by default',
        props: {},
        expectedResult: undefined,
      }, {
        description: 'return maxWidth if defined in props',
        props: {
          maxWidth: '300px',
        },
        expectedResult: '300px',
      }].forEach(({ description, props, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          expect(wrapper.vm.calculedMaxWidth).toEqual(expectedResult);
        });
      });
    });

    describe('calculedMenuWidth', () => {
      [{
        description: 'return 0 if activatorElement is undefined',
        props: {},
        data: {
          activatorElement: undefined,
        },
        expectedResult: '0px',
      }, {
        description: 'return 0 if minWidth is null',
        props: { minWidth: null },
        expectedResult: '0px',
      }, {
        description: 'return minWidth if defined',
        props: { minWidth: 200 },
        data: {
          activatorElement: undefined,
        },
        expectedResult: '200px',
      }, {
        description: 'return minWidth if defined in props as a string',
        props: {
          minWidth: '100px',
        },
        expectedResult: '100px',
      }, {
        description: 'return activatorElement width (300px)',
        props: {},
        data: {
          dimensions: {
            activator: {
              ...defaultDimensions,
              width: 300,
            },
            content: defaultDimensions,
          },
        },
        expectedResult: '300px',
      }, {
        description: 'return maxWidth if minWidth is greater than maxWidth',
        props: { maxWidth: 200 },
        data: {
          dimensions: {
            activator: {
              ...defaultDimensions,
              width: 300,
            },
            content: defaultDimensions,
          },
        },
        expectedResult: '200px',
      }, {
        description: 'return maxWidth if minWidth is greater than maxWidth',
        props: { maxWidth: '200px' },
        data: {
          dimensions: {
            activator: {
              ...defaultDimensions,
              width: 300,
            },
            content: defaultDimensions,
          },
        },
        expectedResult: '200px',
      }].forEach(({ description, props, data, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          wrapper.setData({ ...data, pageWidth: 800 });
          expect(wrapper.vm.calculedMenuWidth).toEqual(expectedResult);
        });
      });
    });

    describe('calculedLeft', () => {
      [{
        description: 'return 0 by default',
        props: {},
        data: {},
        expectedResult: '0px',
      }, {
        description: 'return activator left position if not attached',
        props: {},
        data: {
          pageWidth: 800,
          pageYOffset: 0,
          dimensions: {
            activator: {
              ...defaultDimensions,
              left: 100,
              offsetLeft: 0,
            },
            content: defaultDimensions,
          },
        },
        expectedResult: '100px',
      }, {
        description: 'return activator offsetLeft position if attached',
        props: {
          attach: 'something',
        },
        data: {
          pageWidth: 800,
          pageYOffset: 0,
          dimensions: {
            activator: {
              ...defaultDimensions,
              left: 100,
              offsetLeft: 200,
            },
            content: defaultDimensions,
          },
        },
        expectedResult: '200px',
      }].forEach(({ description, props, data, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          wrapper.setData({ ...data });
          expect(wrapper.vm.calculedLeft).toEqual(expectedResult);
        });
      });

      it('should return 0 if calcLeft method return undefined', () => {
        const wrapper = mountComponent();
        wrapper.vm.calcLeft = jest.fn(() => undefined);

        wrapper.setData({
          pageWidth: 800,
          pageYOffset: 0,
          dimensions: {
            activator: {
              ...defaultDimensions,
              left: 100,
              offsetLeft: 200,
            },
            content: defaultDimensions,
          },
        });

        expect(wrapper.vm.calculedLeft).toEqual('0');
      });
    });

    describe('calculedTop', () => {
      [{
        description: 'return 12px by default',
        props: {},
        data: {},
        expectedResult: '12px',
      }, {
        description: 'return activator top position if not attached',
        props: {},
        data: {
          pageWidth: 800,
          pageYOffset: 0,
          dimensions: {
            activator: {
              ...defaultDimensions,
              top: 100,
              offsetTop: 0,
            },
            content: defaultDimensions,
          },
        },
        expectedResult: '100px',
      }, {
        description: 'return activator offsetTop position if attached',
        props: {
          attach: 'something',
        },
        data: {
          pageWidth: 800,
          pageYOffset: 0,
          dimensions: {
            activator: {
              ...defaultDimensions,
              top: 100,
              offsetTop: 200,
            },
            content: defaultDimensions,
          },
        },
        expectedResult: '200px',
      }].forEach(({ description, props, data, expectedResult }) => {
        it(`should ${description}`, () => {
          const wrapper = mountComponent({ props });
          wrapper.setData({ ...data });
          expect(wrapper.vm.calculedTop).toEqual(expectedResult);
        });
      });

      it('should return 0 if calcTop method return undefined', () => {
        const wrapper = mountComponent();
        wrapper.vm.calcTop = jest.fn(() => undefined);

        wrapper.setData({
          pageWidth: 800,
          pageYOffset: 0,
          dimensions: {
            activator: {
              ...defaultDimensions,
              top: 100,
              offsetTop: 200,
            },
            content: defaultDimensions,
          },
        });

        expect(wrapper.vm.calculedTop).toEqual('0');
      });
    });
  });

  describe('watch', () => {
    it('should activate menu when value became true', async () => {
      const wrapper = mountComponent();
      jest.spyOn(wrapper.vm, 'updateDimensions');
      wrapper.vm.$refs.content = undefined;
      wrapper.setProps({ value: true });

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isContentActive).toEqual(true);
      expect(wrapper.vm.updateDimensions).toHaveBeenCalled();
    });

    it('should not open menu if disabledf', async () => {
      const wrapper = mountComponent({ props: { disabled: true } });
      wrapper.setProps({ value: true });

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isContentActive).toEqual(false);
    });

    it('should activate menu then close menu', async () => {
      const wrapper = mountComponent();
      wrapper.setProps({ value: true });

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isContentActive).toEqual(true);

      wrapper.setProps({ value: false });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isContentActive).toEqual(false);
    });

    it('should not attach event handlers to the activator container if disabled', async () => {
      const wrapper = mountComponent({ props: { disabled: true } });
      const activator = wrapper.find('button');
      const input = jest.fn();
      wrapper.vm.$on('input', input);
      activator.trigger('click');

      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isContentActive).toEqual(false);
    });
  });

  describe('Behavior', () => {
    it('should update dimensions when scren resize', async () => {
      jest.spyOn(window, 'setTimeout');
      const wrapper = mountComponent({
        props: { value: true },
        methods: { updateDimensions: jest.fn() },
      });
      await wrapper.vm.$nextTick();
      jest.runOnlyPendingTimers();
      expect(window.setTimeout).toHaveBeenCalled();
    });

    it('should stop Propagation when click on content', async () => {
      const wrapper = mountComponent({
        props: { value: true },
      });
      await wrapper.vm.$nextTick();

      const click = { stopPropagation: jest.fn() };
      const content = wrapper.find('.vd-menu__content');
      content.trigger('click', click);
      expect(click.stopPropagation).toHaveBeenCalled();
    });

    it('should add content class if specified', () => {
      mountComponent({ props: { value: true, contentClass: 'test' } });

      const menuContent = document.body.querySelector('.vd-menu__content');
      expect(menuContent.getAttribute('class')).toContain('test');
    });
  });
});
