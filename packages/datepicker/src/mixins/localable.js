import Vue from 'vue';

import * as locales from '../locale';
import { DEFAULT_LOCALE_PROPERTIES } from '../constants';

export default Vue.extend({
  name: 'Localable',

  props: {
    locale: { type: Object, default: () => ({ lang: undefined }) },
  },

  computed: {
    currentLocale () {
      const { lang } = this.locale;
      return { ...this.locale, lang: this.getLocale(lang) };
    },
  },
  methods: {
    getDefaultLang () {
      return (
        (this.$vuedatepicker && this.$vuedatepicker.lang) ||
        window.navigator.userLanguage ||
        window.navigator.language ||
        'en'
      ).substr(0, 2);
    },
    isValidLocale (lang = {}) {
      const properties = Object.keys(lang);
      return properties.length > 0 &&
        properties.every(property => DEFAULT_LOCALE_PROPERTIES.includes(property));
    },
    getLocale (lang) {
      return this.isValidLocale(lang) ? lang : locales[lang] || this.getLocale(this.getDefaultLang());
    },
  },
});
