<template>
  <div
    :style="{ backgroundColor: color }"
    :class="classes"
    class="datepicker-header">

    <div
      v-if="!range"
      :class="{ 'datepicker-header__year--active' : mode === 'year' }"
      class="datepicker-header__year">
      {{ year }}
    </div>

    <div v-if="!range" class="datepicker-header__wrap">
      <TransitionGroup
        tag="div"
        :name="transitionName"
        :class="{ 'datepicker-header__date--active' : mode !== 'year' }"
        class="datepicker-header__date">
        <span
          v-for="dateFormatted in [dateFormatted]"
          :key="dateFormatted">
          {{ dateFormatted }}
        </span>
      </TransitionGroup>
    </div>

    <div v-else class="datepicker-header__wrap">
      <div class="datepicker-header__icon">
        <!-- eslint-disable max-len -->
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="arrows-v"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192 512">
          <path fill="currentColor" d="M181.415 399.959c-4.686-4.686-12.284-4.686-16.971 0L113 451.887V60.113l51.444 51.928c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-84-84.485c-4.686-4.686-12.284-4.686-16.971 0L3.515 88c-4.686 4.686-4.686 12.284 0 16.97l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L79 60.113v391.773l-51.444-51.928c-4.686-4.686-12.284-4.686-16.971 0l-7.07 7.071c-4.686 4.686-4.686 12.284 0 16.97l84 84.485c4.686 4.687 12.284 4.687 16.971 0l84-84.485c4.686-4.686 4.686-12.284 0-16.97l-7.071-7.07z" class=""></path>
        </svg>
        <!-- eslint-enable max-len -->
      </div>

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
import { formatDateWithLocale, getRangeDatesFormatted } from '../../utils/Dates';

export default {
  name: 'DatePickerHeader',
  props: {
    mutableDate: { type: [String, Object] },
    transitionName: { type: String },
    color: { type: String },
    locale: { type: Object },
    formatHeader: { type: String },
    mode: { type: String },
    range: { type: Boolean },
  },
  computed: {
    classes () {
      return {
        'datepicker-header--range': this.range,
      };
    },
    year () {
      return formatDateWithLocale(this.mutableDate, this.locale, 'YYYY');
    },
    dateFormatted () {
      if (this.range) {
        return getRangeDatesFormatted(this.mutableDate, this.locale, this.formatHeader).split(' ~ ');
      }
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
        padding-left: ($gutter*3);
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
      font-weight: get-font-weight(medium);
      margin-bottom: 8px;
      opacity: 0.6;
      transition: opacity .3s;

      &.datepicker-header__year--active {
        opacity: 1;
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
      font-weight: get-font-weight(medium);
      overflow: hidden;
      padding-bottom: $gutter;
      margin-bottom: -#{$gutter};
      opacity: 0.6;
      transition: opacity .3s;

      &:hover,
      &.datepicker-header__date--active {
        opacity: 1;
      }

      @include mq(tablet) {
        font-size: 28px;
        height: calc(28px + #{$gutter});
      }
    }

    &__icon {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 32px;

      svg {
        position: relative;
        width: auto;
        height: 100%;
      }
    }
  }
</style>
