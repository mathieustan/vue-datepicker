const path = require('path');

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  outputDir: './dist',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: path.join(__dirname, './dist'),
  },
  // Preprend styles for all components
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import '@/styles/abstracts/_index.scss';
        `,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      },
    },
  },
};
