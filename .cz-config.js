'use strict';

module.exports = {
  types: [
    { value: ':sparkles:',  name: 'Feature:    A new feature' },
    { value: ':bug:',       name: 'Fix:        A bug fix' },
    { value: ':pencil:',     name: 'Doc:        Documentation only changes' },
    { value: ':lipstick:',  name: 'Style:      Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)' },
    { value: ':art:',       name: 'Refactor:   A code change that neither fixes a bug nor adds a feature' },
    { value: ':zap:',       name: 'Perf:       A code change that improves performance' },
    { value: ':white_check_mark:', name: 'Tests:      Adding missing | fix tests' },
    { value: ':package:',   name: 'Core:       Changes to the build process or auxiliary tools\n            and libraries such as documentation generation' },
    { value: ':rewind:',    name: 'Revert:     Revert to a commit' },
  ],
  messages: {
    type: 'Select the type of change that you\'re committing:',
    customScope: 'What is the scope of this change (e.g. Props, Mixin, Doc, Build, ...):',
    subject: 'Write a short, imperative tense description of the change (max 60 chars):\n',
    body: 'Provide a longer description of the change: (press enter to skip):\n',
    breaking: 'Are there any breaking changes?: (y/N)\n',
    footer: 'Does this change affect any open issues. E.g.: #31, #34: \n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'perf'],
  skipQuestions: ['body', 'footer'],
  upperCaseSubject: true,
  // limit subject length
  subjectLimit: 72
};
