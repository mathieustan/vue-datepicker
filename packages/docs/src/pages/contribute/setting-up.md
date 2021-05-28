---
title: "Setting up your environment"
description: "**VueDatePicker** use lerna & yarn workspaces which allow you to work easily on every packages."
---

<v-divider class="my-6" />

**Lerna** makes versioning and publishing packages to an NPM Org a painless experience by providing helpful utility commands for handling the execution of tasks across multiple packages.

**Yarn Workspaces** manages our dependencies. Rather than having multiple node_modules directories, it intelligently optimizes the installing of dependencies together and allows for the cross-linking of dependencies in a monorepo. Yarn Workspaces provide tools, like Lerna, the low-level primitives it needs to manage multi-package repositories.

<v-divider class="my-6" />

## Install yarn

In order to begin, let’s install yarn (if you don't already have it) :

```bash
npm install -g yarn
```

<v-divider class="my-6" />

## Init project locally

```bash
// Clone your forked repo
$ git clone git@github.com:mathieustan/vue-datepicker.git

// Change to your new directory
$ cd vue-datepicker

// Checkout the branch you are working on
$ git checkout <branch name>

// Install dependencies
$ yarn install

// Build packages
$ yarn build
```

Now, wait until installation ends.
That's all for now.
