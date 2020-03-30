<template>
  <VueDatePicker
    v-model="date"
    min-date="2016"
    max-date="2022"
    type="year"
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
