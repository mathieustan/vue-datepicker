<template>
  <form action="" role="search">
    <v-sheet outlined class="rounded-lg d-flex pa-2">
      <div class="d-flex align-center flex-grow-1">
        <v-icon left size="18">fal fa-search</v-icon>
        <p class="ma-0 text-medium"> Search the docs </p>
      </div>
      <span class="hidden sm:block text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 rounded-md bg-blue-400 bg-opacity-10" style="opacity: 1;">
        <span class="sr-only">Press </span>
        <kbd class="font-sans">
          <abbr title="Command" class="no-underline">{{ actionKeys[0] }}</abbr>
        </kbd>
        <span class="sr-only"> and </span>
        <kbd class="font-sans">K</kbd>
        <span class="sr-only"> to search</span>
      </span>
    </v-sheet>
  </form>
</template>

<script>
const ACTION_KEY_DEFAULT = ['Ctrl ', 'Control'];
const ACTION_KEY_APPLE = ['⌘', 'Command'];
const isApple = typeof window !== 'undefined' && window && 'navigator' in window && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

export default {
  name: 'AlgoliaSearchBox',
  props: {
    options: { type: Object, default: () => ({}) },
  },
  data: () => ({
    actionKeys: isApple ? ACTION_KEY_APPLE : ACTION_KEY_DEFAULT,
  }),
  watch: {
    $lang (newValue) {
      this.update(this.options, newValue)
    },

    options (newValue) {
      this.update(newValue, this.$lang)
    }
  },
  mounted () {
    this.initialize(this.options, this.$lang)
  },
  methods: {
    initialize (userOptions, lang) {
      Promise.all([
        import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'),
        import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css')
      ]).then(([docsearch]) => {
        docsearch = docsearch.default
        const { algoliaOptions = {}} = userOptions
        docsearch(Object.assign(
          {},
          userOptions,
          {
            inputSelector: '#algolia-search-input',
            // #697 Make docsearch work well at i18n mode.
            algoliaOptions: {
              ...algoliaOptions,
              facetFilters: [`lang:${lang}`].concat(algoliaOptions.facetFilters || [])
            },
            handleSelected: (input, event, suggestion) => {
              const { pathname, hash } = new URL(suggestion.url)
              const routepath = pathname.replace(this.$site.base, '/')
              const _hash = decodeURIComponent(hash)
              this.$router.push(`${routepath}${_hash}`)
            }
          }
        ))
      })
    },
    update (options, lang) {
      this.$el.innerHTML = '<input id="algolia-search-input" class="search-query">'
      this.initialize(options, lang)
    }
  }
};
</script>
