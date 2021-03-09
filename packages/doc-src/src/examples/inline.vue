<template>
  <VueDatePicker
    v-model="date"
    inline
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
