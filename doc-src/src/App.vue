<template>
  <!-- eslint-disable max-len -->
  <!-- eslint-disable vue/valid-v-for -->
  <div id="app" v-scroll="onScroll">
    <Header />

    <Navigation ref="navigation" :examples="examples" />

    <div class="content">
      <div class="content-inner">
        <section id="section__about">
          <div class="title">
            <h2> About </h2>
          </div>
          <p>
            A responsive date picker for Vue.js, made with love,
            with nice transition and clean design.
          </p>
        </section>

        <section id="section__install">
          <div class="title">
            <h2> Install </h2>
          </div>
          <p> 1. Install component with npm </p>
          <CodeWrapper type="bash" :source="installSources.install" />

          <p> 2. Load component in your project </p>
          <CodeWrapper type="javascript" :source="installSources.use" />

          Or
          <CodeWrapper type="javascript" :source="installSources.import" />

          <p> 3. Use the component </p>
          <CodeWrapper type="HTML" :source="installSources.template" />
        </section>

        <section id="section__api">
          <div class="content-title">
            <h2> Api </h2>
          </div>

          <ApiComponent :apis="['VueDatePicker']" />
        </section>

        <!---------------------------------------------------------->
        <!-- EXAMPLES -->
        <!---------------------------------------------------------->
        <div class="content-title">
          <h2> Examples (props) </h2>
        </div>

        <Wrapper
          :id="`section__${key}`"
          v-for="[key, example] in Object.entries(examples)"
          :key="key"
          :filename="example.filename"
          class="examples_block"
        >
          <template v-slot:description>
            <h3> {{ example.title }}</h3>
            <p><small>{{ example.description }}</small></p>
          </template>
        </Wrapper>
      </div>
    </div>
  </div>
</template>

<script>
// Directives
import scroll from './directives/scroll';

// Components
import ApiComponent from '@/components/ApiComponent.vue';
import CodeWrapper from '@/components/CodeWrapper.vue';
import Header from '@/components/Header.vue';
import Navigation from '@/components/Navigation.vue';
import Wrapper from '@/components/Wrapper.vue';

import './styles/main.scss';

export default {
  name: 'App',
  directives: { scroll },
  components: {
    ApiComponent,
    CodeWrapper,
    Header,
    Navigation,
    Wrapper,
  },
  data: () => ({
    mainNavLinks: [],
    installSources: {
      install: 'npm install @mathieustan/vue-datepicker --save',
      use:
`import VueDatePicker from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

Vue.use(VueDatePicker);

// Options: You can set lang by default
Vue.use(VueDatePicker, {
  lang: 'fr'
});`,
      import:
`import { VueDatePicker } from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

export default  {
  components : {
    VueDatePicker,
  },
};
`,
      template:
`<template>
  ...
  <VueDatePicker v-model="date" />
  ...
</template>
`,
    },
    examples: {
      default: {
        title: '# Default',
        description: 'Default usage without any props',
        filename: 'default',
      },
      allowedDates: {
        title: '# Props: AllowedDates',
        description: 'Function which validate allowed date',
        filename: 'allowedDates',
      },
      validate: {
        title: '# Props: Validate',
        description: 'Need to validate to change date (Add buttons)',
        filename: 'validate',
      },
      clearable: {
        title: '# Props: Clearable',
        description: 'Adds input clear functionality',
        filename: 'clearable',
      },
      format: {
        title: '# Props: Format',
        description: 'Allow to format input date',
        filename: 'format',
      },
      formatHeader: {
        title: '# Props: FormatHeader',
        description: 'Allow to format header date',
        filename: 'formatHeader',
      },
      placeholder: {
        title: '# Props: Placeholder',
        description: 'Allow to set placeholder for input',
        filename: 'placeholder',
      },
      visible: {
        title: '# Props: Visible',
        description: 'Used to trigger datepicker visibility',
        filename: 'visible',
      },
      disabled: {
        title: '# Props: Disabled',
        description: 'Set datepicker disabled',
        filename: 'disabled',
      },
      color: {
        title: '# Props: Color',
        description: 'Allow to set datepicker color',
        filename: 'color',
      },
      noHeader: {
        title: '# Props: NoHeader',
        description: 'Boolean to hide datepicker header',
        filename: 'noHeader',
      },
      noCalendarIcon: {
        title: '# Props: NoCalendarIcon',
        description: 'Hide to hide calendar icon',
        filename: 'noCalendarIcon',
      },
      fullscreenMobile: {
        title: '# Props: FullscreenMobile',
        description: `Datepicker will appear in a bottom \
        sheet when screen width is less than 480px`,
        filename: 'fullscreenMobile',
      },
      minMaxDate: {
        title: '# Props: MinDate & MaxDate',
        description: 'Specify min & max date for datepicker',
        filename: 'minMaxDate',
      },
      visibleYearsNumber: {
        title: '# Props: visibleYearsNumber',
        description: `Allows to set years range in year picker \
        (it will add X years before & after current year)`,
        filename: 'visibleYearsNumber',
      },
      locale: {
        title: '# Props: Locale',
        description: `Allows to set lang & custom WeekDays \
        ({ lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] })`,
        filename: 'locale',
      },
      localeSelect: {
        title: '# Props: Locale (Selectable lang)',
        description: `Translations. Important, you should always pass a \
        property lang in locale property. :locale="{ lang: selectedLang }"`,
        filename: 'localeSelect',
      },
      inline: {
        title: '# Props: Inline',
        description: 'Allow you to show datepicker inline (without input)',
        filename: 'inline',
      },
      // -- Type
      month: {
        title: '# Props: Type (Month)',
        description: 'Month datepicker',
        filename: 'month',
      },
      quarter: {
        title: '# Props: Type (Quarter)',
        description: 'Quarter datepicker',
        filename: 'quarter',
      },
      year: {
        title: '# Props: Type (Year)',
        description: 'Year datepicker',
        filename: 'year',
      },
      // -- Range
      range: {
        title: '# Props: Range',
        description: 'Enable/disable Date range (actually only available for date)',
        filename: 'range',
      },
      rangePresets: {
        title: '# Props: Range (with presets)',
        description: `Allow to add custom range presets \
        to range datepicker. (Max custom presets = 6)`,
        filename: 'rangePresets',
      },
      rangeRtl: {
        title: '# Props: Range with RTL mode',
        description: 'Using range picker in RTL mode',
        filename: 'rangeRtl',
      },
      // -- Slots
      daySlot: {
        title: '# Custom day slot',
        description: `Allows to change day appaearance,
          but you can also use tooltip or anything else if needed.
          Try to keep cursor on a day`,
        filename: 'daySlot',
      },
      slotInputIcon: {
        title: '# Custom input-icon slot',
        description: `Allows to change icon appaearance`,
        filename: 'slot-input-icon',
      },
      // -- Misc
      birthdayPicker: {
        title: 'Birthday picker',
        description: `Starting with year picker by default, restricting
                      dates range and closing the picker menu after selecting
                      the day make the perfect birthday picker.`,
        filename: 'birthday',
      },
      // -- Events
      events: {
        title: '# Events',
        description: 'Events available',
        filename: 'events',
      },
      activator: {
        title: '# Custom activator',
        description: 'Possible to use a custom activator slot to trigger datepicker ',
        filename: 'activator',
      },
    },
  }),
  mounted () {
    this.$nextTick(() => {
      const navigation = this.$refs.navigation.$el;
      this.mainNavLinks = navigation.querySelectorAll('li > a');
    });
  },
  methods: {
    onScroll () {
      let fromTop = window.scrollY + 100;

      this.mainNavLinks.forEach(link => {
        let section = document.body.querySelector(link.hash);

        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add('current');
        } else {
          link.classList.remove('current');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './styles/abstracts/_index.scss';

  #app {
    flex: 1 1 auto;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
    position: relative;
  }

  .content {
    display: flex;
    flex: 1 1 auto;
    padding: 0;
    font-size: 1em;
    line-height: 1.62;
    color: #3b454e;

    @include mq('md') {
      font-size: 1.125em;
      padding: 0 0 0 180px;
    }

    &-inner {
      position: relative;
      margin: 0 auto;
      max-width: 1200px;
      width: 100%;
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 12px;
    }

    &-title {
      position: relative;
      display: flex;
      justify-content: flex-start;

      h2 {
        display: flex;
        font-size: 2.5rem;
        line-height: 1;
        color: #121212;
        position: relative;
        margin-top: $gutter*6;
        font-size: 1.875rem;

        @include mq('md') {
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
    }
  }
</style>
