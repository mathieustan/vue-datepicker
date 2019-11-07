import Vue from 'vue';

import {
  getDefaultLang,
} from '@/utils/lang';

describe('Utils: Lang', () => {
  describe('getDefaultLang', () => {
    [{
      description: 'return lang defined in $vuedatepicker',
      $vuedatepicker: { lang: 'fr' },
      navigator: { userLanguage: 'french', language: 'french' },
      expectedLang: 'fr',
    }, {
      description: 'return lang in navigator if not defined in $vuedatepicker',
      $vuedatepicker: undefined,
      navigator: { userLanguage: 'french', language: 'french' },
      expectedLang: 'fr',
    }, {
      description: 'return lang in navigator language',
      $vuedatepicker: undefined,
      navigator: { userLanguage: undefined, language: 'russian' },
      expectedLang: 'ru',
    }, {
      description: 'return default lang en if nothing is defined',
      $vuedatepicker: undefined,
      navigator: { userLanguage: undefined, language: undefined },
      expectedLang: 'en',
    }].forEach(({ description, $vuedatepicker, navigator, expectedLang }) => {
      it(`should ${description}`, () => {
        Vue.prototype.$vuedatepicker = $vuedatepicker;
        Object.defineProperty(global, 'navigator', { value: navigator, writable: true });
        expect(getDefaultLang()).toEqual(expectedLang);
      });
    });
  });
});
