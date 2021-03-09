<template>
  <VueDatePicker
    v-model="date"
    format="YYYY-MM-DD"
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
