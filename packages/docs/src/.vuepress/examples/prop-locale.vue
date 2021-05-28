<template>
  <v-container>
    <VueDatePicker
      v-model="date"
      :locale="locale"
    />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    locale: { lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] },
  }),
};
</script>
