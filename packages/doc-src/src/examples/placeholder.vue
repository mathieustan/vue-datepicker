<template>
  <VueDatePicker
    v-model="date"
    placeholder="Choose date"
  />
</template>

<script>
export default {
  data: () => ({
    date: null,
  }),
};
</script>
