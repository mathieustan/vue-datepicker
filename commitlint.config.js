module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: './commitlint.parser.js',
  rules: {
    /*
    * types can be found in .cz-config.js
    */
    'type-enum': [2, 'always', [
      ':sparkles:',
      ':bug:',
      ':pencil:',
      ':lipstick:',
      ':art:',
      ':zap:',
      ':white_check_mark:',
      ':package:',
      ':rewind:',
    ]],
    'scope-empty': [
      2,
      'never',
    ],
  },
};
