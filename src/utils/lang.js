import Vue from 'vue';

import * as locales from '../locale';
import { DEFAULT_LOCALE_PROPERTIES } from '../constants';

export {
  getDefaultLang,
  getLocale,
};

function getDefaultLang () {
  return (
    (Vue.prototype.$vuedatepicker && Vue.prototype.$vuedatepicker.lang) ||
    window.navigator.userLanguage ||
    window.navigator.language ||
    'en'
  ).substr(0, 2);
}

function isValidLocale (lang = {}) {
  const properties = Object.keys(lang);
  return properties.length > 0 &&
    properties.every(property => DEFAULT_LOCALE_PROPERTIES.includes(property));
}

function getLocale (lang) {
  return isValidLocale(lang) ? lang : locales[lang] || getLocale(getDefaultLang());
}
