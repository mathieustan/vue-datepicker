import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import mobile from '@/mixins/mobile';

// Helpers
import { resizeWindow } from '../../helpers';

describe('mobile', () => {
  let mountComponent;
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [mobile],
    template: '<div class="mobile"></div>',
  });

  beforeEach(() => {
    mountComponent = (options) => shallowMount(EmptyComponent, options);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.resetModules();
    jest.clearAllMocks();
  });

  it.each([
    [500, undefined, true],
    [500, 700, true],
    [800, 700, false],
    [999, 1000, true],
    [1263, 1400, true],
  ])('should conditionally be mobile using a breakpoint of %s', (...item) => {
    const [
      resizeTo,
      mobileBreakpoint,
      isMobile,
    ] = item;

    resizeWindow(resizeTo);

    const wrapper = mountComponent({
      propsData: { mobileBreakpoint },
    });

    expect(wrapper.vm.isMobile).toBe(isMobile);
  });
});
