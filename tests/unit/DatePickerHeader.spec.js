import dayjs from 'dayjs';
import mockDate from 'mockdate';
import { shallowMount } from '@vue/test-utils';
import DatePickerHeader from '@/components/DatePickerHeader.vue';

jest.useFakeTimers();

beforeEach(() => {
  mockDate.set(new Date([2019, 5, 16]));
});

afterEach(() => {
  mockDate.reset();
});

describe('DatePickerHeader', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({ date = dummyDate } = {}) =>
      shallowMount(DatePickerHeader, {
        propsData: {
          currentDate: date,
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
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.color).toEqual('color');
    expect(wrapper.vm.currentDate).toEqual(dummyDate);
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
