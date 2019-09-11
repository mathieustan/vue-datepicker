<template>
  <!-- eslint-disable max-len -->
  <label :for="id">
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fal"
      data-icon="calendar-alt"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512">
      <path
        :fill="color"
        d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"
      />
    </svg>
  </label>
</template>

<script>
export default {
  name: 'DatePickerCalendarIcon',
  props: {
    id: { type: String, default: String },
    color: { type: String, default: String },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/abstracts/_index.scss';

  label {
    cursor: inherit;
    margin-right: $gutter;

    .datepicker-container--rtl & {
      margin-right: unset;
      margin-left: $gutter;
    }
  }
  svg {
    display: flex;
    font-size: 1em;
    height: 1em;
    width: 0.875em;
    overflow: visible;
    vertical-align: -0.125em;
    margin-bottom: 2px;
  }
</style>
