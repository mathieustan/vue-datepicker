<template>
  <VueDatePicker v-model="date" range validate>
    <!--
      # Values you can use with date scoped slot :
      day, isCurrent, isSelected, isBetween, isInRange, isFirstRangeDay, isLastRangeDay,
      isFirstSelectedDay, isLastSelectedDay, isDisabled
    -->
    <template #day="{ day }">
      <span title="it's a scoped slot day with custom title (could be a tooltip)">
        {{ day }}
      </span>
    </template>
  </VueDatePicker>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
  }),
};
</script>
