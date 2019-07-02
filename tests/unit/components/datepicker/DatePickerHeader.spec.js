import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePickerHeader from '@/components/datepicker/DatePickerHeader.vue';

describe('DatePickerHeader', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({
      date = dummyDate,
      formatHeader = 'dddd DD MMM',
      range,
    } = {}) =>
      shallowMount(DatePickerHeader, {
        propsData: {
          mutableDate: range && !date.start ? { start: date, end: undefined } : date,
          color: 'color',
          locale: { lang: 'en' },
          formatHeader,
          mode: undefined,
          range,
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
    describe('classes', () => {
      it.each([
        [
          { range: true },
          {
            'datepicker-header--range': true,
          },
        ],
        [
          { range: false },
          {
            'datepicker-header--range': false,
          },
        ],
      ])('when props = %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.classes).toEqual(expectedResult);
      });
    });

    describe('year', () => {
      it.each([
        [{ date: dayjs(new Date([2018, 5, 16])) }, '2018'],
      ])('When props = %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.year).toEqual(expectedResult);
      });
    });

    describe('dateFormatted', () => {
      it.each([
        [{ date: dayjs(new Date([2018, 5, 16])) }, 'Wednesday 16 May'],
        [
          { range: true, date: { start: dayjs(new Date([2018, 5, 16])), end: undefined }, formatHeader: 'YYYY-MM-DD' },
          ['2018-05-16', 'YYYY-MM-DD'],
        ],
        [
          { range: true, date: { start: dayjs(new Date([2018, 5, 16])), end: dayjs(new Date([2019, 5, 16])) }, formatHeader: 'YYYY-MM-DD' },
          ['2018-05-16', '2019-05-16'],
        ],
      ])('When props = %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.dateFormatted).toEqual(expectedResult);
      });
    });
  });
});
