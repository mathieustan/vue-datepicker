<template>
  <div id="app">
    <div class="header">
      <h1>Vue DatePicker</h1>
    </div>

    <div class="content">
      <div class="content-inner">
        <h2> About </h2>
        <p>
          A responsive date picker for Vue.js, made with love,
          with nice transition and clean design.
        </p>

        <h2> Install </h2>
        <p> 1. Install component with npm </p>
        <pre class="language-bash" data-title="bash">
<code class="language-bash"><span class="token function">npm install </span>vue-datepicker --save</code>
        </pre>

        <p> 2. Load component in your project </p>
        <pre class="language-javascript" data-title="javascript">
<code class="language-javascript"><span class="token keyword">import</span> VueDatePicker <span class="token keyword">from</span><span class="token string"> 'vue-datepicker'</span>;

<span class="token keyword">export default </span> {
  <span class="token function">components</span> : {
    VueDatePicker,
  <span>},</span>
}
</code>
        </pre>

        <p> 3. Use the component </p>
        <pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker <span class="token attr-name">v-model</span>="date" <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
        </pre>

        <h2> Examples (props) </h2>

        <!-- EXAMPLE : Default -->
        <p class="subtitle"> <span class="tile" />Default : </p>
        <div class="example">
          <div class="example-row"> Example: <DatePicker v-model="currentDate" /> </div>
          <div class="example-code">
            <pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker <span class="token attr-name">v-model</span>="date" <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
        </pre>
          </div>
        </div>

        <!-- EXAMPLE : Format -->
        <p class="subtitle"> <span class="tile" /> Format : </p>
        <div class="example">
          <div class="example-row"> Example: <DatePicker v-model="currentDate" format="YYYY-MM-DD" /> </div>
          <div class="example-code">
            <pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker <span class="token attr-name">v-model</span>="date" <span class="token attr-name">format</span>="YYYY-MM-DD" <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
            </pre>
          </div>
        </div>

        <!-- EXAMPLE : Visible -->
        <p class="subtitle"> <span class="tile" /> Visible: </p>
        <div class="example">
          <div class="example-row">
            Example: <DatePicker v-model="currentDate" :visible="isVisible" />

            <input type="checkbox" id="isVisible" name="isVisible" v-model="isVisible">
            <label for="isVisible">isVisible</label>
          </div>
          <div class="example-code">
            <pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker <span class="token attr-name">v-model</span>="date" <span class="token attr-name">:visible</span>="true" <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
            </pre>
          </div>
        </div>

        <!-- EXAMPLE : Color -->
        <p class="subtitle"> <span class="tile" /> color: </p>
        <div class="example">
          <div class="example-row"> Example: <DatePicker v-model="currentDate" color="#ff4577"  /> </div>
          <div class="example-code">
            <pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker <span class="token attr-name">v-model</span>="date" <span class="token attr-name">color</span>="#ff4577" <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
            </pre>
          </div>
        </div>

        <!-- EXAMPLE : MiDate -->
        <p class="subtitle"> <span class="tile" /> minDate & endDate: </p>
        <div class="example">
          <div class="example-row"> Example: <DatePicker v-model="currentDate" min-date="2019-05-03" end-date="2019-08-03" /> </div>
          <div class="example-code">
            <pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker <span class="token attr-name">v-model</span>="date" <span class="token attr-name">min-date</span>="2019-05-03" <span class="token attr-name">end-date</span>="2019-08-03" <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
            </pre>
          </div>
        </div>

        <!-- EXAMPLE : Locale -->
        <p class="subtitle"> <span class="tile" /> locale: </p>
        <div class="example">
          <div class="example-row">
            Example:
            <DatePicker
              v-model="currentDate"
              :locale="{
                lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D']
              }" />
          </div>
          <div class="example-code">
            <pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:locale</span>="{ lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] }"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
            </pre>
          </div>
        </div>

        <div class="example">
          <div class="example-row">
            Example:
            <DatePicker
              v-model="currentDate"
              :locale="{ lang: 'es' }"
            />
          </div>
          <div class="example-code">
            <pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:locale</span>="{ lang: 'es' }"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from './components/DatePicker.vue';

export default {
  name: 'App',
  components: {
    DatePicker,
  },
  data: () => ({
    currentDate: Date.now(),
    minDate: '2018-5-1',
    endDate: '2019-5-30',
    disabled: false,
    isVisible: false,
  }),
};
</script>

<style>
  body {
    margin: 0;
    color: #4a4a4a;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  html {
    background-color: #fff;
    font-size: 16px;
    min-width: 300px;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;
    margin: 0;
    padding: 0;
  }
</style>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }

  .header {
    position: relative;
    display: flex;
    height: 100px;
    width: 100%;
    background-color: color(other, blue);
    color: #fff;
    padding: $gutter*2;
  }

  .content {
    max-width: 1000px;
    margin: 0 auto;
    font-size: 20px;
    font-size: 1.25rem;
    line-height: 1.62;
    color: #3b454e;

    .content-inner {
      text-align: left;
      padding: ($gutter*2);

      @include mq(tablet) {
        padding: $gutter*4;
      }
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
    margin-bottom: $gutter*3;

    @include mq(tablet) {
      margin-bottom: $gutter*4;
    }

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

  .datepicker-container {
    margin: 0 $gutter*2;
  }

  h2 {
    font-size: 2.5rem;
    color: #121212;
    position: relative;
    margin-top: $gutter*6;
    font-size: 1.875rem;

    @include mq(tablet) {
      font-size: 37px;
    }

    &:first-child {
      margin-top: 40px;
    }
  }

  p {
    position: relative;
    display: flex;

    &:not(:last-child) {
      margin-top: 0;
      margin-bottom: $gutter*2;

      @include mq(tablet) {
        margin-bottom: $gutter*3;
      }
    }

    &.subtitle {
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
    border-radius: 8px;
    border: none;
    padding: $gutter*4 $gutter*2 $gutter*2;
    overflow: auto;

    line-height: 1;
    font-size: 13px;

    @include mq(tablet) {
      font-size: 15px;
      padding: ($gutter*6) ($gutter*5) ($gutter*4);
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
      background-color: color(other, light-gray);
    }

    &:after {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      background-color: color(other, light-gray);
    }

    &.language-bash {
      &:before,
      &:after {
        background-color: #363377;
        color: #a2a0d6;
      }
    }

    &.language-javascript {
      &:before,
      &:after {
        background-color: color(other, yellow);
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
      }

      span {
        font-style: inherit;
        font-weight: inherit;
      }
    }
  }
</style>
