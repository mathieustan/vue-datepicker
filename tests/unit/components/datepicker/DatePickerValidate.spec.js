import { shallowMount } from '@vue/test-utils';
import DatePickerValidate from '@/components/datepicker/DatePickerValidate.vue';

describe('DatePickerValidate', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = () =>
      shallowMount(DatePickerValidate, {
        propsData: {
          buttonValidate: 'Ok',
          buttonCancel: 'Cancel',
          color: 'color',
        },
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.vm.buttonValidate).toEqual('Ok');
    expect(wrapper.vm.buttonCancel).toEqual('Cancel');
    expect(wrapper.vm.color).toEqual('color');
  });
});
