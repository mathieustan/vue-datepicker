import './VTable.scss';

export default {
  name: 'VTable',
  props: {
    dense: { type: Boolean, default: false },
    fixedHeader: { type: Boolean, default: false },
    height: { type: [Number, String] },
  },
  computed: {
    classes () {
      return {
        'g-table--dense': this.dense,
        'g-table--fixed-height': Boolean(this.height) && !this.fixedHeader,
        'g-table--fixed-header': this.fixedHeader,
      };
    },
  },
  methods: {
    genWrapper () {
      return this.$slots.wrapper || this.$createElement('div', {
        staticClass: 'g-table__wrapper',
        style: {
          height: this.height,
        },
      }, [
        this.$createElement('table', this.$slots.default),
      ]);
    },
  },
  render (h) {
    return h('div', {
      staticClass: 'g-table',
      class: this.classes,
    }, [
      this.$slots.top,
      this.genWrapper(),
      this.$slots.bottom,
    ]);
  },
};
