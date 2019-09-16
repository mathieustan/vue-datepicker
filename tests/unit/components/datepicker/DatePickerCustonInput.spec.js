import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePickerCustomInput from '@/components/datepicker/DatePickerCustomInput.vue';

import { DEFAULT_INPUT_DATE_FORMAT } from '@/constants';

jest.useFakeTimers();

describe('DatePickerCustomInput', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({
      date,
      type = 'date',
      range,
      rangeInputText = '%d ~ %d',
      disabled = false,
      noCalendarIcon,
    } = {}) =>
      shallowMount(DatePickerCustomInput, {
        propsData: {
          name: 'datepicker',
          date,
          type,
          format: DEFAULT_INPUT_DATE_FORMAT[type],
          locale: { lang: 'en' },
          color: 'color',
          disabled,
          range,
          rangeInputText,
          noCalendarIcon,
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
          { disabled: false, range: true, noCalendarIcon: false },
          {
            'datepicker-input--disabled': false,
            'datepicker-input--range': true,
            'datepicker-input--no-calendar-icon': false,
          },
        ],
        [
          { disabled: true, range: false, noCalendarIcon: true },
          {
            'datepicker-input--disabled': true,
            'datepicker-input--range': false,
            'datepicker-input--no-calendar-icon': true,
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
        [{ date: dayjs('2019-2-12') }, '12 February 2019'],
        [{ date: dayjs('2019-2-12'), type: 'month', format: '' }, 'February 2019'],
        [{ date: dayjs('2019-2'), type: 'month', format: '' }, 'February 2019'],
        [{ date: dayjs('2019-2-12'), type: 'quarter', format: '' }, '2019-Q2'],
        [{ date: dayjs('2019-2'), type: 'quarter', format: '' }, '2019-Q2'],
        [
          {
            range: true,
            date: { start: dayjs('2018-5-16'), end: undefined },
            formatHeader: 'YYYY-MM-DD',
          },
          undefined,
        ],
        [
          {
            range: true,
            date: { start: dayjs('2018-5-16'), end: dayjs('2019-5-16') },
            formatHeader: 'YYYY~MM-DD',
          },
          '16 May 2018 ~ 16 May 2019',
        ],
        [
          {
            range: true,
            rangeInputText: 'From %d to %d',
            date: { start: dayjs('2018-5-16'), end: dayjs('2019-5-16') },
            formatHeader: 'YYYY~MM-DD',
          },
          'From 16 May 2018 to 16 May 2019',
        ],
        [
          {
            range: true,
            rangeInputText: '%d to %d',
            date: { start: dayjs('2018-5-16'), end: dayjs('2019-5-16') },
            formatHeader: 'YYYY~MM-DD',
          },
          '16 May 2018 to 16 May 2019',
        ],
      ])('When props equal %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.dateFormatted).toEqual(expectedResult);
      });
    });
  });
});
