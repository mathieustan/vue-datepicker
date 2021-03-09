<template>
  <VueDatePicker
    v-model="date"
    min-date="2018-3"
    max-date="2019-3"
    type="month"
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
