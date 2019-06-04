<template>
  <div class="example-wrapper">
    <!-- EXAMPLE : Default -->
    <div class="example-title">
      <p class="title">{{ title }} : </p>
      <div class="inputs">
        <slot name="inputs" />
      </div>
    </div>
    <div class="example-content">
      <div class="example-row">
        <p>Example:</p>
        <slot name="datepicker" />
      </div>
      <div class="example-code">
        <slot name="code" />
      </div>
      <div v-if="currentDate" class="example-result">
        <p>v-model="{{ currentDate }}"</p>
      </div>
      <div v-else class="example-result">
        <slot name="result" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Example',
  props: {
    title: { type: String, default: String },
    currentDate: { type: [String, Object, Date, Array] },
  },
};
</script>

<style lang="scss" scoped>
  .example-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: ($gutter*4);
    border-radius: 8px;
    background-color: white;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
        0px 2px 2px 0px rgba(0,0,0,0.14),
        0px 1px 5px 0px rgba(0,0,0,0.12);

    @include mq(tablet) {
      margin-bottom: ($gutter*6);
    }

    &.example-inline,
    &.example-range {
      .example-row {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  .example-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: $gutter*2;
    margin: 0;
    border-radius: 8px 8px 0 0;

    @include mq(tablet) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .title {
      font-weight: get-font-weight(medium);
      margin: 0;
    }

    .inputs {
      margin-top: $gutter;
    }
  }

  .example-content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    border-top: 1px solid color(other, light-gray);
    font-size: 16px;
    line-height: 16px;

    .example-row {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      padding: $gutter*2;
      background-color: white;
    }

    .example-code {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;

      pre {
        width: 100%;
        margin: 0;
        border-radius: 0;

        &:after {
          border-radius: 0;
        }
      }
    }

    .example-result {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      width: 100%;
      padding: $gutter*2;
      border-radius: 0 0 8px 8px;

      p {
        margin: $gutter*2 0;
      }
    }
  }
</style>
