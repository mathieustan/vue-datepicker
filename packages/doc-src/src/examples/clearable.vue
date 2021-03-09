<template>
  <VueDatePicker v-model="date" clearable />
</template>

<script>
export default {
  data: () => ({
    date: null,
  }),
};
</script>
