<template>
  <VueDatePicker
    v-model="date"
    min-date="2012-02-12"
    max-date="2021-02-12"
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
