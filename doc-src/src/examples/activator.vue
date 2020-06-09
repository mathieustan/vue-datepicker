<template>
  <VueDatePicker v-model="date">
    <!-- another notation: <template v-slot:activator="{ date }"> -->
    <!-- older notation: <template slot="activator" slot-scope="{ date }"> -->
    <!-- 2.6 notation -->
    <template #activator="{ date }">
      <button
        class="button custom__button"
        ref="activator"
        type="button"
      >
        {{ date }}
      </button>
    </template>
  </VueDatePicker>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>

<style lang="scss" scoped>
  .custom__button {
    text-transform: capitalize;
    padding: 8px;
    background-color: #2d2b55;

    &:hover {
      background-color: transparentize(#2d2b55, .3);
    }
  }
</style>

