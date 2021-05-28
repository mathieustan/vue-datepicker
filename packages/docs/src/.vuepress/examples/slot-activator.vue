<template>
  <v-container>
    <VueDatePicker v-model="date">
      <template #activator="{ date }">
        <v-text-field
          ref="activator"
          :value="date"
          label="Date"
          append-inner-icon="fal fa-calendar-alt"
          readonly
          outlined
          hide-details
        />
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

