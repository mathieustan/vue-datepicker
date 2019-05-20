<template>
  <div id="app">
    <DatePicker
      v-model="currentDate"
      :locale="locale"
      :min-date="minDate"
      :end-date="endDate"
    />
  </div>
</template>

<script>
import DatePicker from './components/DatePicker.vue';

export default {
  name: 'App',
  components: {
    DatePicker,
  },
  data: () => ({
    currentDate: Date.now(),
    locale: {
      lang: 'fr',
      weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    },
    minDate: '2018-5-1',
    endDate: '2019-5-30',
  }),
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
