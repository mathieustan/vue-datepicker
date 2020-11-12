import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import VDPickerControls from '@/components/VDPicker/VDPickerControls';

// PickerDate Class
import PickerDate from '@/components/VDPicker/utils/PickerDate';

jest.useFakeTimers();

describe('VDPickerControls', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({
      date = new PickerDate(dummyDate.month(), dummyDate.year(), { lang: 'en' }),
      mode = 'date',
      locale = { lang: 'en' },
      min,
      max,
    } = {}) =>
      shallowMount(VDPickerControls, {
        propsData: {
          pickerDate: date,
          mode,
          locale,
          min,
          max,
        },
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.vm.pickerDate).toEqual({
      start: dummyDate.startOf('month'),
      end: dummyDate.endOf('month'),
      month: 4,
      year: 2019,
      locale: { lang: 'en' },
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

    describe('isPreviousDateDisabled', () => {
      // current date = dayjs(new Date([2019, 5, 16]))
      it.each([
        [{ min: undefined, mode: 'date' }, false],
        [{ min: '2019-4-10', mode: 'date' }, false],
        [{ min: '2019-5-10', mode: 'date' }, true],
        [{ min: '2019-5-10', mode: 'month' }, true],
      ])(
        'when allowed dates = %p and mode = %p, should return %p',
        (props, expectedResult) => {
          const wrapper = mountComponent(props);
          expect(wrapper.vm.isPreviousDateDisabled).toEqual(expectedResult);
        }
      );
    });

    describe('isNextDateDisabled', () => {
      // current date = dayjs(new Date([2019, 5, 16]))
      it.each([
        [{ max: undefined, mode: 'date' }, false],
        [{ max: undefined, mode: 'date' }, false],
        [{ max: '2019-6-16', mode: 'date' }, false],
        [{ max: '2019-5-16', mode: 'date' }, true],
        [{ max: '2019-5-16', mode: 'month' }, true],
      ])(
        'when allowed dates = %p and mode = %p, should return %p',
        (props, expectedResult) => {
          const wrapper = mountComponent(props);
          expect(wrapper.vm.isNextDateDisabled).toEqual(expectedResult);
        }
      );
    });
  });

  describe('methods', () => {
    describe('onNavigationClick', () => {
      it('Should send an event to update month', () => {
        const wrapper = mountComponent();
        wrapper.vm.onNavigationClick('prev');

        expect(wrapper.emitted()['on-navigation-click'][0]).toEqual(['prev']);
      });
    });
  });

  describe('behaviour', () => {
    it('should emit direction when click on prev/next button', () => {
      const wrapper = mountComponent();

      wrapper.find('.vd-picker__controls-prev').trigger('click');
      expect(wrapper.emitted()['on-navigation-click'][0]).toEqual(['prev']);

      wrapper.find('.vd-picker__controls-next').trigger('click');
      expect(wrapper.emitted()['on-navigation-click'][1]).toEqual(['next']);
    });

    it('should emit update mode when click on month/year selector', () => {
      const wrapper = mountComponent();

      wrapper.find('.vd-picker__controls-label > button').trigger('click');
      expect(wrapper.emitted()['update-mode'][0]).toEqual(['month']);
    });
  });
});
