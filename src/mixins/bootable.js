const bootable = {
  data: () => ({
    isBooted: false,
  }),
  computed: {
    hasContent () {
      return this.isBooted || this.isActive;
    },
  },
  watch: {
    isActive () {
      this.isBooted = true;
    },
  },
};

export default bootable;
