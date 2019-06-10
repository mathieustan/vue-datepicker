module.exports = {
  extends: [
    '@vue/standard',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-multi-spaces': ['error', { ignoreEOLComments: false }],
    'max-len': [
      1,
      {
        code: 100,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
      },
    ],
    semi: [2, 'always'],
    'no-undef': 2,
    'no-unused-vars': [2, { vars: 'all' }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'func-names': ['error', 'never'],
    'new-cap': ['error', { capIsNew: false }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/prefer-default-export': 0,
    'no-use-before-define': ['error', { functions: false }],
    'consistent-return': 0,
    'no-useless-return': 0,
    'no-param-reassign': 0,
    'vue/require-default-prop': 0,
    'vue/require-prop-types': 0,
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 5,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/name-property-casing': [2, 'PascalCase'],
    'padded-blocks': 'off',
    'meteor/audit-argument-checks': 'off',
    'no-multiple-empty-lines': ['error', { max: 1 }],
  },
}
