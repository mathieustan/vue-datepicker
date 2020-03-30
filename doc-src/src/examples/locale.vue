<template>
  <VueDatePicker
    v-model="date"
    :locale="locale"
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    locale: { lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] },
  }),
};
</script>
