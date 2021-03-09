import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import localable from '@/mixins/localable';

import { en } from '@/locale';

describe('localable', () => {
  let mountComponent;
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [localable],
    template: '<div class="localable"></div>',
  });

  beforeEach(() => {
    mountComponent = ({
      propsData,
      mocks = { $vuedatepicker: { lang: 'en' } },
    } = {}) => shallowMount(EmptyComponent, {
      propsData,
      mocks,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.locale).toEqual({ lang: undefined });
    expect(wrapper.vm.currentLocale).toEqual({ lang: en });
  });

  describe('methods', () => {
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
          const wrapper = mountComponent({ mocks: { $vuedatepicker } });
          Object.defineProperty(global, 'navigator', { value: navigator, writable: true });
          expect(wrapper.vm.getDefaultLang()).toEqual(expectedLang);
        });
      });
    });
  });
});
