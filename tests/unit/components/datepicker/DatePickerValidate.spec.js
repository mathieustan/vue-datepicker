import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePickerValidate from '@/components/datepicker/DatePickerValidate.vue';

describe('DatePickerValidate', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = ({ range, mutableDate } = {}) =>
      shallowMount(DatePickerValidate, {
        propsData: {
          buttonValidate: 'Ok',
          buttonCancel: 'Cancel',
          color: 'color',
          range,
          mutableDate,
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

  describe('computed', () => {
    describe('isDisabledValidation', () => {
      it.each([
        [{ range: false, mutableDate: undefined }, false],
        [{ range: true, mutableDate: { start: dayjs('2018-01-01'), end: undefined } }, true],
        [{ range: true, mutableDate: { start: undefined, end: dayjs('2018-02-01') } }, true],
        [{ range: true, mutableDate: { start: dayjs('2018-01-01'), end: dayjs('2018-02-01') } }, false],
      ])('when props equal %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.isDisabledValidation).toEqual(expectedResult);
      });
    });
  });
});
