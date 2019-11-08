<template>
  <!-- eslint-disable max-len -->
  <!-- eslint-disable vue/valid-v-for -->
  <div id="app">
    <div class="header">
      <h1>
        Vue DatePicker
        <a
          class="link"
          href="https://github.com/mathieustan/vue-datepicker/"
          target="_blank">
          <svg
            width="32"
            height="32"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="github"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
          >
            <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" class=""></path>
          </svg>
        </a>
      </h1>

      <div class="actions">
        <VueDatePicker
          v-model="currentDate"
          color="#9f4fff"
          fullscreen-mobile
        >
          <template #activator="{ date }">
            <button
              class="custom__button"
              ref="activator"
              type="button"
            >
              {{ date }}
            </button>
          </template>
        </VueDatePicker>
      </div>
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
        <CodeWrapper type="bash" :source="installSources.install" />

        <p> 2. Load component in your project </p>
        <CodeWrapper type="javascript" :source="installSources.use" />

        Or
        <CodeWrapper type="javascript" :source="installSources.import" />

        <p> 3. Use the component </p>
        <CodeWrapper type="HTML" :source="installSources.template" />

        <div class="title">
          <h2> Examples (props) </h2>
        </div>

        <!---------------------------------------------------------->
        <!-- EXAMPLES -->
        <!---------------------------------------------------------->
        <Wrapper
          v-for="story in formattedStories"
          :key="story.id"
          background-color="white"
          class="column justify-start align-center"
        >
          <template v-slot:description>
            <h3>
              {{ story.title }}
              <span v-if="story.on" style="color: red">{{ message }}</span>
              <!-- Only for visible story -->
              <input
                v-if="story.id === 'visible'"
                type="checkbox"
                id="isVisible"
                name="isVisible"
                v-model="stories[story.id].props.visible.value">
            </h3>
            <p><small> {{ story.description }} </small></p>
          </template>

          <template v-if="story.id === 'color' || story.id === 'localeSelect'" v-slot:inputs>
            <!-- Only for COLOR story -->
            <div v-if="story.id === 'color'" class="select-box">
              <label for="lang-select"> Choose a color: </label>
              <select id="lang-select" v-model="stories[story.id].props.color.value">
                <option
                  v-for="(color, index) in stories[story.id].colorList"
                  :key="index"
                  :value="color.hex">
                  {{ color.name }}
                </option>
              </select>
            </div>

            <!-- Only for LOCALE story -->
            <div v-if="story.id === 'localeSelect'" class="select-box">
              <label for="lang-select"> Choose a lang: </label>
              <select id="lang-select" v-model="stories[story.id].props.locale.value.lang">
                <option
                  v-for="(lang, index) in stories[story.id].langsList"
                  :key="index">
                  {{ lang }}
                </option>
              </select>
            </div>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="stories[story.id].date"
              v-bind="story.bind"
              v-on="story.on"
            />
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML" :source="story.templateString" />
          </template>

          <template v-slot:result>
            v-model="{{ stories[story.id].date }}"
          </template>
        </Wrapper>

        <!---------------------------------------------------------->
        <!-- Custom activator -->
        <!---------------------------------------------------------->
        <Wrapper
          v-for="story in formattedCustomStories"
          :key="story.id"
          background-color="white"
          class="column justify-start align-center"
        >
          <template v-slot:description>
            <h3> {{ story.title }} </h3>
            <p><small> {{ story.description }} </small></p>
          </template>

          <template v-slot:example>
            <VueDatePicker
              v-model="customStories[story.id].date"
              v-bind="story.bind"
            >
              <template #activator="{ date }">
                <button
                  class="custom__button"
                  ref="activator"
                  type="button"
                >
                  {{ date }}
                </button>
              </template>
            </VueDatePicker>
          </template>

          <template v-slot:code>
            <CodeWrapper type="HTML" :source="story.templateString" />
          </template>

          <template v-slot:result>
            v-model="{{ customStories[story.id].date }}"
          </template>
        </Wrapper>
      </div>
    </div>
  </div>
</template>

<script>
// components
import Wrapper from '@/components/Wrapper.vue';
import CodeWrapper from '@/components/CodeWrapper.vue';

// utils
import { prepareSettingsForStory } from '@/utils';

export default {
  name: 'App',
  components: { Wrapper, CodeWrapper },
  data: () => ({
    installSources: {
      install: 'npm install @mathieustan/vue-datepicker --save',
      use:
`import VueDatePicker from '@mathieustan/vue-datepicker';
Vue.use(VueDatePicker);

// Options: You can set lang by default
Vue.use(VueDatePicker, {
  lang: 'fr'
});`,
      import:
`import { VueDatePicker } from '@mathieustan/vue-datepicker';

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
    stories: {
      default: {
        title: 'Default',
        description: 'Default usage without any props',
        date: new Date(),
      },
      validate: {
        title: 'Props: Validate',
        description: 'Need to validate to change date (Add buttons)',
        date: new Date(),
        props: {
          buttonValidate: {
            type: String,
            value: 'Ok',
          },
          buttonCancel: {
            type: String,
            value: 'Cancel',
          },
          validate: {
            type: Boolean,
            value: true,
          },
        },
      },
      format: {
        title: 'Props: Format',
        description: 'Allow to format input date',
        date: new Date(),
        props: {
          format: {
            type: String,
            value: 'YYYY-MM-DD',
          },
        },
      },
      formatHeader: {
        title: 'Props: FormatHeader',
        description: 'Allow to format header date',
        date: new Date(),
        props: {
          formatHeader: {
            type: String,
            value: 'DD MMMM',
          },
        },
      },
      placeholder: {
        title: 'Props: Placeholder',
        description: 'Allow to set placeholder for input',
        date: undefined,
        props: {
          placeholder: {
            type: String,
            value: 'Choix de la date',
          },
        },
      },
      visible: {
        title: 'Props: Visible',
        description: 'Used to trigger datepicker visibility',
        date: new Date(),
        props: {
          visible: {
            type: Boolean,
            value: false,
          },
        },
      },
      disabled: {
        title: 'Props: Disabled',
        description: 'Set datepicker disabled',
        date: new Date(),
        props: {
          disabled: {
            type: Boolean,
            value: true,
          },
        },
      },
      color: {
        title: 'Props: Color',
        description: 'Allow to set datepicker color',
        date: new Date(),
        colorList: [
          { name: 'orange', hex: '#f8a623' },
          { name: 'red', hex: '#ff4577' },
          { name: 'purple', hex: '#9f4fff' },
          { name: 'blue', hex: '#4f88ff' },
          { name: 'green', hex: '#23edad' },
        ],
        props: {
          color: {
            type: Object,
            value: '#ff4577',
          },
        },
      },
      noHeader: {
        title: 'Props: NoHeader',
        description: 'Boolean to hide datepicker header',
        date: new Date(),
        props: {
          noHeader: {
            type: Boolean,
            value: true,
          },
        },
      },
      noInput: {
        title: 'Props: NoInput',
        description: 'Hide input to show a button instead (better when width needs to be dynamic)',
        date: new Date(),
        props: {
          noInput: {
            type: Boolean,
            value: true,
          },
        },
      },
      noCalendarIcon: {
        title: 'Props: NoCalendarIcon',
        description: 'Hide to hide calendar icon',
        date: new Date(),
        props: {
          noCalendarIcon: {
            type: Boolean,
            value: true,
          },
        },
      },
      fullscreenMobile: {
        title: 'Props: FullscreenMobile',
        description: 'Datepicker will appear in a bottom sheet when screen width is less than 480px',
        date: new Date(),
        props: {
          fullscreenMobile: {
            type: Boolean,
            value: true,
          },
        },
      },
      minMaxDate: {
        title: 'Props: MinDate & MaxDate',
        description: 'Specify min & max date for datepicker',
        date: new Date(),
        props: {
          minDate: {
            type: String,
            value: '2012-02-12',
          },
          maxDate: {
            type: String,
            value: '2019-05-05',
          },
        },
      },
      visibleYearsNumber: {
        title: 'Props: visibleYearsNumber',
        description: 'Allows to set years range in year picker (it will add X years before & after current year)',
        date: new Date(),
        props: {
          visibleYearsNumber: {
            type: Number,
            value: 50,
          },
        },
      },
      locale: {
        title: 'Props: Locale',
        description: `Allows to set lang & custom WeekDays ({ lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] })`,
        date: new Date(),
        props: {
          locale: {
            type: String,
            value: { lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] },
          },
        },
      },
      localeSelect: {
        title: 'Props: Locale (Selectable lang)',
        description: 'Translations',
        date: new Date(),
        langsList: {
          fr: 'fr',
          en: 'en',
          es: 'es',
          de: 'de',
          he: 'he',
          ru: 'ru',
          custom: {
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
            buttonCancel: 'Annulla',
            buttonValidate: 'Ok',
            rangeHeaderText: 'Dalle %d Alle 13',
          },
        },
        props: {
          locale: {
            type: Object,
            value: { lang: 'fr' },
          },
        },
      },
      inline: {
        title: 'Props: Inline',
        description: 'Allow you to show datepicker inline (without input)',
        date: new Date(),
        props: {
          inline: {
            type: Boolean,
            value: true,
          },
        },
      },
      month: {
        title: 'Props: Type (Month)',
        description: 'Month datepicker',
        date: new Date(),
        props: {
          inline: {
            type: Boolean,
            value: true,
          },
          minDate: {
            type: String,
            value: '2018-3',
          },
          maxDate: {
            type: String,
            value: '2019-3',
          },
          type: {
            type: String,
            value: 'month',
          },
        },
      },
      quarter: {
        title: 'Props: Type (Quarter)',
        description: 'Quarter datepicker',
        date: new Date(),
        props: {
          inline: {
            type: Boolean,
            value: true,
          },
          minDate: {
            type: String,
            value: '2018-3',
          },
          maxDate: {
            type: String,
            value: '2019-3',
          },
          type: {
            type: String,
            value: 'quarter',
          },
        },
      },
      range: {
        title: 'Props: Range',
        description: 'Enable/disable Date range (actually only available for date)',
        date: { start: null, end: null },
        props: {
          range: {
            type: Boolean,
            value: true,
          },
          rangeHeaderText: {
            type: String,
            value: 'Du %d au %d',
          },
          rangeInputText: {
            type: String,
            value: 'Du %d au %d',
          },
          minDate: {
            type: String,
            value: '2018-1',
          },
          maxDate: {
            type: String,
            value: '2019-10',
          },
          inline: {
            type: Boolean,
            value: false,
          },
          placeholder: {
            type: String,
            value: 'Début - Fin',
          },
          noHeader: {
            type: Boolean,
            value: false,
          },
          fullscreenMobile: {
            type: Boolean,
            value: true,
          },
          validate: {
            type: Boolean,
            value: true,
          },
        },
      },
      rangePresets: {
        title: 'Props: Range (with presets)',
        description: 'Allow to add custom range presets to range datepicker. (Max custom presets = 6)',
        date: undefined,
        props: {
          range: {
            type: Boolean,
            value: true,
          },
          rangePresets: {
            type: Array,
            value: [{
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
          minDate: {
            type: String,
            value: '2018-1',
          },
          maxDate: {
            type: String,
            value: '2019-10',
          },
          placeholder: {
            type: String,
            value: 'Début - Fin',
          },
          noHeader: {
            type: Boolean,
            value: false,
          },
          fullscreenMobile: {
            type: Boolean,
            value: true,
          },
          validate: {
            type: Boolean,
            value: true,
          },
        },
      },
      rangeRtl: {
        title: 'Props: Range with RTL mode',
        description: 'Using range picker in RTL mode',
        date: undefined,
        props: {
          range: {
            type: Boolean,
            value: true,
          },
          minDate: {
            type: String,
            value: '2018-1',
          },
          maxDate: {
            type: String,
            value: '2019-10',
          },
          placeholder: {
            type: String,
            value: 'Début - Fin',
          },
          noHeader: {
            type: Boolean,
            value: true,
          },
          fullscreenMobile: {
            type: Boolean,
            value: true,
          },
          validate: {
            type: Boolean,
            value: true,
          },
          rtl: {
            type: Boolean,
            value: true,
          },
        },
      },
      onOpen: {
        title: 'Events: onOpen',
        description: 'Event emitted when datepicker is opened',
        date: new Date(),
        events: {
          onOpen: {
            data: `'datepicker opened'`,
            method: 'showTimeoutMessage',
          },
        },
      },
      onClose: {
        title: 'Events: onClose',
        description: 'Event emitted when datepicker is closed',
        date: new Date(),
        messageToShow: 'datepicker closed',
        events: {
          onClose: {
            data: `'datepicker closed'`,
            method: 'showTimeoutMessage',
          },
        },
      },
      onChange: {
        title: 'Events: onChange',
        description: 'Event emitted when date changed',
        date: new Date(),
        events: {
          onChange: {
            data: `'date changed'`,
            method: 'showTimeoutMessage',
          },
        },
      },
      onDestroy: {
        title: 'Events: onDestroy',
        description: 'Event emitted when datepicker is destroyed',
        date: new Date(),
        events: {
          onDestroy: {
            data: `'datepicker destroyed'`,
            method: 'showTimeoutMessage',
          },
        },
      },
    },
    customStories: {
      activator: {
        title: 'Custom activator',
        description: 'Possible to use a custom activator slot to trigger datepicker ',
        date: new Date(),
      },
    },
    currentDate: new Date(),
    message: '',
    timeoutId: undefined,
  }),
  computed: {
    formattedStories () {
      return Object.entries(this.stories).reduce((newStories, [key, story]) => {
        const settings = prepareSettingsForStory(story);
        let on = {};
        if (story.events) {
          const eventKey = Object.keys(story.events)[0];
          const eventValues = Object.values(story.events)[0];
          on = { [eventKey]: () => this.showTimeoutMessage(eventValues.data) };
        }
        return [
          ...newStories, {
            id: key,
            title: story.title,
            description: story.description,
            templateString: `<VueDatePicker v-model="date" ${settings.formattedAttrs}${settings.formattedEvents}/>`,
            on,
            bind: settings.formattedBinds,
          },
        ];
      }, []);
    },
    formattedCustomStories () {
      return Object.entries(this.customStories).reduce((newStories, [key, story]) => {
        const settings = prepareSettingsForStory(story);
        return [
          ...newStories, {
            id: key,
            title: story.title,
            description: story.description,
            templateString:
`<VueDatePicker v-model="date" ${settings.formattedAttrs}${settings.formattedEvents}
>
  <!-- another notation: <template v-slot:activator="{ date }"> -->
  <!-- older notation: <template slot="activator" slot-scope="{ date }"> -->
  <!-- 2.6 notation -->
  <template #activator="{ date }">
    <button
      class="custom__button"
      ref="activator"
      type="button"
    >
      {{ date }}
    </button>
  </template>
</VueDatePicker>`,
            bind: settings.formattedBinds,
          },
        ];
      }, []);
    },
  },
  methods: {
    showTimeoutMessage (message, key, timeout = 1000) {
      this.message = message;

      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.message = '';
      }, timeout);
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
      display: flex;
      align-items: center;
      font-size: 1.25em;

      @include mq(tablet) {
        font-size: 2em;
      }
    }
  }

  .content {
    max-width: 1000px;
    margin: 0 auto;
    font-size: 20px;
    font-size: 1.25rem;
    line-height: 1.62;
    color: #3b454e;

    &-inner {
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

  button.custom__button {
    @include reset-button();
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    border-radius: 6px;
    padding: $gutter;
    height: auto;
    font-size: 14px;
    font-weight: 500;
    color: white;
    background-color: color(other, dark-purple);
    outline: 0;
    text-decoration: none;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
    user-select: none;

    &:hover {
      background-color: transparentize(color(other, dark-purple), .3);
    }

    & + button {
      margin-left: $gutter*2;
    }

    &[disabled] {
      opacity: .6;
      pointer-events: none;;
    }
  }

  .link {
    display: flex;
    align-items: center;
    color: white;
    margin-left: 8px;
  }

</style>
