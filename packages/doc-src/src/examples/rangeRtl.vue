<template>
  <VueDatePicker
    v-model="date"
    :min-date="minDate"
    :max-date="maxDate"
    placeholder="Début - Fin"
    range
    range-header-text="Du %d au %d"
    range-input-text="Du %d au %d"
    fullscreen-mobile
    validate
    rtl
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    currentDate: new Date(),
  }),
  computed: {
    minDate () {
      return new Date(
        this.currentDate.getFullYear() - 1,
        this.currentDate.getMonth(),
        this.currentDate.getDate()
      );
    },
    maxDate () {
      return new Date(
        this.currentDate.getFullYear() + 1,
        this.currentDate.getMonth(),
        this.currentDate.getDate(),
      );
    },
  },
};
</script>
