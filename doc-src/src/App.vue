<template>
  <!-- eslint-disable max-len -->
  <!-- eslint-disable vue/valid-v-for -->
  <div id="app">
    <div class="header">
      <h1>Vue DatePicker</h1>
      <VueDatePicker
        v-model="currentDate"
        color="#9f4fff"
        no-input
        fullscreen-mobile
        fixed
        :z-index="1000"
      />
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
        <CodeWrapper type="bash">
<span class="token function">npm install </span>@mathieustan/vue-datepicker --save</CodeWrapper>

        <p> 2. Load component in your project </p>
        <CodeWrapper type="javascript">
<span class="token keyword">import</span> VueDatePicker <span class="token keyword">from</span><span class="token string"> '@mathieustan/vue-datepicker'</span>;

<span class="token keyword">Vue</span><span class="token function">.use(</span>VueDatePicker<span class="token function">)</span>;
</CodeWrapper>

        Or

      <CodeWrapper type="javascript">
<span class="token keyword">import</span> { VueDatePicker } <span class="token keyword">from</span><span class="token string"> '@mathieustan/vue-datepicker'</span>;

<span class="token keyword">export default </span> {
  <span class="token function">components</span> : {
    VueDatePicker,
  <span>},</span>
}
</CodeWrapper>

        <p> 3. Use the component </p>
        <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker <span class="token attr-name">v-model</span>="date" <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
</CodeWrapper>

        <div class="title">
          <h2> Examples (props) </h2>
        </div>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Default -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Default </h3>
            <p><small> Default use of datepicker </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" />
          </template>

          <template v-slot:code>
            <CodeWrapper type="javascript">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker <span class="token attr-name">v-model</span>="date" <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Validate -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Validate </h3>
            <p><small> Need to validate to change date (Add buttons) </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" validate />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">validate</span>
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Format -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Format </h3>
            <p><small> Allow to format input date </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" format="YYYY-MM-DD" />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">format</span>="YYYY-MM-DD"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Format Header  -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> FormatHeader </h3>
            <p><small> Allow to format header date </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" format-header="dddd DD MMMM" />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">format-header</span>="dddd DD MMMM"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Format Output  -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> FormatOutput </h3>
            <p><small> Allow to format output when date has been selected </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" format-output="YYYY/MM/DD" />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">format-output</span>="YYYY/MM/DD"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Placeholder  -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Placeholder </h3>
            <p><small> Allow to set placeholder for input </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="examples.placeholder.currentDate"
              placeholder="DD/MM/YYYY"
            />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">placeholder</span>="DD/MM/YYYY"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ examples.placeholder.currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Visible -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3>
              Visible
              <input type="checkbox" id="isVisible" name="isVisible" v-model="examples.visible.isVisible">
            </h3>
            <p><small> Used to trigger datepicker visibility </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" :visible="examples.visible.isVisible" />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:visible</span>="{{ examples.visible.isVisible }}"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Disabled -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Disabled </h3>
            <p><small> Set datepicker disabled </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" :disabled="true" />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:disabled</span>="true"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Color -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Color </h3>
            <p><small> Allow to set datepicker color </small></p>
          </template>

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

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" :color="examples.color.selected" />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">color</span>="{{ examples.color.selected }}"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : NoHeader -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> NoHeader </h3>
            <p><small> Boolean to hide datepicker header </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" no-header />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">no-header</span>
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : NoInput -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> NoInput </h3>
            <p><small> Allow to use a button instead of an input (better width management) </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" no-input />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">no-header</span>
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : FullscreenMobile -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> FullscreenMobile </h3>
            <p><small> Datepicker will appear in a bottom sheet when screen width is less than 480px </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" fullscreen-mobile no-header />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">no-header </span>
    <span class="token attr-name">fullscreen-mobile </span>
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : MinDate -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> minDate & endDate </h3>
            <p><small> Specify min & end date for datepicker </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="currentDate"
              :min-date="examples.allowedDates.min"
              :end-date="examples.allowedDates.max"
            />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">min-date</span>="{{ examples.allowedDates.min }}"
    <span class="token attr-name">end-date</span>="{{ examples.allowedDates.max }}"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Locale -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Locale (lang & weekDays) </h3>
            <p><small> Translations </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="currentDate"
              :locale="{
                lang: 'fr',
                weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
              }" />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:locale</span>="{ lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] }"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Locale with lang selectable -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Locale (selectable lang available in package) </h3>
            <p><small> Translations (actually, only 'en', 'fr', 'es' & 'de' available in package) </small></p>
          </template>

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

          <template v-slot:example>
            <VueDatePicker
              v-model="currentDate"
              :locale="{ lang: examples.locale.selectedLang }" />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:locale</span>="{ lang: {{ examples.locale.selectedLang }} }"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Locale with custom lang -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Locale (with custom lang object) </h3>
            <p><small> You can use a custom lang object </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="currentDate"
              :locale="{ lang: examples.locale.customLang }" />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">:locale</span>="{ lang: {{ examples.locale.customLang }} }"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Fixed -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Fixed </h3>
            <p><small> Set datepicker to fixed position </small></p>
          </template>

          <template v-slot:example>
            <p>See datepicker in page header ☝️</p>
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="{{currentDate}}"
    <span class="token attr-name">:color</span>="#9f4fff"
    <span class="token attr-name">:z-index</span>="1000"
    <span class="token attr-name">fullscreen-mobile </span>
    <span class="token attr-name">fixed </span>
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Rtl -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Rtl </h3>
            <p><small> Allow Right-to-Left mode </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" rtl />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="{{currentDate}}"
    <span class="token attr-name">rtl </span>
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Inline -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Inline </h3>
            <p><small> Allow you to show datepicker inline (without input) </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker v-model="currentDate" inline />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="{{currentDate}}"
    <span class="token attr-name">inline</span>
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Type: Month -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Type = 'month' </h3>
            <p><small> A month datepicker </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="examples.month.currentDate"
              type="month"
              :min-date="examples.month.min"
              :end-date="examples.month.end"
              inline />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="{{ examples.month.currentDate }}"
    <span class="token attr-name">:min-date</span>="{{ examples.month.min }}"
    <span class="token attr-name">:end-date</span>="{{ examples.month.end }}"
    <span class="token attr-name">type</span>="month"
    <span class="token attr-name">:inline</span>="true"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ examples.month.currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Type: Quarter -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Type = 'quarter' </h3>
            <p><small> A quarter datepicker </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="examples.quarter.currentDate"
              type="quarter"
              :min-date="examples.quarter.min"
              :end-date="examples.quarter.end"
              inline
            />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="{{ examples.quarter.currentDate }}"
    <span class="token attr-name">:min-date</span>="{{ examples.quarter.min }}"
    <span class="token attr-name">:end-date</span>="{{ examples.quarter.end }}"
    <span class="token attr-name">type</span>="quarter"
    <span class="token attr-name">:inline</span>="true"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ examples.quarter.currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Range Picker -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Range </h3>
            <p><small> Enable/disable Date range (actually only available for date) </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="examples.range.dates"
              :name="`Choose dates`"
              :min-date="examples.range.min"
              :end-date="examples.range.end"
              range
              no-header
              placeholder="Start - End"
              fullscreen-mobile
            />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="rangeDates"
    <span class="token attr-name">:name</span>="`Choose dates`"
    <span class="token attr-name">:min-date</span>="{{ examples.range.min }}"
    <span class="token attr-name">:end-date</span>="{{ examples.range.end }}"
    <span class="token attr-name">placeholder</span>="Start - End"
    <span class="token attr-name">range </span>
    <span class="token attr-name">no-header </span>
    <span class="token attr-name">fullscreen-mobile </span>
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ examples.range.dates }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Range Picker with PRESETS -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Range (with rangePresets) </h3>
            <p>
              <small>
                Allow to add custom range presets to range datepicker.
                (Max custom presets = 6)
              </small>
            </p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="examples.range.dates"
              :name="`Choose dates`"
              :min-date="examples.range.min"
              :end-date="examples.range.end"
              :range-presets="examples.range.presets"
              :range-input-text="examples.range.inputText"
              placeholder="Start - End"
              validate
              range
              no-header
              fullscreen-mobile
            />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="rangeDates"
    <span class="token attr-name">:name</span>="`Choose dates`"
    <span class="token attr-name">:min-date</span>="{{ examples.range.min }}"
    <span class="token attr-name">:end-date</span>="{{ examples.range.end }}"
    <span class="token attr-name">:range-presets</span>="{{ examples.range.presets }}"
    <span class="token attr-name">:range-input-text</span>="{{ examples.range.inputText }}"
    <span class="token attr-name">placeholder</span>="Start - End"
    <span class="token attr-name">validate </span>
    <span class="token attr-name">range </span>
    <span class="token attr-name">no-header </span>
    <span class="token attr-name">fullscreen-mobile </span>
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ examples.range.dates }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : Range Picker with RTL -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> Range with rtl mode </h3>
            <p>
              <small>
                Using range picker in RTL mode
              </small>
            </p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="examples.range.dates"
              :name="`Choose dates`"
              :min-date="examples.range.min"
              :end-date="examples.range.end"
              :range-input-text="examples.range.inputText"
              placeholder="Start - End"
              validate
              range
              no-header
              rtl
              fullscreen-mobile
            />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="rangeDates"
    <span class="token attr-name">:name</span>="`Choose dates`"
    <span class="token attr-name">:min-date</span>="{{ examples.range.min }}"
    <span class="token attr-name">:end-date</span>="{{ examples.range.end }}"
    <span class="token attr-name">:range-input-text</span>="{{ examples.range.inputText }}"
    <span class="token attr-name">placeholder</span>="Start - End"
    <span class="token attr-name">validate </span>
    <span class="token attr-name">range </span>
    <span class="token attr-name">no-header </span>
    <span class="token attr-name">rtl </span>
    <span class="token attr-name">fullscreen-mobile </span>
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ examples.range.dates }}"
          </template>
        </Wrapper>

        <div class="title">
          <h2> Events </h2>
        </div>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : onOpen -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> onOpen <span style="color: red">{{ examples.onOpen.message }}</span> </h3>
            <p><small> Event emitted when datepicker is opened </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="currentDate"
              @onOpen="showTimeoutMessage('datepicker opened', 'onOpen')"
            />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">@onOpen</span>="examples.onOpen.message = 'datepicker opened'"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : onClose -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> onClose <span style="color: red">{{ examples.onClose.message }}</span> </h3>
            <p><small> Event emitted when datepicker is closed </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="currentDate"
              @onClose="showTimeoutMessage('datepicker closed', 'onClose')"
            />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">@onClose</span>="examples.onClose.message = 'datepicker closed'"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- EXAMPLE : onChange -->
        <!---------------------------------------------------------->
        <Wrapper background-color="white" class="column justify-start align-center">
          <template v-slot:description>
            <h3> onChange <span style="color: red">{{ examples.onChange.message }}</span> </h3>
            <p><small> Event emitted when date changed </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="currentDate"
              @onChange="showTimeoutMessage('date changed', 'onChange')"
            />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML">
<span class="token operator">&lt;</span>template<span class="token operator">></span>
  ...
  <span class="token operator">&lt;</span>VueDatePicker
    <span class="token attr-name">v-model</span>="date"
    <span class="token attr-name">@onChange</span>="examples.onChange.message = 'date changed'"
  <span class="token operator">/></span>
  ...
<span class="token operator">&lt;/</span>template<span class="token operator">></span>
  </CodeWrapper>
          </template>

          <template v-slot:result>
            v-model="{{ currentDate }}"
          </template>
        </Wrapper>

      </div>
    </div>
  </div>
</template>

<script>
import Wrapper from './components/Wrapper.vue';
import CodeWrapper from './components/CodeWrapper.vue';

export default {
  name: 'App',
  components: { Wrapper, CodeWrapper },
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
        min: '2018-08-12',
        end: '2019-05-12',
      },
      allowedDates: {
        min: '2019-5-3',
        max: '2019-8-12',
      },
      locale: {
        selectedLang: 'de',
        langs: ['es', 'en', 'fr', 'de'],
        customLang: {
          name: 'it',
          weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
          weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
          weekStart: 1,
          months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
          monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
          formats: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
          },
          ordinal: n => `${n}º`,
        },
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
        dates: undefined,
        min: '2018-02-12',
        end: '2019-08-12',
        inputText: 'From %d to %d',
        presets: [{
          name: 'This year',
          dates: {
            start: new Date(new Date().getFullYear(), 0, 1),
            end: new Date(new Date().getFullYear(), 11, 31),
          },
        }, {
          name: 'Last year',
          dates: {
            start: new Date(new Date().getFullYear() - 1, 0, 1),
            end: new Date(new Date().getFullYear() - 1, 11, 31),
          },
        }, {
          name: 'Next year',
          dates: {
            start: new Date(new Date().getFullYear() + 1, 0, 1),
            end: new Date(new Date().getFullYear() + 1, 11, 31),
          },
        }, {
          name: 'Last month',
          dates: {
            start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
            end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
          },
        }, {
          name: 'This month',
          dates: {
            start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
          },
        }],
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
    font-family: 'Roboto', sans-serif;
  }
</style>

<style lang="scss" scoped>
  @import   './styles/abstracts/functions',
            './styles/abstracts/variables',
            './styles/abstracts/mixins';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    background-color: color(other, gray);
  }

  .header {
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    width: 100%;
    background-color: color(other, blue);
    color: #fff;
    padding: $gutter*2;
    z-index: 999;

    @include mq(tablet) {
      height: 100px;
    }

    h1 {
      font-size: 1.5em;

      @include mq(tablet) {
        font-size: 2em;
      }
    }

    .datepicker-container {
      background-color: white;
      padding: 8px 12px;
      border-radius: 4px;
    }
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
