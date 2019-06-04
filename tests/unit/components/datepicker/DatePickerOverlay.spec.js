import { shallowMount } from '@vue/test-utils';
import DatePickerOverlay from '@/components/datepicker/DatePickerOverlay.vue';

describe('DatePickerOverlay', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = () => shallowMount(DatePickerOverlay,);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('Should emit a close event on click', () => {
    const wrapper = mountComponent();
    wrapper.trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
