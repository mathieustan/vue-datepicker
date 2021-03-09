<template>
  <VueDatePicker v-model="date">
    <template #input-icon>
      <i class="fa fa-calendar-week" />
    </template>
  </VueDatePicker>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
