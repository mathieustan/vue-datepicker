<template>
  <v-container>
    <VueDatePicker
      v-model="date"
      ref="menu"
      :max-date="new Date().toISOString().substr(0, 10)"
      min-date="1980-01-01"
      @onOpen="menu = true"
      @onClose="menu = false"
    >
      <template #activator="{ date }">
        <v-text-field
          ref="activator"
          :value="date"
          label="Date"
          append-inner-icon="fal fa-calendar-alt"
          readonly
          outlined
          hide-details
        />
      </template>
    </VueDatePicker>
  </v-container>
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

