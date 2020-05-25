<template>
  <VueDatePicker
    v-model="date"
    :allowed-dates="allowedDates"
  />
</template>

<script>
export default {
  data: () => ({
    date: null,
  }),
  methods: {
    allowedDates: date => {
      // date is a javascript date
      const day = date.getDay();
      return day % 2 === 0;
    },
  },
};
</script>
