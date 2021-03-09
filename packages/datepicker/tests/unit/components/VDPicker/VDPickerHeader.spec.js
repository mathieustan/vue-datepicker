import dayjs from 'dayjs';
import { mount } from '@vue/test-utils';
import VDPickerHeader from '@/components/VDPicker/VDPickerHeader';

describe('VDPickerHeader', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({
      formattedHeaderYear,
      formattedHeaderDate = ['', ''],
      mutableDate,
      range,
    } = {}) =>
      mount(VDPickerHeader, {
        propsData: {
          formattedHeaderYear,
          formattedHeaderDate,
          mutableDate,
          color: 'color',
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
    expect(wrapper.vm.mutableDate).toEqual(undefined);
    expect(wrapper.vm.mode).toEqual(undefined);
  });

  describe('computed', () => {
    describe('classes', () => {
      it.each([
        [
          { range: true, mutableDate: {} },
          {
            'vd-picker-header--range': true,
          },
        ],
        [
          { range: false },
          {
            'vd-picker-header--range': false,
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
        [{ mutableDate: dummyDate, formattedHeaderYear: '2019' }, '2019'],
      ])('When props = %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.year).toEqual(expectedResult);
      });
    });

    describe('dateFormatted', () => {
      it.each([
        [{ formattedHeaderDate: '--' }, '--'],
        [{ formattedHeaderDate: ['--', '--'] }, ['--', '--']],
      ])('When props = %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.dateFormatted).toEqual(expectedResult);
      });
    });
  });

  describe('behaviour', () => {
    it('should update mode when clicking year', () => {
      const wrapper = mountComponent();
      const year = wrapper.find('.vd-picker-header__year-button');
      year.trigger('click');

      expect(wrapper.emitted()['update-mode']).toBeTruthy();
    });

    it('should update mode when clicking date', () => {
      const wrapper = mountComponent();
      const date = wrapper.find('.vd-picker-header__wrap-button');
      date.trigger('click');

      expect(wrapper.emitted()['update-mode']).toBeTruthy();
    });
  });
});
