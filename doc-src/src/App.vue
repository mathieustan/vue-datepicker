<template>
  <!-- eslint-disable max-len -->
  <!-- eslint-disable vue/valid-v-for -->
  <div id="app">
    <div class="header">
      <h1>Vue DatePicker</h1>
    </div>

    <div class="content">
      <div class="content-inner">
        <div class="title">
          <h2> About </h2>
        </div>
        <p>
          A responsive date picker for Vue.js, made with love,
          with nice transition and clean design.
        </p>

        <div class="title">
          <h2> Install </h2>
        </div>
        <p> 1. Install component with npm </p>
        <pre class="language-bash" data-title="bash">
<code class="language-bash"><span class="token function">npm install </span>@mathieustan/vue-datepicker --save</code>
        </pre>

        <p> 2. Load component in your project </p>
        <pre class="language-javascript" data-title="javascript">
<code class="language-javascript"><span class="token keyword">import</span> VueDatePicker <span class="token keyword">from</span><span class="token string"> '@mathieustan/vue-datepicker'</span>;

<span class="token keyword">Vue</span><span class="token function">.use(</span>VueDatePicker<span class="token function">)</span>;
</code>
        </pre>

        Or

        <pre class="language-javascript" data-title="javascript">
<code class="language-javascript"><span class="token keyword">import</span> { VueDatePicker } <span class="token keyword">from</span><span class="token string"> '@mathieustan/vue-datepicker'</span>;

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

        <div class="title">
          <h2> Examples (props) </h2>
        </div>

        <!-- EXAMPLE : Default -->
        <Example title="Default" :current-date="currentDate">
          <template v-slot:datepicker>
            <VueDatePicker v-model="currentDate" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker <span class="token attr-name">v-model</span>="date" <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : Format -->
        <Example title="Format" :current-date="currentDate">
          <template v-slot:datepicker>
            <VueDatePicker v-model="currentDate" format="YYYY-MM-DD" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">format</span>="YYYY-MM-DD"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : Format Header  -->
        <Example title="FormatHeader" :current-date="currentDate">
          <template v-slot:datepicker>
            <VueDatePicker v-model="currentDate" format-header="dddd DD MMMM" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">format-header</span>="dddd DD MMMM"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : Visible -->
        <Example title="Visible" :current-date="currentDate">
          <template v-slot:inputs>
            <input type="checkbox" id="isVisible" name="isVisible" v-model="examples.visible.isVisible">
            <label for="isVisible"> isVisible </label>
          </template>
          <template v-slot:datepicker>
            <VueDatePicker v-model="currentDate" :visible="examples.visible.isVisible" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:visible</span>="{{ examples.visible.isVisible }}"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : Disabled -->
        <Example title="Disabled" :current-date="currentDate">
          <template v-slot:datepicker>
            <VueDatePicker v-model="currentDate" :disabled="true" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:disabled</span>="true"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : Color -->
        <Example title="Color" :current-date="currentDate">
          <template v-slot:inputs>
            <div class="select-box">
              <label for="lang-select"> Choose a color: </label>
              <select id="lang-select" v-model="examples.color.selected">
                <option
                  v-for="(color, index) in examples.color.list"
                  :key="index"
                  :value="color.hex">
                  {{ color.name }}
                </option>
              </select>
            </div>
          </template>
          <template v-slot:datepicker>
            <VueDatePicker v-model="currentDate" :color="examples.color.selected" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">color</span>="{{ examples.color.selected }}"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : Placeholder  -->
        <Example title="Placeholder" :current-date="examples.placeholder.currentDate">
          <template v-slot:datepicker>
            <VueDatePicker v-model="examples.placeholder.currentDate" placeholder="DD/MM/YYYY" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">placeholder</span>="DD/MM/YYYY"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : MinDate -->
        <Example title="minDate & endDate" :current-date="currentDate">
          <template v-slot:datepicker>
            <VueDatePicker v-model="currentDate" :min-date="examples.allowedDates.min" :end-date="examples.allowedDates.max" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">min-date</span>="{{ examples.allowedDates.min }}"
    <span class="token attr-name">end-date</span>="{{ examples.allowedDates.max }}"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : Locale -->
        <Example title="Locale (lang & weekDays)" :current-date="currentDate">
          <template v-slot:datepicker>
            <VueDatePicker
              v-model="currentDate"
              :locale="{
                lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D']
              }" />
          </template>
          <template v-slot:code>
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
          </template>
        </Example>

        <Example title="Locale (only with lang)" :current-date="currentDate">
          <template v-slot:inputs>
            <div class="select-box">
              <label for="lang-select"> Choose a lang: </label>
              <select id="lang-select" v-model="examples.locale.selectedLang">
                <option
                  v-for="(lang, index) in examples.locale.langs"
                  :key="index">
                  {{ lang }}
                </option>
              </select>
            </div>
          </template>
          <template v-slot:datepicker>
            <VueDatePicker
              v-model="currentDate"
              :locale="{ lang: examples.locale.selectedLang }" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:locale</span>="{ lang: {{ examples.locale.selectedLang }} }"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : Inline -->
        <Example title="Inline" class="example-inline" :current-date="currentDate">
          <template v-slot:datepicker>
            <VueDatePicker v-model="currentDate" :inline="true" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:inline</span>="true"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : Type: Month -->
        <Example title="Month picker (type: 'month')" :current-date="examples.month.currentDate" class="example-inline">
          <template v-slot:datepicker>
            <VueDatePicker
              v-model="examples.month.currentDate"
              type="month"
              :min-date="examples.month.min"
              :end-date="examples.month.end"
              :inline="true" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:min-date</span>="{{ examples.month.min }}"
    <span class="token attr-name">:end-date</span>="{{ examples.month.end }}"
    <span class="token attr-name">type</span>="month"
    <span class="token attr-name">:inline</span>="true"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : Type: Quarter -->
        <Example
          title="Quarter picker (type: 'quarter')"
          :current-date="examples.quarter.currentDate"
          class="example-inline">
          <template v-slot:datepicker>
            <VueDatePicker
              v-model="examples.quarter.currentDate"
              type="quarter"
              :min-date="examples.quarter.min"
              :end-date="examples.quarter.end"
              :inline="true" />
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:min-date</span>="{{ examples.quarter.min }}"
    <span class="token attr-name">:end-date</span>="{{ examples.quarter.end }}"
    <span class="token attr-name">type</span>="quarter"
    <span class="token attr-name">:inline</span>="true"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : Range Picker -->
        <Example
          title="Ranger picker example"
          class="example-range">
          <template v-slot:datepicker>
            <div class="datepicker-range">
              <div class="datepicker-range__row">
                <span class="datepicker-label">Du</span>
                <VueDatePicker
                  v-model="examples.range.startDate"
                  :name="`Starting Date`"
                  :min-date="examples.range.min"
                  :end-date="examples.range.end"
                  :fullscreen-mobile="examples.range.fullscreenMobile"
                  @onChange="onStartDateChange"
                />
              </div>
              <div class="datepicker-range__row">
                <span class="datepicker-label">Au</span>
                <VueDatePicker
                  v-model="examples.range.endDate"
                  :name="`Ending Date`"
                  :min-date="examples.range.startDate"
                  :end-date="examples.range.end"
                  :visible="examples.range.showEndDate"
                  :fullscreen-mobile="examples.range.fullscreenMobile"
                  @onClose="examples.range.showEndDate = false"
                />
              </div>
            </div>
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="startDate"
    <span class="token attr-name">:name</span>="`Starting Date`"
    <span class="token attr-name">:min-date</span>="{{ examples.range.min }}"
    <span class="token attr-name">:end-date</span>="{{ examples.range.end }}"
    <span class="token attr-name">:fullscreen-mobile</span>="{{ examples.range.fullscreenMobile }}"
    <span class="token attr-name">@onChange</span>="showEndDate = true"
  <span class="token operator">/></span>
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="endDate"
    <span class="token attr-name">:name</span>="`Ending Date`"
    <span class="token attr-name">:min-date</span>="startDate"
    <span class="token attr-name">:end-date</span>="{{ examples.range.end }}"
    <span class="token attr-name">:fullscreen-mobile</span>="{{ examples.range.fullscreenMobile }}"
    <span class="token attr-name">:visible</span>="showEnDate"
    <span class="token attr-name">@onClose</span>="showEndDate = false"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
          <template v-slot:result>
            <p>startDate="{{ examples.range.startDate }}"</p>
            <p>endDate="{{ examples.range.endDate }}"</p>
          </template>
        </Example>

        <div class="title">
          <h2> Events </h2>
        </div>

        <!-- EXAMPLE : onOpen -->
        <Example title="onOpen" :current-date="currentDate">
          <template v-slot:datepicker>
            <VueDatePicker v-model="currentDate" @onOpen="showTimeoutMessage('datepicker opened', 'onOpen')"/>
            {{ examples.onOpen.message }}
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">@onOpen</span>="examples.onOpen.message = 'datepicker opened'"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : onClose -->
        <Example title="onClose" :current-date="currentDate">
          <template v-slot:datepicker>
            <VueDatePicker v-model="currentDate" @onClose="showTimeoutMessage('datepicker closed', 'onClose')" />
            {{ examples.onClose.message }}
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">@onClose</span>="examples.onClose.message = 'datepicker closed'"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>

        <!-- EXAMPLE : onChange -->
        <Example title="onChange" :current-date="currentDate">
          <template v-slot:datepicker>
            <VueDatePicker v-model="currentDate" @onChange="showTimeoutMessage('date changed', 'onChange')" />
            {{ examples.onChange.message }}
          </template>
          <template v-slot:code>
<pre class="language-HTML" data-title="html">
<code class="language-HTML"><span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">@onChange</span>="examples.onChange.message = 'date changed'"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</code>
</pre>
          </template>
        </Example>
      </div>
    </div>
  </div>
</template>

<script>
import Example from './components/Example.vue';

export default {
  name: 'App',
  components: {
    Example,
  },
  data: () => ({
    currentDate: new Date(),
    examples: {
      visible: {
        isVisible: false,
      },
      color: {
        selected: '#ff4577',
        list: [
          { name: 'orange', hex: '#f8a623' },
          { name: 'red', hex: '#ff4577' },
          { name: 'purple', hex: '#9f4fff' },
          { name: 'blue', hex: '#4f88ff' },
          { name: 'green', hex: '#23edad' },
        ],
      },
      placeholder: {
        currentDate: undefined,
      },
      allowedDates: {
        min: '2019-5-3',
        max: '2019-8-12',
      },
      locale: {
        selectedLang: 'es',
        langs: ['es', 'en', 'fr'],
      },
      month: {
        currentDate: new Date().toISOString().substr(0, 7),
        min: '2018-11',
        end: '2019-07',
      },
      quarter: {
        currentDate: '2019-2',
        min: '2018-2',
        end: '2019-3',
      },
      range: {
        startDate: undefined,
        endDate: undefined,
        showEnDate: false,
        min: '2018-08-12',
        end: '2019-08-12',
        fullscreenMobile: true,
      },
      onOpen: {
        message: '',
        timeoutId: undefined,
      },
      onClose: {
        message: '',
        timeoutId: undefined,
      },
      onChange: {
        message: '',
        timeoutId: undefined,
      },
    },
  }),
  methods: {
    showTimeoutMessage (message, key, timeout = 1000) {
      this.examples[key].message = message;

      clearTimeout(this.examples[key].timeoutId);
      this.examples[key].timeoutId = setTimeout(() => {
        this.examples[key].message = '';
      }, timeout);
    },
    onStartDateChange () {
      this.examples.range.showEndDate = true;
      this.examples.range.endDate = this.examples.range.startDate;
    },
  },
};
</script>

<style>
  *, ::before, ::after {
    box-sizing: border-box;
  }

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
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;
    margin: 0;
    padding: 0;
  }
</style>

<style lang="scss" scoped>
  @import   '../../src/styles/abstracts/functions',
            '../../src/styles/abstracts/variables',
            '../../src/styles/abstracts/mixins';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    background-color: color(other, gray);
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

  .datepicker-label {
    margin-left: $gutter*2;

    .datepicker-range & {
      margin-left: 0;
    }
  }

  .datepicker-range {
    display: flex;
    flex-direction: column;

    @include mq(tablet) {
      flex-direction: row;
    }

    .datepicker-range__row {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: $gutter 0;
    }
  }

  .datepicker-container {
    margin: 0 $gutter*2;

    .example-inline & {
      margin: $gutter*2 0;
    }

    .example-range & {
      margin: 0 0 0$gutter*2;
    }
  }

  .title {
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  h2 {
    font-size: 2.5rem;
    line-height: 1;
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

    &:before {
      content: "";
      position: absolute;
      top: calc(100% - #{$gutter});
      left: -#{$gutter};
      background-color: transparentize(color(other, aqua-marine), .7);
      height: $gutter;
      width: calc(100% + #{$gutter*2});
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

  .select-box {
    position: relative;

    select {
      background-color: white;
      padding: 4px;
      width: 100px;
      border: none;
      font-size: 20px;
      -webkit-appearance: button;
      appearance: button;
      outline: none;
      border: 1px solid color(other, light-gray);
      text-align-last: center;

      option {
        padding: $gutter*2;
      }
    }
  }
</style>
