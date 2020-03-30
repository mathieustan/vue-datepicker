<template>
  <VueDatePicker
    v-model="date"
    :visible-years-number="50"
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
