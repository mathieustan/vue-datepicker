require('dotenv').config();

const webpack = require('webpack');
const path = require('path');

const { description } = require('../../package');

module.exports = {
  dest: './dist',
  title: 'Vue-datepicker doc',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#4f88ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css',
      integrity: 'sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p',
      crossorigin: 'anonymous',
    }],
  ],
  themeConfig: {
    editLinks: false,
    docsDir: '',
    lastUpdated: false,
    navbar: false,
    smoothScroll: true,
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
    },
    sidebarDepth: 0,
    sidebar: {
      '/pages/docs/': [
        {
          title: 'Getting Started',
          collapsable: false,
          children: [
            ['/pages/docs/getting-started/', 'Installation'],
          ],
        },
        {
          title: 'Component',
          collapsable: false,
          children: [
            ['/pages/docs/component/vue-datepicker', 'VueDatePicker'],
          ],
        },
      ],
      '/pages/contribute/': [
        {
          title: 'Getting Started',
          collapsable: false,
          children: [
            ['/pages/contribute/setting-up', 'Setting up env'],
            ['/pages/contribute/develop', 'Development guide'],
            ['/pages/contribute/commit', 'Commit guide'],
          ],
        },
      ],
    },
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],
  postcss: {
    plugins: [
      require('autoprefixer'),
    ],
  },
  configureWebpack: (/* config */) => {
    return {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../../src'),
          '~vuepress': path.resolve(__dirname, '../../src/.vuepress'),
        },
      },
      plugins: [
        new webpack.EnvironmentPlugin({
          ...process.env,
        }),
      ],
    };
  },
};
