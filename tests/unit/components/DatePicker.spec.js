import dayjs from 'dayjs';
import { shallowMount } from '@vue/test-utils';
import DatePicker from '@/components/DatePicker.vue';

jest.useFakeTimers();

describe('DatePicker', () => {
  let mountComponent;
  const dummyDate = dayjs(new Date([2019, 5, 16]));

  beforeEach(() => {
    mountComponent = ({ date = dummyDate, disabled = false } = {}) =>
      shallowMount(DatePicker, {
        propsData: {
          value: date,
          disabled,
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
    expect(wrapper.vm.date).toEqual(dummyDate);
    expect(wrapper.vm.isVisible).toEqual(false);
  });

  describe('methods', () => {
    describe('toggleDatepicker', () => {
      beforeEach(() => {
        jest.spyOn(document, 'addEventListener');
        jest.spyOn(document, 'removeEventListener');
      });

      it('should not show datepicker if disabled', () => {
        const wrapper = mountComponent({ disabled: true });
        expect(wrapper.vm.isVisible).toEqual(false);

        wrapper.vm.toggleDatepicker();
        expect(wrapper.vm.isVisible).toEqual(false);

        jest.runOnlyPendingTimers();

      });

      it('should set isVisible to true & init a clic listener', () => {
        const wrapper = mountComponent();
        expect(wrapper.vm.isVisible).toEqual(false);

        wrapper.vm.toggleDatepicker();
        expect(wrapper.vm.isVisible).toEqual(true);

        jest.runOnlyPendingTimers();

        expect(document.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
      });

      it('should set isVisible to false & remove click listener if already open', () => {
        const wrapper = mountComponent();
        wrapper.setData({ isVisible: true });

        wrapper.vm.toggleDatepicker();
        expect(wrapper.vm.isVisible).toEqual(false);
        expect(document.removeEventListener).toHaveBeenCalledWith('click', expect.any(Function));
      });
    });

    describe('hideDatePicker', () => {
      beforeEach(() => {
        jest.spyOn(document, 'removeEventListener');
      });

      it('should set isVisible to false & remove a clic listener', () => {
        const wrapper = mountComponent();
        wrapper.setData({ isVisible: true });

        wrapper.vm.hideDatePicker();
        expect(wrapper.vm.isVisible).toEqual(false);
        expect(document.removeEventListener).toHaveBeenCalledWith('click', expect.any(Function));
      });
    });

    describe('changeDate', () => {
      it('should update date', () => {
        const wrapper = mountComponent();
        wrapper.vm.changeDate(dayjs(new Date([2019, 5, 18])));
        expect(wrapper.vm.date.format('YYYY-MM-DD')).toEqual('2019-05-18');
        expect(wrapper.emitted().input[0]).toEqual([dayjs(new Date([2019, 5, 18]))]);
      });
    });
  });
});
