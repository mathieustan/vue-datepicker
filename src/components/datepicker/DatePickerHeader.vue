<template>
  <div
    :style="setBackgroundColor(color)"
    :class="classes"
    class="datepicker-header">

    <div
      v-if="!range"
      :class="{ 'datepicker-header__year--active' : mode === 'year' }"
      class="datepicker-header__year">
      <span @click="$emit('showYearMonthSelector', 'year')">
        {{ year }}
      </span>
    </div>

    <div v-if="!range" class="datepicker-header__wrap">
      <TransitionGroup
        tag="div"
        :name="transitionName"
        :class="{ 'datepicker-header__date--active' : mode !== 'year' }"
        class="datepicker-header__date">
        <span
          v-for="dateFormatted in [dateFormatted]"
          :key="dateFormatted"
          @click="$emit('hideYearMonthSelector')"
        >
          {{ dateFormatted }}
        </span>
      </TransitionGroup>
    </div>

    <div v-else class="datepicker-header__wrap">
      <TransitionGroup
        tag="div"
        :name="transitionName"
        :class="{ 'datepicker-header__date--active' : mutableDate.start }"
        class="datepicker-header__date">
        <span
          v-for="dateFormatted in [dateFormatted[0]]"
          :key="dateFormatted">
          {{ dateFormatted }}
        </span>
      </TransitionGroup>
      <TransitionGroup
        tag="div"
        :name="transitionName"
        :class="{ 'datepicker-header__date--active' : mutableDate.end }"
        class="datepicker-header__date">
        <span
          v-for="dateFormatted in [dateFormatted[1]]"
          :key="dateFormatted">
          {{ dateFormatted }}
        </span>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
// mixins
import colorable from '../../mixins/colorable';

// functions
import { formatDateWithLocale, getRangeDatesFormatted } from '../../utils/Dates';

export default {
  name: 'DatePickerHeader',
  mixins: [colorable],
  props: {
    mutableDate: { type: [String, Object] },
    transitionName: { type: String },
    color: { type: String },
    locale: { type: Object },
    formatHeader: { type: String },
    mode: { type: String },
    range: { type: Boolean },
    rangeHeaderText: { type: String },
  },
  computed: {
    classes () {
      return {
        'datepicker-header--range': this.range,
      };
    },
    year () {
      if (!this.mutableDate) return '-';
      return formatDateWithLocale(this.mutableDate, this.locale, 'YYYY');
    },
    dateFormatted () {
      if (this.range && this.rangeHeaderText) {
        const [startText, endText] = this.rangeHeaderText.split('%d');
        const [startDate, endDate] = getRangeDatesFormatted(this.mutableDate, this.locale, this.formatHeader).split(' ~ ');
        return [`${startText.trim()} ${startDate}`, `${endText.trim()} ${endDate}`.trim()];
      }
      if (!this.mutableDate) return '--';
      return formatDateWithLocale(this.mutableDate, this.locale, this.formatHeader);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/functions',
            '../../styles/abstracts/variables',
            '../../styles/abstracts/mixins',
            '../../styles/base/_animations.scss';

  .datepicker-header {
    color: white;
    padding: ($gutter*2);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    line-height: 1;
    min-height: get-size(mobile, header);
    max-height: get-size(mobile, header);
    border-radius: get-border-radius(2) get-border-radius(2) 0 0;

    @include mq(tablet) {
      min-height: get-size(desktop, header);
      max-height: get-size(desktop, header);
    }

    &--range {
      .datepicker-header__wrap {
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: space-between;
      }
      .datepicker-header__date {
        font-size: 18px;
        height: calc(18px + #{$gutter});

        @include mq(tablet) {
          font-size: 22px;
          height: calc(22px + #{$gutter});
        }
      }
    }

    &__year {
      align-items: center;
      display: inline-flex;
      font-size: 14px;
      margin-bottom: $gutter;
      opacity: 0.6;
      transition: opacity .3s;

      &:hover:not(&--active),
      &:focus:not(&--active) {
        cursor: pointer;
        opacity: 1;
      }

      &--active {
        opacity: 1;
        cursor: default;
      }
    }

    &__wrap {
      position: relative;
      display: flex;
      width: 100%;
    }

    &__date {
      position: relative;
      display: flex;
      width: 100%;
      font-size: 22px;
      height: calc(22px + #{$gutter});
      text-align: left;
      overflow: hidden;
      padding-bottom: $gutter;
      margin-bottom: -#{$gutter};
      opacity: 0.6;
      transition: opacity .3s;

      &:hover:not(&--active),
      &:focus:not(&--active) {
        cursor: pointer;
        opacity: 1;
      }

      &--active {
        opacity: 1;
        cursor: default;
      }

      @include mq(tablet) {
        font-size: 28px;
        height: calc(28px + #{$gutter});
      }
    }
  }
</style>
