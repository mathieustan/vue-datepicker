import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePickerControls from '@/components/DatePickerControls.vue';

import Dates from '../../src/utils/Dates';

jest.useFakeTimers();

describe('DatePickerControls', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({
      date = new Dates(dummyDate.month(), dummyDate.year()),
      mode = 'month',
    } = {}) =>
      shallowMount(DatePickerControls, {
        propsData: { currentDate: date, mode },
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.vm.currentDate).toEqual({
      start: dummyDate.startOf('month'),
      end: dummyDate.endOf('month'),
      month: 4,
      year: 2019,
    });
  });

  describe('computed', () => {
    describe('monthFormatted', () => {
      it('should return month with format MMMM', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.monthFormatted).toEqual('May');
      });
    });

    describe('yearFormatted', () => {
      it('should return year with format YYYY', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.yearFormatted).toEqual('2019');
      });
    });
  });

  describe('methods', () => {
    describe('changeMonth', () => {
      it('Should send an event to update month', () => {
        const wrapper = mountComponent();
        wrapper.vm.changeMonth('prev');

        expect(wrapper.emitted().changeVisibleDate[0]).toEqual(['prev']);
      });
    });

    describe('showYearMonthSelector', () => {
      it('Should send an event to show year/month selector', () => {
        const wrapper = mountComponent();
        wrapper.vm.showYearMonthSelector('month');

        expect(wrapper.emitted().showYearMonthSelector[0]).toEqual(['month']);
      });
    });
  });
});
