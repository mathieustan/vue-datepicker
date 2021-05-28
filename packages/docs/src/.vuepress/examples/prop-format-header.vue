<template>
  <v-container>
    <VueDatePicker
      v-model="date"
      format-header="dddd, DD MMMM"
    />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
