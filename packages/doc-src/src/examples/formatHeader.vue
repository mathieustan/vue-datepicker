<template>
  <VueDatePicker
    v-model="date"
    format-header="dddd, DD MMMM"
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
