<template>
  <VueDatePicker
    v-model="date"
    button-validate="Ok"
    button-cancel="Cancel"
    validate
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
