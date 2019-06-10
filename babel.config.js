module.exports = {
  env: {
    test: {
      presets: ['@vue/app'],
    },
  },
  presets: [
    ['@babel/preset-env', { 'modules': false }],
  ],
};
