<template>
  <div class="topbar">
    <h2> Welcome to playground </h2>
    <div />
    <button @click="toggleTheme">
      <i :class="isDark ? 'fal fa-sun' : 'fal fa-moon'" />
    </button >
  </div>
</template>

<script>
export default {
  name: 'Topbar',
  computed: {
    isDark () {
      return false;
    },
  },
  methods: {
    toggleTheme () {

    },
  },
};
</script>

<style lang="scss" scoped>
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    width: 100%;
    height: 72px;
    background-color: white;
    border-color: white;
    border-bottom: thin solid grey;

    h2 {
      font-size: 1.375em;
      font-weight: 400;
      line-height: 1.25;
      margin: 0;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      outline: 0;
      text-decoration: none;
      user-select: none;
      vertical-align: middle;
      white-space: nowrap;
      font-size: 0.875rem;
      background-color: transparent;
      border-radius: 50%;
      min-height: 0;
      height: 36px;
      min-width: 0;
      width: 36px;
      padding: 0;
    }
  }
</style>
