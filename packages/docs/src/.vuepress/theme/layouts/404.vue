<template>
  <v-app>
    <v-container class="fill-height text-center">
      <v-row align="center" justify="center">
        <v-col cols="12" md="6" lg="4">
          <h1>404</h1>
          <blockquote class="mb-4">{{ getMsg() }}</blockquote>
          <v-btn link color="primary" to="/">
            Take me home.
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`,
];

export default {
  name: 'NotFound',
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)];
    },
  },
};
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 10em;
    line-height: 1;
    font-weight: bold;
    color: transparent;
    -webkit-text-stroke: 2px blue;
  }
</style>
