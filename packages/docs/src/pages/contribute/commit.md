---
title: "Commit with Commitizen"
description: "Commitizen provides a fluid interface for handling semantic versioning.
This provides a great boilerplate making it easier to write patch notes."
---

<v-divider class="my-6" />

## Create your first commit

You need to init commit with this command :

```bash
yarn commit
```

### Select a commit type

First, commitizen will ask you to select a type for this commit.
Bellow, you can find types with explainations :

<TableHelper
  class="m-b-16"
  :items="{
    core: { type: 'Core', description: 'Changes to the build process or auxiliary tools and libraries such as documentation generation' },
    doc: { type: 'Doc', description: 'Documentation only changes' },
    feature: { type: 'Feature', description: 'A new feature' },
    fix: { type: 'Fix', description: 'A bug fix' },
    lint: { type: 'Lint', description: 'Fix compiler/linter warnings' },
    perf: { type: 'Perf', description: 'A code change that improves performance' },
    refactor: { type: 'Refactor', description: 'A code change that neither fixes a bug nor adds a feature' },
    revert: { type: 'Revert', description: 'Revert to a commit' },
    style: { type: 'Style', description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, css, etc)' },
    tests: { type: 'Tests', description: 'Adding missing | fix tests' },
  }"
  disable-search
/>

### Select a commit scope

Then, it asks the scope of change that you're committing. Scopes can be our package name like `datepicker`, `docs` or
`lerna`.

<v-divider class="my-6" />

### Write description

Finally, you need to write your description.
