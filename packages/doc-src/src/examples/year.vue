<template>
  <VueDatePicker
    v-model="date"
    min-date="1980"
    max-date="2020"
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
