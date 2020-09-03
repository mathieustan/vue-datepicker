const bootable = {
  name: 'Bootable',
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
  methods: {
    showLazyContent (content) {
      return (this.hasContent && content) ? content() : [this.$createElement()];
    },
  },
};

export default bootable;
