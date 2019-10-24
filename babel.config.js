module.exports = {
  presets: [
    ['@babel/preset-env', { 'modules': false }],
  ],
  plugins: [
    '@babel/transform-runtime',
    'dynamic-import-node-babel-7',
  ],
  env: {
    test: {
      presets: ['@vue/app'],
    },
  },
};
