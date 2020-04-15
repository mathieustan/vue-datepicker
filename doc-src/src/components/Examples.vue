<template>
  <div class="examples">
    <div class="examples__title">
      <h2> Examples (props) </h2>
    </div>

    <div class="examples__wrapper">
      <Wrapper
        :id="key"
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
</template>

<script>
import Wrapper from './Wrapper.vue';

export default {
  name: 'Examples',
  components: { Wrapper },
  data: () => ({
    examples: {
      // -- default props
      default: {
        title: '# Default',
        description: 'Default usage without any props',
        filename: 'default',
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
      noInput: {
        title: '# Props: NoInput',
        description: 'Hide input to show a button instead (better when width needs to be dynamic)',
        filename: 'noInput',
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
};
</script>

<style lang="scss" scoped>
  @import '../styles/abstracts/_index.scss';

  .examples {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;

    &__title {
      position: relative;
      display: flex;
      justify-content: flex-start;

      h2 {
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

    &__wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      flex: 1 0 auto;
    }

    &__block {
      & + & {
        margin-top: $gutter*2;

        @include mq('md') {
          margin-top: $gutter*3;
        }
      }
    }
  }
</style>
