import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePickerCustomInput from '@/components/datepicker/DatePickerCustomInput.vue';

jest.useFakeTimers();

describe('DatePickerCustomInput', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({ date } = {}) =>
      shallowMount(DatePickerCustomInput, {
        propsData: {
          name: 'datepicker',
          date,
          format: 'DD MMMM YYYY',
          locale: { lang: 'en' },
          color: 'color',
          disabled: false,
        },
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent({ date: dummyDate });
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.name).toEqual('datepicker');
    expect(wrapper.vm.date).toEqual(dummyDate);
    expect(wrapper.vm.format).toEqual('DD MMMM YYYY');
    expect(wrapper.vm.locale).toEqual({ lang: 'en' });
    expect(wrapper.vm.color).toEqual('color');
    expect(wrapper.vm.disabled).toEqual(false);
  });

  describe('computed', () => {
    describe('dateFormatted', () => {
      it.each([
        [undefined, undefined],
        [dayjs(new Date([2019, 5, 16])), '16 May 2019'],
        [dayjs(new Date([2019, 4, 12])), '12 April 2019'],
      ])('When date equal %p, should return %p', (date, expectedResult) => {
        const wrapper = mountComponent({ date });
        expect(wrapper.vm.dateFormatted).toEqual(expectedResult);
      });
    });
  });
});
