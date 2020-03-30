<template>
  <VueDatePicker v-model="date" />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
