<template>
  <v-container>
    <v-row>
      <v-col>
        <p> Day Example :</p>
        <VueDatePicker
          v-model="date"
          :allowed-dates="allowedDates"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p> Month Example :</p>
        <VueDatePicker
          v-model="date"
          :allowed-dates="allowedMonths"
          type="month"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p> Quarter Example :</p>
        <VueDatePicker
          v-model="date"
          :allowed-dates="allowedQuarters"
          type="quarter"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p> Year Example :</p>
        <VueDatePicker
          v-model="date"
          :allowed-dates="allowedYears"
          type="year"
        />
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  data: () => ({
    date: null,
  }),
  methods: {
    // date is a string
    allowedDates: date => {
      // date is : YYYY-MM-DD
      return parseInt(date.split('-')[2], 10) % 2 === 0;
    },
    allowedMonths: date => {
      // date is : YYYY-MM
      return parseInt(date.split('-')[1], 10) % 2 === 0;
    },
    allowedQuarters: date => {
      // date is : YYYY-QQ
      return parseInt(date.split('-')[1], 10) % 2 === 0;
    },
    allowedYears: date => {
      // date is : YYYY
      return parseInt(date, 10) % 2 === 0;
    },
  },
};
</script>
