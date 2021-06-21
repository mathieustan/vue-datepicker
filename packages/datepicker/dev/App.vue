<template>
  <div class="app">
    <div class="app-inner">
      <Topbar />
      <Playground />
    </div>
  </div>
</template>

<script>
import Topbar from './Topbar.vue';
import Playground from './Playground.vue';

export default {
  components: {
    Topbar,
    Playground,
  },
};
</script>

<style>
  *, :after, :before {
    background-repeat: no-repeat;
    box-sizing: border-box;
  }

  body, html {
    font-size: 16px!important;
    padding: 0;
    margin: 0;
    background-color: #fff;
  }

  html {
    font-family: 'Roboto', sans-serif;
  }
</style>

<style scoped lang="scss">
  .app {
    display: flex;

    &-inner {
      flex: 1 1 auto;
      backface-visibility: hidden;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      max-width: 100%;
      position: relative;
    }
  }
</style>
