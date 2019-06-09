const detachable = {
  props: {
    attachTo: { type: String, default: '#app' },
  },
  data: () => ({
    hasDetached: false,
  }),
  methods: {
    initDetach () {
      if (!this.$refs.content || this.hasDetached) return;

      const target = document.querySelector(this.attachTo);
      if (!target) {
        console.error(`Unable to locate target '${this.attachTo}'`, this);
        return;
      }

      target.insertBefore(this.$refs.content, target.firstChild);
      this.hasDetached = true;
    },
  },
};

export default detachable;
