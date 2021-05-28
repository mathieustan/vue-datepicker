<template>
  <v-container>
    <VueDatePicker
      v-model="date"
      format="YYYY-MM-DD"
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
