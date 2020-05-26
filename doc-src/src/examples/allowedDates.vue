<template>
  <VueDatePicker
    v-model="date"
    :allowed-dates="allowedDates"
  />
</template>

<script>
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ALLOWED_DAYS = ['Monday', 'Tuesday', 'Thursday', 'Friday'];

export default {
  data: () => ({
    date: null,
  }),
  methods: {
    // date is a javascript date
    allowedDates: date => {
      const activeDay = DAYS[date.getDay()];
      return ALLOWED_DAYS.includes(activeDay);
    },
  },
};
</script>
