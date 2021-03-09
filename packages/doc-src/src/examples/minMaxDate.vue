<template>
  <VueDatePicker
    v-model="date"
    :min-date="minDate"
    :max-date="maxDate"
  />
</template>

<script>
const date = new Date();

export default {
  data: () => ({
    date,
    minDate: `${date.getFullYear()}-${date.getMonth()}-2`,
    maxDate: `${date.getFullYear()}-${date.getMonth()}-29`,
  }),
};
</script>
