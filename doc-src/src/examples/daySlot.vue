<template>
  <VueDatePicker v-model="date" range validate>
    <!--
      # Values you can use with date scoped slot :
      day, isCurrent, isSelected, isBetween, isInRange, isFirstRangeDay, isLastRangeDay,
      isFirstSelectedDay, isLastSelectedDay, isDisabled
    -->
    <template #day="{ day, isCurrent, isSelected, isBetween, isFirstRangeDay, isLastRangeDay }">
      <div
        :class="{
          'scoped-day--current': isCurrent,
          'scoped-day--selected': isSelected,
          'scoped-day--first-range-day': isFirstRangeDay,
          'scoped-day--between': isBetween,
          'scoped-day--last-range-day': isLastRangeDay,
        }"
        title="it's a scoped slot day with custom title (could be a tooltip)"
        class="scoped-day"
      >
        <span class="scoped-day__text">{{ day }}</span>
      </div>
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

<style lang="scss" scoped>
  $default-transition: all .3s ease-in-out;
  $selected-background-color: cornflowerblue;
  $selected-text-color: white;
  $in-range-background-color: transparentize(cornflowerblue, .8);

  .scoped-day {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px 0;
    height: calc(100% - 4px);
    width: 100%;
    transition: $default-transition;
    transition-property: background, color;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%;
      background-color: white;
      z-index: 0;
      opacity: 0;
      transition: $default-transition;
      transition-property: opacity;
    }

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      border: 1px solid;
      border-color: $selected-background-color;
      border-radius: 50%;
      background-color: $selected-background-color;
      opacity: 0;
      transform: scale(0);
      transition: $default-transition;
      transition-property: background-color, opacity, transform, border-color;
    }

    &:hover:not(.scoped-day--selected):not(.scoped-day--between) {
      &:after {
        transform: scale(1);
        opacity: .12;
      }
    }

    &--selected,
    &--between {
      background-color: $in-range-background-color;
    }

    &--current {
      &:after {
        transform: scale(1);
        background-color: white;
        border-color: currentColor;
        opacity: 1;
      }

      &.scoped-day--selected,
      &.scoped-day--between {
        &:after {
          border-color: transparent;
          background-color: transparent;
        }
      }
    }

    &--selected {
      background-color: $in-range-background-color;
      color: $selected-text-color;

      &:after {
        background-color: $selected-background-color;
        transform: scale(1);
        opacity: 1;
      }
    }

    &--first-range-day {
      &:before {
        opacity: 1;
        left: 0;
      }
    }

    &--last-range-day {
      color: currentColor;

      &:before {
        opacity: 1;
        right: 0;
      }

      &:after {
        background-color: white;
        border: 1px solid $selected-background-color;
      }
    }

    &__text {
      display: block;
      z-index: 1;
    }
  }
</style>
