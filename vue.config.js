module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        data: `@import  '~@/styles/abstracts/functions',
                        '~@/styles/abstracts/variables',
                        '~@/styles/abstracts/mixins';`,
      },
    },
  },
};

