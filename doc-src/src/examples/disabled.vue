<template>
  <VueDatePicker v-model="date" disabled />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
