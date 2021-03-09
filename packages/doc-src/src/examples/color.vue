<template>
  <div class="d-flex flex-column align-start">
    <div class="d-flex align-center p-b-16">
      <label for="lang-select" class="p-r-16"> Choose a color: </label>
      <select id="lang-select" v-model="color">
        <option
          v-for="(color, index) in colorList"
          :key="index"
          :value="color.hex">
          {{ color.name }}
        </option>
      </select>
    </div>

    <VueDatePicker
      v-model="date"
      :color="color"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    color: '#ff4577',
    colorList: [
      { name: 'orange', hex: '#f8a623' },
      { name: 'red', hex: '#ff4577' },
      { name: 'purple', hex: '#9f4fff' },
      { name: 'blue', hex: '#4f88ff' },
      { name: 'green', hex: '#23edad' },
    ],
  }),
};
</script>
