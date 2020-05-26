import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePickerPresets from '@/components/DatePicker/DatePickerPresets';

describe('DatePickerPresets', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = ({
      rangePresets,
      mutableDate,
      minDate,
      maxDate,
      locale = { lang: 'en' },
    } = {}) =>
      shallowMount(DatePickerPresets, {
        propsData: {
          rangePresets,
          mutableDate,
          minDate,
          maxDate,
          color: 'color',
          locale,
        },
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.vm.rangePresets).toEqual(undefined);
    expect(wrapper.vm.mutableDate).toEqual(undefined);
    expect(wrapper.vm.minDate).toEqual(undefined);
    expect(wrapper.vm.maxDate).toEqual(undefined);
    expect(wrapper.vm.color).toEqual('color');
    expect(wrapper.vm.locale).toEqual({ lang: 'en' });
  });

  describe('computed', () => {
    describe('presetsFormatted', () => {
      it.each([
        [{}, undefined],
        [{
          rangePresets: [{ name: 'month', dates: { start: '2018-01-01', end: '2018-01-31' } }],
          minDate: '2018-01-29',
          maxDate: '2018-02-05',
        }, [{
          name: 'month',
          dates: { start: '2018-01-01', end: '2018-01-31' },
          availableDates: [dayjs('2018-01-29'), dayjs('2018-01-30'), dayjs('2018-01-31')],
        }]],
      ])(
        'when props = %p, should return %p',
        (props, expectedResult) => {
          const wrapper = mountComponent(props);
          expect(wrapper.vm.presetsFormatted).toEqual(expectedResult);
        }
      );
    });
  });

  describe('methods', () => {
    describe('isPresetSelected', () => {
      it.each([
        [{}, undefined, false],
        [
          { mutableDate: { start: '2018-01-28', end: '2018-01-31' } },
          { availableDates: [] },
          false,
        ],
        [
          { mutableDate: { start: '2018-01-28', end: '2018-01-31' } },
          { availableDates: [dayjs('2018-01-29'), dayjs('2018-01-30'), dayjs('2018-01-31')] },
          false,
        ],
        [
          { mutableDate: { start: '2018-01-29', end: '2018-01-31' } },
          { availableDates: [dayjs('2018-01-29'), dayjs('2018-01-30'), dayjs('2018-01-31')] },
          true,
        ],
      ])(
        'when props = %p, preset = %p, should return %p',
        (props, preset, expectedResult) => {
          const wrapper = mountComponent(props);
          expect(wrapper.vm.isPresetSelected(preset)).toEqual(expectedResult);
        }
      );
    });

    describe('isPresetValid', () => {
      it.each([
        [{}, undefined, false],
        [
          { mutableDate: { start: '2018-01-28', end: '2018-01-31' } },
          { availableDates: [] },
          false,
        ],
        [
          { mutableDate: { start: '2018-01-28', end: '2018-01-31' } },
          { availableDates: [dayjs('2018-01-29'), dayjs('2018-01-30'), dayjs('2018-01-31')] },
          true,
        ],
      ])(
        'when props = %p, preset = %p, should return %p',
        (props, preset, expectedResult) => {
          const wrapper = mountComponent(props);
          expect(wrapper.vm.isPresetValid(preset)).toEqual(expectedResult);
        }
      );
    });

    describe('setPresetDates', () => {
      it('should do nothing if preset is already selected', () => {
        const wrapper = mountComponent({ mutableDate: { start: '2018-01-29', end: '2018-01-31' } });
        const preset = { availableDates: [dayjs('2018-01-29'), dayjs('2018-01-30'), dayjs('2018-01-31')] };
        wrapper.vm.setPresetDates(preset);
        expect(wrapper.emitted().updateRange).toBeFalsy();
      });

      it('Should emit first & last day from available dates', () => {
        const wrapper = mountComponent();
        const preset = { availableDates: [dayjs('2018-01-29'), dayjs('2018-01-30'), dayjs('2018-01-31')] };
        wrapper.vm.setPresetDates(preset);
        expect(wrapper.emitted().updateRange[0]).toEqual([
          { start: dayjs('2018-01-29'), end: dayjs('2018-01-31') },
        ]);
      });
    });
  });

  describe('behaviour', () => {
    it('should emit updateRange when click on a preset', () => {
      const wrapper = mountComponent({
        rangePresets: [{ name: 'month', dates: { start: '2018-01-01', end: '2018-01-31' } }],
      });
      const preset = wrapper.find('.vd-picker__preset');
      preset.trigger('click');

      expect(wrapper.emitted().updateRange).toBeTruthy();
    });
  });
});
