import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePickerCustomInput from '@/components/datepicker/DatePickerCustomInput.vue';

jest.useFakeTimers();

describe('DatePickerCustomInput', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({ date, range, disabled = false } = {}) =>
      shallowMount(DatePickerCustomInput, {
        propsData: {
          name: 'datepicker',
          date,
          format: 'DD MMMM YYYY',
          locale: { lang: 'en' },
          color: 'color',
          disabled,
          range,
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
    describe('classes', () => {
      it.each([
        [
          { disabled: false, range: true },
          {
            'datepicker-input--disabled': false,
            'datepicker-input--range': true,
          },
        ],
        [
          { disabled: true, range: false },
          {
            'datepicker-input--disabled': true,
            'datepicker-input--range': false,
          },
        ],
      ])('when props = %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.classes).toEqual(expectedResult);
      });
    });

    describe('isDateDefined', () => {
      it.each([
        [undefined, false],
        [{ date: dayjs('2019-5-16') }, true],
        [{ range: true, date: {} }, false],
        [{ range: true, date: { start: dayjs('2019-5-16') } }, false],
        [{ range: true, date: { start: dayjs('2019-5-16'), end: dayjs('2019-5-17') } }, true],

      ])('When props equal %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.isDateDefined).toEqual(expectedResult);
      });
    });

    describe('dateFormatted', () => {
      it.each([
        [undefined, undefined],
        [{ date: dayjs('2019-5-16') }, '16 May 2019'],
        [{ date: dayjs('2019-4-12') }, '12 April 2019'],
        [{ date: dayjs('2019-4-12') }, '12 April 2019'],
        [
          { range: true, date: { start: dayjs('2018-5-16'), end: undefined }, formatHeader: 'YYYY-MM-DD' },
          undefined,
        ],
        [
          { range: true, date: { start: dayjs('2018-5-16'), end: dayjs('2019-5-16') }, formatHeader: 'YYYY~MM-DD' },
          '16 May 2018 ~ 16 May 2019',
        ],
      ])('When props equal %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.dateFormatted).toEqual(expectedResult);
      });
    });
  });
});
