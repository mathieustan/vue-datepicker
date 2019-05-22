import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePickerHeader from '@/components/DatePickerHeader.vue';

describe('DatePickerHeader', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({ date = dummyDate, formatHeader = 'dddd DD MMM' } = {}) =>
      shallowMount(DatePickerHeader, {
        propsData: {
          mutableDate: date,
          color: 'color',
          locale: { lang: 'en' },
          formatHeader,
          mode: undefined,
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
    expect(wrapper.vm.color).toEqual('color');
    expect(wrapper.vm.mutableDate).toEqual(dummyDate);
    expect(wrapper.vm.locale).toEqual({ lang: 'en' });
    expect(wrapper.vm.formatHeader).toEqual('dddd DD MMM');
    expect(wrapper.vm.mode).toEqual(undefined);
  });

  describe('computed', () => {
    describe('year', () => {
      it('should return date formatted', () => {
        const wrapper = mountComponent({ date: dayjs(new Date([2018, 5, 16])) });
        expect(wrapper.vm.year).toEqual('2018');
      });
    });

    describe('dateFormatted', () => {
      it('should return dateFormatted for header', () => {
        const wrapper = mountComponent({ date: dayjs(new Date([2018, 5, 16])) });
        expect(wrapper.vm.dateFormatted).toEqual('Wednesday 16 May');
      });
    });
  });
});
