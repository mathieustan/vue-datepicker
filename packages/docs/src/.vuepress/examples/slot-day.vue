<template>
  <v-container>
    <VueDatePicker v-model="date" validate>
      <!--
        # Values you can use with date scoped slot :
        day, isCurrent, isSelected, isBetween, isInRange, isFirstRangeDay, isLastRangeDay,
        isFirstSelectedDay, isLastSelectedDay, isDisabled
      -->
      <template #day="{ day }">
        <GTooltip top :disabled="!isEventDay(day)">
            <template #activator="{ on }">
              <span v-on="on"> {{ day }} <span v-if="isEventDay(day)" class="event"/> </span>
            </template>
            <span>There is an event</span>
          </GTooltip>
      </template>
    </VueDatePicker>
  </v-container>
</template>

<script>
const DAYS_WITH_EVENTS = ['1', '3', '18'];

export default {
  data: () => ({
    date: new Date(),
  }),
  methods: {
    isEventDay (date) {
      return DAYS_WITH_EVENTS.includes(date);
    },
  },
};
</script>

<style lang="scss" scoped>
.event {
  position: absolute;
  left: 50%;
  bottom: 0;
  text-align: center;
  white-space: pre;
  height: 6px;
  width: 6px;
  transform: translateX(-50%);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background-color: #ffeb3b;
  }
}
</style>
