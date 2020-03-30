<template>
  <VueDatePicker
    v-model="date"
    fullscreen-mobile
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
