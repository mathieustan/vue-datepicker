const path = require('path');

module.exports = {
  extend: '@vuepress/theme-default',
  chainWebpack: (config) => {
    config.resolveLoader
      .modules
      .add(path.resolve(__dirname, './node_modules'));
  },
};
