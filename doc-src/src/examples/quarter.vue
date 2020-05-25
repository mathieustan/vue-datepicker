<template>
  <VueDatePicker
    v-model="date"
    min-date="2018-3"
    max-date="2020-3"
    type="quarter"
  />
</template>

<script>
export default {
  data: () => ({
    date: '2019-2',
  }),
};
</script>
