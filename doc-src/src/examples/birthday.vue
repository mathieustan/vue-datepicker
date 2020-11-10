<template>
  <VueDatePicker
    v-model="date"
    ref="menu"
    :max-date="new Date().toISOString().substr(0, 10)"
    min-date="1980-01-01"
    @onOpen="menu = true"
    @onClose="menu = false"
  />
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    menu: false,
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.menu.$refs.agenda.mode = 'year'));
    },
  },
};
</script>

