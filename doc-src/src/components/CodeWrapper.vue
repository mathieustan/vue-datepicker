<template>
  <pre :class="classes" :data-title="type"><code :class="classes"><slot /></code></pre>
</template>

<script>
export default {
  name: 'CodeWrapper',
  props: {
    type: { type: String, default: String },
  },
  computed: {
    classes () {
      return `language-${this.type}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import   '../styles/abstracts/functions',
            '../styles/abstracts/variables',
            '../styles/abstracts/mixins';

  p {
    margin-top: 0;
  }

  code, pre, pre code {
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: auto;
    font-family: monospace;
  }

  code[class*=language-],
  pre[class*=language-] {
    color:color(other, light-blue);
    vertical-align: center;
  }

  pre {
    position: relative;
    display: flex;
    border: none;
    padding: $gutter*4 $gutter*2 $gutter*2;
    margin: 0;
    overflow: auto;
    width: 100%;

    line-height: 1;
    font-size: 13px;

    @include mq(tablet) {
      font-size: 15px;
      padding: ($gutter*5) ($gutter*3) ($gutter*3);
    }

    &[class*=language-] {
      background: color(other, dark-purple);
    }

    &:not(:last-child) {
      margin-top: $gutter*4;
      margin-bottom: $gutter*5;
    }

    &:before {
      content: attr(data-title);
      position: absolute;
      top: 6px;
      padding: 0 $gutter ($gutter/2);
      font-size: 10px;
      right: 20px;
      text-align: right;
      color: #444;
      font-weight: 700;
      letter-spacing: .8px;
      text-transform: uppercase;
      border-radius: 0 0 5px 5px;
      background-color: color(other, light-blue);
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      background-color: color(other, light-blue);
    }

    &.language-bash {
      &:before,
      &:after {
        background-color: color(other, purple);
        color: color(other, light-purple);
      }
    }

    &.language-javascript {
      &:before,
      &:after {
        background-color: color(other, yellow);
      }
    }
  }

  code {
    padding: 0;
    background-color: transparent;
    color: currentColor;
    font-size: 13px;
    line-height: 15px;
    font-weight: 400;

    @include mq(tablet) {
      font-size: 15px;
      line-height: 19px;
    }

    .token {
      &.function {
        color: color(other, yellow);
      }
      &.char, &.string {
        color: #c6feb9;
      }
      &.atrule, &.delimiter, &.important, &.keyword, &.selector {
        color: color(other, orange);
      }
      &.attr-name, &.operator {
        color: #ffb454;
      }
      &.ponctuation {
        color: white;
      }
    }

    span {
      font-style: inherit;
      font-weight: inherit;
    }
  }
</style>
