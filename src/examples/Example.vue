<template>
  <div class="example-wrapper">
    <!-- EXAMPLE : Default -->
    <p class="subtitle"> <span class="tile" />{{ title }} : </p>
    <div class="example">
      <div class="example-row">
        <p>Example:</p>
        <slot name="datepicker" />
      </div>
      <div class="example-code">
        <slot name="code" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Example',
  props: {
    title: { type: String, default: String },
  },
};
</script>

<style lang="scss" scoped>
  .example-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: ($gutter*4);

    @include mq(tablet) {
      margin-bottom: ($gutter*6);
    }

    &.example-inline {
      .example-row {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  p.subtitle {
      display: flex;
      align-items: center;
      margin-bottom: $gutter*2;

      .tile {
        background-color: color(other, dark-purple);
        height: 8px;
        width: 8px;
        border-radius: 50%;
        margin-right: $gutter;
      }
    }

  .example {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    border: 1px solid color(other, light-gray);
    border-radius: 8px;

    .example-row {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      padding: $gutter*2;
      background-color: white;
      border-radius: 8px 8px 0 0;
      font-size: 16px;
      line-height: 16px;
    }

    .example-code {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      border-radius: 0 0 8px 8px;

      pre {
        width: 100%;
        margin: 0;
        border-radius: 0;
      }
    }
  }
</style>
