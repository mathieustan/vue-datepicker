<template>
  <v-container>
    <VueDatePicker
      v-model="date"
      fullscreen-mobile
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
