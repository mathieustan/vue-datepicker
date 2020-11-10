import Vue from 'vue';

export default function mixins (...args) {
  return Vue.extend({ mixins: args });
};
