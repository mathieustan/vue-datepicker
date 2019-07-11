<template>
  <div class="datepicker-validate">
    <button
      type="button"
      class="datepicker-validate__button"
      @click="$emit('cancel')">
      <div
        :style="setBackgroundColor(color)"
        class="datepicker-validate__effect"
      />
      <div class="datepicker-validate__name">{{ buttonCancel }}</div>
    </button>
    <button
      type="button"
      :style="setTextColor(color)"
      class="datepicker-validate__button"
      @click="$emit('validate')">
      <div
        :style="setBackgroundColor(color)"
        class="datepicker-validate__effect"
      />
      <div class="datepicker-validate__name">{{ buttonValidate }}</div>
    </button>
  </div>
</template>

<script>
// mixins
import colorable from '../../mixins/colorable';

export default {
  name: 'DatePickerValidate',
  mixins: [colorable],
  props: {
    buttonValidate: { type: String },
    buttonCancel: { type: String },
    color: { type: String },
  },
};
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/functions',
            '../../styles/abstracts/variables',
            '../../styles/abstracts/mixins';

  .datepicker-validate {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 $gutter*2 $gutter $gutter*2;

    &__button {
      @extend %reset-button;
      position: relative;
      display: inline-flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      height: 36px;
      min-width: 88px;
      font-size: 14px;
      font-weight: 500;
      border-radius: get-border-radius(1);
      margin: 6px 8px;
      outline: 0;
      text-transform: uppercase;
      text-decoration: none;
      overflow: hidden;

      &:hover {
        .datepicker-validate__effect {
          opacity: .1;
        }
      }
    }

    &__effect {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transition: opacity 450ms cubic-bezier(0.23, 1, 0.32, 1);
      z-index: -1;
    }
  }
</style>
