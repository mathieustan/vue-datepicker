<template>
  <div class="code-wrapper">

    <prism
      v-if="$slots.default || source"
      :language="computedType"
      :code="source"
      :data-title="type"
      >
      <slot />
    </prism>

    <div class="code-wrapper__copy">
      <button type="button" class="button" @click="copyMarkup">
        <svg
          height="24"
          width="24"
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="copy"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="svg-inline--fa fa-copy fa-w-14 fa-2x">
          <path
            fill="currentColor"
            d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM352 32.491a15.88 15.88 0 0 1 7.431 4.195l51.882 51.883A15.885 15.885 0 0 1 415.508 96H352V32.491zM288 464c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V144c0-8.822 7.178-16 16-16h80v240c0 26.51 21.49 48 48 48h112v48zm128-96c0 8.822-7.178 16-16 16H176c-8.822 0-16-7.178-16-16V48c0-8.822 7.178-16 16-16h144v72c0 13.2 10.8 24 24 24h72v240z" />
        </svg>
      </button>

      <transition name="slide-x-transition">
        <span
          v-if="copied"
          class="code-wrapper__copied"
        >Copied</span>
      </transition>
    </div>
  </div>
</template>

<script>
// Prism
import 'prismjs';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-scss.js';

export default {
  name: 'CodeWrapper',
  components: {
    Prism: () => import('vue-prism-component'),
  },
  props: {
    type: { type: String, default: String },
    source: { type: String },
  },
  data: () => ({
    copied: false,
  }),
  computed: {
    computedType () {
      if (this.type === 'HTML') return 'markup';
      return this.type;
    },
  },
  methods: {
    copyMarkup () {
      const markup = this.$el.querySelector('pre');
      markup.setAttribute('contenteditable', 'true');
      markup.focus();
      document.execCommand('selectAll', false, null);
      this.copied = document.execCommand('copy');
      markup.removeAttribute('contenteditable');
      setTimeout(() => { this.copied = false; }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import   '../styles/abstracts';

  .code-wrapper {
    position: relative;
    background: color(other, dark-purple);
    color: white;

    &__copy {
      position: absolute;
      top: 16px;
      right: 16px;
      cursor: pointer;
      width: 50px;
      height: 50px;
      z-index: 1;

      button {
        color: inherit;
        position: absolute;
        right: 0;
        transition: opacity .2s ease-in;
        font-size: 1.5rem;
        opacity: 0;
        top: 0;
        width: 50px;
        height: 50px;
        z-index: 4;
      }
    }

    &__copied {
      position: absolute;
      top: 10px;
      right: 60px;
    }

    &:hover {
      .code-wrapper__copy {
        button {
          opacity: 1;
        }

        &:after {
          opacity: 0;
        }
      }
    }
  }
</style>

<style lang="scss">
  // Prism Theme
  // https://github.com/PrismJS/prism-themes/blob/master/themes/prism-material-light.css

  code[class*="language-"],
  pre[class*="language-"] {
    color: #ccc;
    background: none;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
  }

  pre[class*="language-"] {
    padding: 1em;
    overflow: auto;
    margin: 0;
  }

  :not(pre) > code[class*="language-"] {
    padding: .1em;
    border-radius: .3em;
    white-space: normal;
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #999;
  }

  .token.punctuation {
    color: #ccc;
  }

  .token.tag,
  .token.attr-name,
  .token.namespace,
  .token.deleted {
    color: #e2777a;
  }

  .token.function-name {
    color: #6196cc;
  }

  .token.boolean,
  .token.number,
  .token.function {
    color: #f08d49;
  }

  .token.property,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: #f8c555;
  }

  .token.selector,
  .token.important,
  .token.atrule,
  .token.keyword,
  .token.builtin {
    color: #cc99cd;
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable {
    color: #7ec699;
  }

  .token.operator,
  .token.entity,
  .token.url {
    color: #67cdcc;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.inserted {
    color: green;
  }
</style>
