<template>
  <div class="home flex flex-col h-full p-4 sm:p-6 xl:p-8 bg-blue-400 bg-opacity-10">
    <Content />
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  z-index: 50;
}
</style>
