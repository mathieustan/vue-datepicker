<template>
  <!-- eslint-disable max-len -->
  <!-- eslint-disable vue/valid-v-for -->
  <div id="app">
    <div class="header">
      <h1>Vue DatePicker</h1>

      <div class="actions">
        <VueDatePicker
          v-model="currentDate"
          color="#9f4fff"
          no-input
          fullscreen-mobile
        >
          <template #activator="{ date }">
            <button
              class="custom-button"
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
Vue.use(VueDatePicker);`,
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
        date: undefined,
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

  .custom-button {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
    font-stretch: normal;
    letter-spacing: .23px;
    font-size: 15px;
    line-height: 19px;
    font-weight: 500;
    min-height: 48px;
    height: 48px;
    border: none;
    border-radius: 6px;
    padding: 0 24px;
    cursor: pointer;
  }
</style>
