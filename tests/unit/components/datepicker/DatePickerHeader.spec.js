import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePickerHeader from '@/components/datepicker/DatePickerHeader.vue';

describe('DatePickerHeader', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({
      mutableDate,
      formatHeader = 'dddd DD MMM',
      range,
      rangeHeaderText = 'From %d To %d',
    } = {}) =>
      shallowMount(DatePickerHeader, {
        propsData: {
          mutableDate,
          color: 'color',
          locale: { lang: 'en' },
          formatHeader,
          mode: undefined,
          range,
          rangeHeaderText,
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
    expect(wrapper.vm.mutableDate).toEqual(undefined);
    expect(wrapper.vm.locale).toEqual({ lang: 'en' });
    expect(wrapper.vm.formatHeader).toEqual('dddd DD MMM');
    expect(wrapper.vm.mode).toEqual(undefined);
  });

  describe('computed', () => {
    describe('classes', () => {
      it.each([
        [
          { range: true, mutableDate: {} },
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
        [{ mutableDate: undefined }, '-'],
        [{ mutableDate: dummyDate }, '2019'],
      ])('When props = %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.year).toEqual(expectedResult);
      });
    });

    describe('dateFormatted', () => {
      it.each([
        [{ mutableDate: undefined }, '--'],
        [{ mutableDate: dummyDate }, 'Thursday 16 May'],
        [
          { range: true, mutableDate: { start: dummyDate, end: undefined }, formatHeader: 'YYYY-MM-DD' },
          ['From 2019-05-16', 'To __'],
        ],
        [
          { range: true, mutableDate: { start: dummyDate, end: dayjs(new Date([2019, 5, 16])) }, formatHeader: 'YYYY-MM-DD' },
          ['From 2019-05-16', 'To 2019-05-16'],
        ],
      ])('When props = %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.dateFormatted).toEqual(expectedResult);
      });
    });
  });
});
