<template>
  <v-btn
    absolute
    class="v-btn--copy"
    icon
    right
    style="background-color: inherit;"
    top
    @click="copy"
  >
    <v-fade-transition hide-on-leave>
      <v-icon
        :key="String(clicked)"
        color="grey"
        v-text="clicked ? 'fal fa-check' : 'fal fa-copy'"
      />
    </v-fade-transition>
  </v-btn>
</template>

<script>
const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));
const IN_BROWSER = typeof window !== 'undefined';

export default {
  name: 'CopyBtn',
  props: {
    target: { type: Function, required: true },
  },
  data: () => ({
    clicked: false,
    wait: 2000,
  }),
  methods: {
    async copy () {
      if (!IN_BROWSER) return;

      const el = this.target();

      el.setAttribute('contenteditable', 'true');
      el.focus();

      document.execCommand('selectAll', false, null);
      document.execCommand('copy');

      el.removeAttribute('contenteditable');

      this.clicked = true;

      await wait(this.wait);

      this.clicked = false;
    },
  },
};
</script>
