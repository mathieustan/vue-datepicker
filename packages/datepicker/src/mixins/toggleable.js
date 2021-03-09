const toggleable = {
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: { type: Boolean, required: false },
  },
  data: () => ({
    isActive: false,
  }),
  watch: {
    value: {
      handler (val) {
        this.isActive = val;
      },
      immediate: true,
    },
    isActive (val) {
      val !== this.value && this.$emit('input', val);
    },
  },
};

export default toggleable;
