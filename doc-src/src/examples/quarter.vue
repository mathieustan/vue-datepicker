<template>
  <VueDatePicker
    v-model="date"
    :min-date="minDate"
    :max-date="maxDate"
    type="quarter"
  />
</template>

<script>
const date = new Date();

export default {
  data: () => ({
    date: `${date.getFullYear()}-2`,
    minDate: `${date.getFullYear() - 3}-2`,
    maxDate: `${date.getFullYear() + 3}-2`,
  }),
};
</script>
