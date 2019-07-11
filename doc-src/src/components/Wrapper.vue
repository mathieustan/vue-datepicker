<template>
  <div :style="style" class="wrapper">
    <div
      v-if="$slots.description"
      :style="{ padding: padding }"
      class="wrapper__block wrapper__description">
      <slot name="description" />
    </div>

    <div
      v-if="$slots.inputs"
      :style="{ padding: padding }"
      class="wrapper__block wrapper__inputs">
      <slot name="inputs" />
    </div>

    <div
      v-if="$slots.example"
      :style="{ padding: padding }"
      class="wrapper__block wrapper__example">
      <div class="wrapper__example__item">
        <slot name="example" />
      </div>
    </div>

    <div
      v-if="$slots.code"
      class="wrapper__block wrapper__code">
      <slot name="code" />
    </div>

    <div
      v-if="$slots.result"
      :style="{ padding: padding }"
      class="wrapper__block wrapper__result">
      <slot name="result" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: {
    backgroundColor: { type: String, default: 'transparent' },
    maxWidth: { type: String, default: 'auto' },
    height: { type: String, default: 'auto' },
    padding: { type: String, default: '16px' },
  },
  computed: {
    style () {
      return {
        backgroundColor: this.backgroundColor,
        maxWidth: this.maxWidth,
        height: this.height,
        margin: this.margin,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import   '../styles/abstracts/functions',
            '../styles/abstracts/variables',
            '../styles/abstracts/mixins';
.wrapper {
  display: flex;
  border: 1px solid color(other, light-gray);
  border-radius: get-border-radius(3);
  overflow: hidden;

  h3 {
    margin: 0;
  }

  pre {
    border-radius: 0;
  }

  & + .wrapper {
    margin-top: ($gutter*4);
  }

  &__block {
    width: 100%;

    & + .wrapper__block {
      border-top: 1px solid color(other, light-gray)
    }
  }

  &__example__item {
    width: fit-content;
  }

  &__inputs {
    font-size: 14px;
  }

  &__result {
    background-color: white;
    font-size: 14px;
  }

  p {
    margin: 0;
  }
}

.row {
  flex-direction: row;
}
.column {
  flex-direction: column;
}
.justify-center {
  justify-content: center;
}
.justify-end {
  justify-content: flex-end;
}
.justify-space-around {
  justify-content: space-around;
}
.justify-space-between {
  justify-content: space-between;
}
.justify-start {
  justify-content: flex-start;
}
.align-center {
  align-items: center;
}
.align-end {
  align-items: flex-end;
}
.align-space-around {
  align-items: space-around;
}
.align-space-between {
  align-items: space-between;
}
.align-start {
  align-items: flex-start;
}
</style>
