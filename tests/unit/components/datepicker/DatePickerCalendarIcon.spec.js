import { shallowMount } from '@vue/test-utils';
import DatePickerCalendarIcon from '@/components/datepicker/DatePickerCalendarIcon.vue';

describe('DatePickerCalendarIcon', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = () =>
      shallowMount(DatePickerCalendarIcon, {
        propsData: {
          id: 'id',
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
    expect(wrapper.vm.id).toEqual('id');
    expect(wrapper.vm.color).toEqual('color');
  });
});
