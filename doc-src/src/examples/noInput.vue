<template>
  <VueDatePicker v-model="date" no-input />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
