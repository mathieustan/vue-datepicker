import { shallowMount } from '@vue/test-utils';
import DatePickerOverlay from '@/components/datepicker/DatePickerOverlay.vue';

console.error = jest.fn();

describe('DatePickerOverlay', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = ({
      isVisible = false,
      fullscreenMobile = false,
    } = {}) => shallowMount(DatePickerOverlay, {
      propsData: {
        isVisible,
        fullscreenMobile,
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  describe('computed', () => {
    describe('shouldShowOverlay', () => {
      it.each([
        [{ isVisible: false, fullscreenMobile: false }, false],
        [{ isVisible: false, fullscreenMobile: true }, false],
        [{ isVisible: true, fullscreenMobile: false }, false],
        [{ isVisible: true, fullscreenMobile: true }, true],
      ])('when props = %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.shouldShowOverlay).toEqual(expectedResult);
      });
    });
  });

  describe('watch', () => {
    describe('shouldShowOverlay', () => {
      it('should do nothing if equal false', async () => {
        const wrapper = mountComponent({ isVisible: false, fullscreenMobile: false });
        jest.spyOn(wrapper.vm, 'initDetach').mockReturnValue(true);

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.initDetach).not.toHaveBeenCalled();
      });

      it('should initDetach if equal true', async () => {
        const wrapper = mountComponent({ isVisible: true, fullscreenMobile: true });
        jest.spyOn(wrapper.vm, 'initDetach').mockReturnValue(true);

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.initDetach).toHaveBeenCalled();
      });
    });
  });

  it('Should emit a close event on click', () => {
    const wrapper = mountComponent({ isVisible: true, fullscreenMobile: true });
    wrapper.trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
