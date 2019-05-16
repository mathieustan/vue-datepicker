import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePicker from '@/components/DatePicker.vue';

describe('DatePicker', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date(2019, 5, 16));

  beforeEach(() => {
    mountComponent = (date = dummyDate) =>
      shallowMount(DatePicker, {
        propsData: {
          value: date,
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
    expect(wrapper.vm.date).toEqual(dummyDate);
    expect(wrapper.vm.isVisible).toEqual(false);
  });

  describe('computed', () => {
    describe('dateFormatted', () => {
      it.each([
        [dayjs(new Date(2019, 5, 16)), '16 Juin 2019'],
        [dayjs(new Date(2019, 4, 12)), '12 Mai 2019'],
      ])('When date equal %p, should return %p', (date, expectedResult) => {
        const wrapper = mountComponent(date);
        expect(wrapper.vm.dateFormatted).toEqual(expectedResult);
      });
    });
  });
});
