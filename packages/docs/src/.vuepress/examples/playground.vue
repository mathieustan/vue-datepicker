<template>
  <div class="ma-auto">
    <!-- <GAlert v-if="rangeNotAllowed" type="warning" text outlined> Range is only working with date type right now</GAlert> -->
    <VueDatePicker
      v-model="date"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data: () => ({
    date: undefined,
    show: true,
    defaults: {
      inline: false,
      validate: false,
      disabled: false,
      noHeader: false,
      noCalendarIcon: false,
      range: false,
      placeholder: undefined,
      type: 'date',
      color: undefined,
    },
    options: {
      booleans: ['inline', 'validate', 'disabled', 'noHeader', 'noCalendarIcon', 'range'],
      inputs: ['placeholder'],
      selects: {
        type: ['date', 'month', 'quarter', 'year'],
        color: [
          { text: 'orange', value: '#f8a623' },
          { text: 'red', value: '#ff4577' },
          { text: 'purple', value: '#9f4fff' },
          { text: 'blue', value: '#4f88ff' },
          { text: 'green', value: '#23edad' },
        ],
      },
    },
  }),
  computed: {
    rangeNotAllowed () {
      return this.$attrs.type !== 'date' && this.$attrs.range;
    },
  },
};
</script>
