<template>
  <v-container>
    <VueDatePicker v-model="date">
      <template #input-icon>
        <v-icon size="16">fal fa-calendar-week</v-icon>
      </template>
    </VueDatePicker>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
