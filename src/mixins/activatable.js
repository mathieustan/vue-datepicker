import toggleable from './toggleable';

import { getSlot, getSlotType } from '../utils/helpers';

const activatable = {
  mixins: [toggleable],
  props: {
    // Allow to pass an element as an activator
    // Would be useful for to open a menu with a select button
    activator: {
      default: undefined,
      validator: val => ['string', 'object'].includes(typeof val),
    },
    disabled: { type: Boolean, default: false },
  },
  data: () => ({
    activatorElement: undefined,
    activatorNode: [],
  }),
  watch: {
    activator: 'resetActivator',
  },
  mounted () {
    const slotType = getSlotType(this, 'activator', true);
    if (slotType && ['v-slot', 'normal'].includes(slotType)) {
      console.error(
        `The activator slot must be bound, try '<template v-slot:activator="{ on }"><button v-on="on">'`,
        this
      );
    }
    this.getActivator();
  },
  methods: {
    resetActivator () {
      this.activatorElement = undefined;
      this.getActivator();
    },
    genActivator () {
      const node = getSlot(this, 'activator', Object.assign(this.getValueProxy(), {
        attrs: {
          role: 'button',
          'aria-haspopup': true,
          'aria-expanded': String(this.isActive),
        },
      })) || [];

      this.activatorNode = node;
      return node;
    },
    getActivator (event) {
      // If we've already fetched the activator, re-use
      if (this.activatorElement) return this.activatorElement;

      let activator;

      if (this.activator) {
        const target = document;

        // Selector
        if (typeof this.activator === 'string') {
          activator = target.querySelector(this.activator);
        // VNode
        } else if (this.activator.$el) {
          activator = this.activator.$el;
        // HTMLElement | Element
        } else {
          activator = this.activator;
        }
      } else if (event) {
        activator = (event.currentTarget || event.target);
      } else if (this.activatorNode.length) {
        activator = this.activatorNode[0].elm;
      }

      this.activatorElement = activator;
      return this.activatorElement;
    },
    // Init content slot with isActive management state
    getContentSlot () {
      return getSlot(this, 'default', this.getValueProxy(), true);
    },
    // Allow to pass isActive state management to a specific slot
    getValueProxy () {
      const self = this;
      return {
        get value () {
          return self.isActive;
        },
        set value (isActive) {
          self.isActive = isActive;
        },
      };
    },
  },
};

export default activatable;
