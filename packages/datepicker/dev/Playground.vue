<template>
  <main>
    <VueDatePicker :date="date" />
  </main>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>

<style lang="scss" scoped>
main {
  padding: 12px;
}
</style>
