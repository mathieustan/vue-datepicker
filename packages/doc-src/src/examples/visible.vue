<template>
  <div class="d-flex flex-column align-start">
    <div class="d-flex align-center p-b-16">
      Toggle Visibility
      <input
        type="checkbox"
        id="isVisible"
        name="isVisible"
        v-model="isVisible"
      >
    </div>

    <VueDatePicker
      v-model="date"
      :visible="isVisible"
      @onClose="isVisible = false"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    date: null,
    isVisible: false,
  }),
  methods: {
    toggleVisibility () {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>
