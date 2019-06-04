# vue-datepicker

[![codecov](https://codecov.io/gh/mathieustan/vue-datepicker/branch/master/graph/badge.svg?token=gWRibMQnfD)](https://codecov.io/gh/mathieustan/vue-datepicker)

> A datepicker Vue component. Compatible with Vue 2.x

- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Props](#available-props)
- [Events](#events)
- [Date Formatting](#date-formatting)
- [Translations](#translations)

## Demo

To view a demo online: comming soon

## Install

``` bash
npm install vuejs-datepicker --save
```
or
``` bash
yarn add vuejs-datepicker
```

``` javascript
import { VueDatePicker } from 'vue-datepicker';
import 'vue-datepicker/dist/vue-datepicker.css';

export default {
  // ...
  components: {
    VueDatePicker
  }
  // ...
}
```

## Usage

``` html
<VueDatePicker v-model="currentDate" />
```

*value* prop if passed should be a Date object

``` html
<template>
    <VueDatePicker :value="date"></VueDatePicker>
</template>
```
``` javascript
<script>
export default {
  // ...
  components: {
    VueDatePicker
  },
  data: () => ({
      date: new Date([2019, 5, 16]),
  }),,
  // ...
}
</script>
```
support name attribute for normal html form submission
``` html
<VueDatePicker :value="state.date" name="uniquename"></VueDatePicker>
```
Using `v-model`
``` html
<VueDatePicker v-model="state.date" name="uniquename"></VueDatePicker>
```

## Available props

| Prop                          | Type            | Default     | Description                              |
|-------------------------------|-----------------|-------------|------------------------------------------|
| id                            | String          | 'datepicker'| Input id                                 |
| value                         | Date\|String\|Number |             | Date value of the datepicker        |
| name                          | String          | 'datepicker'| Input name property                      |
| type                          | String         | 'date'        | Determines the type of the picker - date/month/quarter                 |
| format                        | String          | DD MMMM YYYY| Date formatting for input                |
| formatHeader                  | String          | dddd DD MMM | Allows you to customize the format of the month string that appears in the header of the calendar.    |
| formatOutput                  | String          | YYYY-MM-DD  | Allows you to customize the format of date when selected    |
| locale                        | Object          |{lang: 'en'} | More informations here [Translations](#translations)        |
| visible                       | Boolean         | false        | See below for configuration              |
| placeholder                   | String          | 'YYYY-MM-DD' | Allows you to change input placeholder  |
| color                         | String          | #4f88ff      | Applies specified color                  |
| minDate                       | String\|Number\|Date |         | Date are available FROM this date       |
| endDate                       | String\|Number\|Date |         | Date are disabled AFTER this date       |
| disabled                      | Boolean        | false         | Datepicker disabled or not              |
| inline                        | Boolean        | false         | Inline datepicker                       |
| fullscreenMobile              | Boolean        | false         | Datepicker will appear in a bottom sheet in mobile view     |

## Events

| Event                         | Output          | Description                                            |
|-------------------------------|-----------------|--------------------------------------------------------|
| onOpen                        |                 | datepicker opened                                      |
| onClose                       |                 | datepicker closed                                      |
| onChange                      |                 | datepicker changed                                     |
| onDestroy                     |                 | datepicker destroyed                                   |

## Date Formatting

You can use this with `format` props.

Example :
``` html
<VueDatePicker v-model="currentDate" format="YYYY-MM-DD" />
```

| Format | Output           | Description                       |
| ------ | ---------------- | --------------------------------- |
| `YY`   | 18               | Two-digit year                    |
| `YYYY` | 2018             | Four-digit year                   |
| `M`    | 1-12             | Month, beginning at 1             |
| `MM`   | 01-12            | Month, 2-digits                   |
| `MMM`  | Jan-Dec          | The abbreviated month name        |
| `MMMM` | January-December | The full month name               |
| `D`    | 1-31             | Day of month                      |
| `DD`   | 01-31            | Day of month, 2-digits            |
| `H`    | 0-23             | Hours                             |
| `HH`   | 00-23            | Hours, 2-digits                   |
| `h`    | 1-12             | Hours, 12-hour clock              |
| `hh`   | 01-12            | Hours, 12-hour clock, 2-digits    |
| `m`    | 0-59             | Minutes                           |
| `mm`   | 00-59            | Minutes, 2-digits                 |
| `s`    | 0-59             | Seconds                           |
| `ss`   | 00-59            | Seconds, 2-digits                 |
| `S`    | 0-9              | Hundreds of milliseconds, 1-digit |
| `SS`   | 00-99            | Tens of milliseconds, 2-digits    |
| `SSS`  | 000-999          | Milliseconds, 3-digits            |
| `Z`    | -5:00            | Offset from UTC                   |
| `ZZ`   | -0500            | Compact offset from UTC, 2-digits |
| `A`    | AM PM            | Post or ante meridiem, upper-case |
| `a`    | am pm            | Post or ante meridiem, lower-case |
| `Do`   | 1st... 31st      | Day of Month with ordinal         |

## Translations

By default, locale will be set from your navigator language.
But it's possible to set it from `locale` props.
Here is a list of supported language from dayjs. (https://github.com/iamkun/dayjs/tree/dev/src/locale)

exemple:
``` html
<template>
    <VueDatePicker :value="date" :locale="locale"></VueDatePicker>
</template>
```
``` javascript
<script>
export default {
  // ...
  components: {
    VueDatePicker
  },
  data: () => ({
      date: new Date([2019, 5, 16]),
      locale: {
        lang: 'fr',
        weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], // you can surcharge weekDays too
      },
  }),,
  // ...
}
</script>
```

