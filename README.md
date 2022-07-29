⚠️ No longer maintained. 
Sorry everyone, as you see I couldn't maintain this project properly. Feel free to use it/copy it to improve this datepicker.


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
-   [Best Practices](#best-practices)

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
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

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
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';

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

| Prop               | Type                 | Default          | Description                                                                                                                                                                                                                        |
| ------------------ | -------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                 | String               | 'datepicker'     | Sets the input id                                                                                                                                                                                                                  |
| value              | Date\|String\|Number |                  | Date picker model (ISO 8601 format, YY-mm-dd or YY-mm)                                                                                                                                                                             |
| name               | String               | 'datepicker'     | Input name property & datepicker title in fullscreenMobile                                                                                                                                                                         |
| clearable          | Boolean              | false            | Add input clear functionality                                                                                                                                                                                                      |
| validate           | Boolean              | false            | Shows validations button to select date                                                                                                                                                                                            |
| buttonValidate     | String               | 'Ok'             | Sets validate text button                                                                                                                                                                                                          |
| buttonCancel       | String               | 'Cancel'         | Sets cancel text button                                                                                                                                                                                                            |
| format             | String               | DD MMMM YYYY     | Allows you to customize input date format                                                                                                                                                                                          |
| formatHeader       | String               | dddd DD MMM      | Allows you to customize header date format                                                                                                                                                                                         |
| placeholder        | String               | 'YYYY-MM-DD'     | Sets the input’s placeholder text                                                                                                                                                                                                  |
| visible            | Boolean              | false            | Allows you to trigger datepicker visibility                                                                                                                                                                                        |
| disabled           | Boolean              | false            | Sets datepicker disabled                                                                                                                                                                                                           |
| color              | String               | #4f88ff          | Allows you to customize color                                                                                                                                                                                                      |
| contentClass       | String               | ''               | Applies custom class to datepicker content                                                                                                                                                                                         |
| noHeader           | Boolean              |                  | Hides datepicker header                                                                                                                                                                                                            |
| noInput            | Boolean              |                  | Hides datepicker input. It'll show a button instead                                                                                                                                                                               |
| noCalendarIcon     | Boolean              |                  | Hides datepicker icon                                                                                                                                                                                                              |
| fullscreenMobile   | Boolean              | false            | Shows datepicker in a bottom sheet when in mobile view                                                                                                                                                                             |
| allowedDates       | Function             |                  | Function which validate allowed date (allowedDates: (date) => .... // date is a javascript date)                                                                                                                                   |
| minDate            | String\|Number\|Date |                  | Dates are availables after this date                                                                                                                                                                                               |
| maxDate            | String\|Number\|Date |                  | Dates are disabled after this date                                                                                                                                                                                                 |
| visibleYearsNumber | Number               | 10               | Allows to set years range in year picker (it will add X years before & after current year)                                                                                                                                         |
| locale             | Object               | {lang: 'en'}     | Allows to change language. More informations here [Translations](#translations)                                                                                                                                                    |
| inline             | Boolean              | false            | Shows an inline datepicker                                                                                                                                                                                                         |
| attach             | String\|DOM Element  | false            | Specifies which DOM element that this component should detach to.String can be any valid querySelector and Object can be any valid Node. This will attach to the root body component by default. [Best Practices](#best-practices) |
| type               | String               | 'date'           | Determines the type of the picker - date/month/quarter                                                                                                                                                                             |
| range              | Boolean              | false            | Sets range mode active (currently, only available for date)                                                                                                                                                                        |
| rangeInputText     | String               | '%d ~ %d'        | Sets input text format                                                                                                                                                                                                             |
| rangeHeaderText    | String               | 'From %d To %d ' | Sets header text format                                                                                                                                                                                                            |
| rangePresets       | Array                |                  | Allows to add custom range presets to range datepicker. (Max custom presets = 6) Example: `[{ name: 'This year', dates: { start: ..., end: ... } }]`                                                                               |
| tabindex           | String\|Number       | '0'              | Specify input tabindex                                                                                                                                                                                                             |
| origin             | String               |                  | Allows to set origin (otherwise, it will be generated from position)                                                                                                                                                               |
| rtl                | Boolean              | false            | Allow to use datepicker with rtl mode                                                                                                                                                                                              |
| zIndex             | Number               |                  | Specify a z-index to datepicker & overlay                                                                                                                                                                                          |

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

:rocket: **Now, you can use your own language object**

Below, an exemple for `it` language :
You should have those properties to make it works :

```javascript
'name', 'weekdays', 'weekdaysShort', 'weekdaysMin', 'weekStart', 'months', 'monthsShort', 'ordinal', 'formats', 'buttonCancel', 'buttonValidate', 'rangeHeaderText'
```

```html
<template>
    <VueDatePicker :value="date" :locale="locale"></VueDatePicker>
</template>
```

```javascript
<script>
const locale = {
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
    buttonCancel: 'Annulla',
    buttonValidate: 'Ok',
    rangeHeaderText: 'Dalle %d Alle 13',
  },
};

export default {
  // ...
  components: {
    VueDatePicker
  },
  data: () => ({
    date: new Date([2019, 5, 16]),
    locale,
  }),
  // ...
};
</script>
```

If you need more exemples, you can go to this link to find your language :
 \-> [locales](https://github.com/iamkun/dayjs/tree/dev/src/locale)

## Best Practices

When should you use `attach` prop :

### Attach

is great when you have a fixed element in your page like a panel, a dialog or a fixed fullscreen container.
The datepicker position will not take care of scroll page position and it'll be `absolutely positioned` into your fixed container. (if you scroll, datepicker popup will scroll too).
