import DatePicker from '@/components/DatePicker.vue';

export default {
  install (Vue) {
    Vue.component('vue-datepicker', DatePicker);
  },
};
