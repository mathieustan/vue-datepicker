import { shallowMount } from '@vue/test-utils';
import DatePickerOverlay from '@/components/DatePicker/DatePickerOverlay';

console.error = jest.fn();

describe('DatePickerOverlay', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = ({ props = {} } = {}) => shallowMount(DatePickerOverlay, {
      propsData: props,
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
    describe('styles', () => {
      it('should return styles from data', () => {
        const wrapper = mountComponent({ props: { zIndex: 1 } });
        expect(wrapper.vm.styles).toEqual({
          zIndex: 1,
        });
      });
    });
  });

  describe('watch', () => {
    describe('value', () => {
      it('should do nothing if equal false', async () => {
        const wrapper = mountComponent({ props: { value: false } });
        jest.spyOn(wrapper.vm, 'initDetach').mockReturnValue(true);

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.initDetach).not.toHaveBeenCalled();
      });

      it('should initDetach if equal true', async () => {
        const wrapper = mountComponent({ props: { value: true } });
        jest.spyOn(wrapper.vm, 'initDetach').mockReturnValue(true);

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.initDetach).toHaveBeenCalled();
      });
    });
  });

  it('Should emit a close event on click', () => {
    const wrapper = mountComponent({ props: { value: true } });
    wrapper.trigger('click');

    expect(wrapper.emitted().close).toBeTruthy();
  });
});
