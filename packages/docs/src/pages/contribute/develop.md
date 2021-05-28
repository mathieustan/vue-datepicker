---
title: "Development guide"
---

There are 2 packages inside **VueDatePicker** :

- **docs** - our documentation made with Vuepress
- **datepicker** - main source code for datepicker lib

<v-divider class="my-4" />

## Develop for datepicker

The **datepicker** library is located in **packages/datepicker**.

Let's start by starting datepicker in dev mode. Running `yarn dev datepicker` from the project root will start a dev server on **localhost:8083**.

```bash
yarn dev datepicker
```

### Test your code and changes

You can test your changes in the `Playground` component located in **packages/datepicker/dev/Playground.vue** then copy its contents into your pull request when you’re ready.

For example :

```diff-html
// packages/datepicker/dev/Playground.vue -> template
  <h1> Welcome to playground </h1>
-  <VueDatePicker :date="date" />
+  <VueDatePicker :date="date" type="range">
```

```diff-javascript
// packages/datepicker/dev/Playground.vue -> script
export default {
  data: () => ({
-    date: new Date(),
+    date: undefined,
  }),
};
```

### Test changes inside docs

If you want to test changes inside vuepress doc, you'll need to build datepicker. Vuepress will automatically detect changes and reload.
Just run :

```bash
yarn build datepicker
```

<v-divider class="my-4" />

## Develop for Docs

The **docs** library is located in **packages/docs**.

Running `yarn dev docs` from the project root will start a dev server on **localhost:8080**.
`--no-cache` allows to disable cache when running vuepress.

```bash
yarn dev docs --no-cache
```
