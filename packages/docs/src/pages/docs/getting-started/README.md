# Installation
Learn how to get **VueDatePicker** up and running in your project.

## Install via npm

You'll want to install VueDatePicker and its peer-dependencies via npm ( or yarn)

```bash
npm install @mathieustan/vue-datepicker --save
```

## Add plugin to your project

Create a new file `vue-datepicker.js` and copy this code :

```javascript
// file : vue-datepicker.js
import VueDatePicker from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";

Vue.use(VueDatePicker);
```

Now, lets import this new file into our `main.js`.

```javascript{7}
// file : main.js
import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'path/to/vue-datepicker.js';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```

## Set lang option

When initializing **VueDatePicker**, you can use lang option :

```javascript{6}
// file : vue-datepicker.js
import VueDatePicker from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";

Vue.use(VueDatePicker, {
  lang: 'fr'
});
```




