<template>
  <VueDatePicker v-model="date" no-calendar-icon />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
