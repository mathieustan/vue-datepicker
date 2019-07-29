# vue-datepicker

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/22e0f8947502421bb85192ef11d7c2f9)](https://www.codacy.com/app/mathieustan/vue-datepicker?utm_source=github.com&utm_medium=referral&utm_content=mathieustan/vue-datepicker&utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/22e0f8947502421bb85192ef11d7c2f9)](https://www.codacy.com/app/mathieustan/vue-datepicker?utm_source=github.com&utm_medium=referral&utm_content=mathieustan/vue-datepicker&utm_campaign=Badge_Coverage)

> A datepicker Vue component. Compatible with Vue 2.x

-   [Demo](#demo)
-   [Install](#install)
-   [Usage](#usage)
-   [Props](#available-props)
-   [Events](#events)
-   [Date Formatting](#date-formatting)
-   [Translations](#translations)

## Demo

To view a demo online: <https://vue-datepicker.netlify.com/>

## Install

```bash
npm install @mathieustan/vue-datepicker --save
```

or

```bash
yarn add @mathieustan/vue-datepicker
```

```javascript
import { VueDatePicker } from '@mathieustan/vue-datepicker';

export default {
  // ...
  components: {
    VueDatePicker
  }
  // ...
}
```

or

```javascript
import VueDatePicker from '@mathieustan/vue-datepicker';

Vue.use(VueDatePicker);
```

## Usage

```html
<VueDatePicker v-model="currentDate" />
```

_value_ prop if passed should be a Date object

```html
<template>
    <VueDatePicker :value="date"></VueDatePicker>
</template>
```

```javascript
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

```html
<VueDatePicker :value="state.date" name="uniquename"></VueDatePicker>
```

Using `v-model`

```html
<VueDatePicker v-model="state.date" name="uniquename"></VueDatePicker>
```

## Available props

| Prop             | Type                 | Default          | Description                                                                                                                                         |
| ---------------- | -------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| id               | String               | 'datepicker'     | Input id                                                                                                                                            |
| value            | Date\|String\|Number |                  | Date value of the datepicker                                                                                                                        |
| name             | String               | 'datepicker'     | Input name property & datepicker title in fullscreenMobile                                                                                          |
| validate         | Boolean              | false            | Show validations button to select date                                                                                                              |
| buttonValidate   | String               | 'Ok'             | Text for validation button                                                                                                                          |
| buttonCancel     | String               | 'Cancel'         | Text for cancel button                                                                                                                              |
| format           | String               | DD MMMM YYYY     | Date formatting for input                                                                                                                           |
| formatHeader     | String               | dddd DD MMM      | Allows you to customize the format of the month string that appears in the header of the calendar.                                                  |
| formatOutput     | String               | YYYY-MM-DD       | Allows you to customize the format of date when selected                                                                                            |
| placeholder      | String               | 'YYYY-MM-DD'     | Allow you to change input placeholder                                                                                                               |
| visible          | Boolean              | false            | Allow you to trigger datepicker                                                                                                                     |
| disabled         | Boolean              | false            | Datepicker disabled or not                                                                                                                          |
| color            | String               | #4f88ff          | Applies specified color                                                                                                                             |
| noHeader         | Boolean              |                  | Allow to hide header                                                                                                                                |
| fullscreenMobile | Boolean              | false            | Datepicker will appear in a bottom sheet in mobile view                                                                                             |
| minDate          | String\|Number\|Date |                  | Date are available FROM this date                                                                                                                   |
| endDate          | String\|Number\|Date |                  | Date are disabled AFTER this date                                                                                                                   |
| locale           | Object               | {lang: 'en'}     | More informations here [Translations](#translations)                                                                                                |
| inline           | Boolean              | false            | Inline datepicker                                                                                                                                   |
| type             | String               | 'date'           | Determines the type of the picker - date/month/quarter                                                                                              |
| range            | Boolean              | false            | Enable/disable Date range (actually only available for date )                                                                                       |
| rangeInputText   | String               | '%d ~ %d'        | When range is enabled, Allow to customize date text in input                                                                                        |
| rangeHeaderText  | String               | 'From %d To %d ' | When range is enabled, set text before date in datepicker header                                                                                    |
| rangePresets     | Array                |                  | Allow to add custom range presets to range datepicker. (Max custom presets = 6) Example: `[{ name: 'This year', dates: { start: ..., end: ... } }]` |
| tabindex         | String\|Number       | '0'              | Specify input tabindex                                                                                                                              |
| zIndex           | Number               |                  | Specify a z-index to datepicker & overlay                                                                                                           |
| attachTo         | String               | '#app'           | It will mount datepicker popup into this element as a child                                                                                         |

## Events

| Event     | Output | Description          |
| --------- | ------ | -------------------- |
| onOpen    |        | datepicker opened    |
| onClose   |        | datepicker closed    |
| onChange  |        | datepicker changed   |
| onDestroy |        | datepicker destroyed |

## Date Formatting

You can use this with `format` props.

Example :

```html
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
Actually, there are some locale inside project ('en', 'fr, 'es', 'de');

exemple:

```html
<template>
    <VueDatePicker :value="date" :locale="locale"></VueDatePicker>
</template>
```

```javascript
<script>
export default {
  // ...
  components: {
    VueDatePicker
  },
  data: () => ({
      date: new Date([2019, 5, 16]),
      locale: {
        lang: 'fr' // or 'en', 'es', 'de',
        weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], // you can surcharge weekDays too
      },
  }),,
  // ...
}
</script>
```

** NEW !! Now, you can use your own language object 😃**
You should have those properties to make it works :
'name', 'weekdays', 'weekdaysShort', 'weekdaysMin', 'weekStart', 'months', 'monthsShort', 'ordinal', 'formats',

If you need exemples, you can go to this link to find language :
 \-> [locales](https://github.com/iamkun/dayjs/tree/dev/src/locale)

exemple :

```html
<template>
    <VueDatePicker :value="date" :locale="locale"></VueDatePicker>
</template>
```

```javascript
<script>
export default {
  // ...
  components: {
    VueDatePicker
  },
  data: () => ({
      date: new Date([2019, 5, 16]),
      locale: {
        lang: {
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
        }
      },
  }),,
  // ...
}
</script>
```
