<template>
  <VueDatePicker v-model="date" no-header />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
