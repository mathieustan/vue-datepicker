const datepickerPackage = require('./package.json');

module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
    }],
  ],
  plugins: [
    ['transform-define', {
      __VERSION__: datepickerPackage.version,
    }],
    ['@babel/transform-runtime'],
  ],
  env: {
    test: {
      presets: ['@vue/app'],
    },
  },
};
