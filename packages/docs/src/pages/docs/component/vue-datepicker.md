---
title: "VueDatePicker"
description: "The **VueDatePicker** is a fully featured date selection component that lets users select a date, or range of dates.."
---

<v-divider class="my-6" />

## Usage

Date pickers usage

<Playground filename="playground" />

<v-divider class="my-6" />

## Props

### Format

You can format date output by using `format` prop. It should be a string like : 'YYYY-MM-DD'

<ExampleWithSource
  filename="prop-format"
/>

<v-divider class="my-6" />

### Format Header

You can format date header by using `format-header` prop. It should be a string like : 'dddd, DD MMMM'

<ExampleWithSource
  filename="prop-format-header"
/>

<v-divider class="my-6" />

### Fullscreen mobile

By using `fullscreen-mobile` prop, datepicker will appear in a bottom sheet when screen width is less than breakpoint md

<ExampleWithSource
  filename="prop-fullscreen"
/>

<v-divider class="my-6" />

### Allowed dates

You can specify allowed dates using arrays, objects, and functions.

<ExampleWithSource
  filename="prop-allowed-dates"
/>

<v-divider class="my-6" />

### Min & Max dates

You can specify a `min-date` and `max-date` date for datepicker.

<ExampleWithSource
  filename="prop-min-max"
/>

<v-divider class="my-6" />

### Locale

Allows to set lang & custom WeekDays ({ lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] })

<ExampleWithSource
  filename="prop-locale"
/>

Here you can try different locale availables on framework

<ExampleWithSource
  filename="prop-locale-select"
/>

<v-divider class="my-6" />

### Month Picker

You can change datepicker `type` if you need to use it as a month picker

<ExampleWithSource
  filename="prop-type-month"
/>

<v-divider class="my-6" />

### Quarter Picker

You can change datepicker `type` if you need to use it as a quarter picker

<ExampleWithSource
  filename="prop-type-quarter"
/>

<v-divider class="my-6" />

### Year Picker

You can change datepicker `type` if you need to use it as a year picker

<ExampleWithSource
  filename="prop-type-year"
/>

<v-divider class="my-6" />

### Range Picker

You can set `range` for datepicker. You'll be able to select a date range

<ExampleWithSource
  filename="prop-range"
/>

You can also sets some presets with `range-presets`

<ExampleWithSource
  filename="prop-range-presets"
/>

<v-divider class="my-6" />

## Slots

### Activator

Allows to use a custom activator to trigger datepicker.

<ExampleWithSource
  filename="slot-activator"
/>

<v-divider class="my-6" />

### Day

Allows to change day appaearance, but you can also use tooltip or anything else if needed. Try to keep cursor on a day.

<ExampleWithSource
  filename="slot-day"
/>

<v-divider class="my-6" />

### Input Icon

Allows to change ipunt icon appearance

<ExampleWithSource
  filename="slot-input-icon"
/>

<v-divider class="my-6" />

## Misc

### Birthday

Starting with year picker by default, restricting dates range and closing the picker menu after selecting the day make the perfect birthday picker.

<ExampleWithSource
  filename="misc-birthday"
/>

<v-divider class="my-6" />

