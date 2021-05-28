<template>
  <v-sheet
    class="rounded-lg overflow-hidden"
    outlined
  >
    <v-row no-gutters>
      <v-col cols="12" :md="hasOptions ? 8 : 12">
        <div class="d-flex">
          <v-responsive
            class="align-center"
            min-height="48"
          />
        </div>

        <v-divider />

        <v-sheet
          id="usage-example"
          :color="playgroundColor"
          class="overflow-y-auto fill-height d-flex align-center justify-center rounded-0 pa-4"
          min-height="400"
          max-height="400"
        >
          <div class="fill-height d-flex flex-grow-1">
            <VueFile
              :filename="filename"
              v-bind="{ ...usageProps }"
              @loaded="setContents"
              @error="hasError = true"
            />
          </div>
        </v-sheet>
      </v-col>

      <v-col
        v-if="hasOptions"
        cols="12"
        md="4"
      >
        <v-divider v-if="isMobile" />
        <div class="d-flex align-center">
          <v-divider v-if="hasOptions && !isMobile" vertical />
          <v-responsive
            class="d-flex align-center text-h5 font-weight-regular px-3"
            height="48"
          >
            Options
          </v-responsive>
        </div>

        <v-divider />

        <div class="d-flex">
          <v-divider v-if="!isMobile" vertical />

          <v-responsive
            class="overflow-y-auto pa-3"
            height="100%"
            max-height="400"
            min-height="400"
          >
            <v-text-field
              v-for="(input, prop) in inputs"
              :key="prop"
              v-model="usageProps[input]"
              :label="startCase(input)"
              class="my-2"
              filled
              dense
              hide-details="auto"
            />

            <v-switch
              v-for="prop in booleans"
              :key="prop"
              v-model="usageProps[prop]"
              class="mt-0 my-2"
              hide-details
              inset
            >
              <template v-slot:label>
                <span
                  class="text-capitalize"
                  v-text="startCase(prop)"
                />
              </template>
            </v-switch>

            <v-select
              v-for="(items, prop) in selects"
              :key="prop"
              v-model="usageProps[prop]"
              :items="items"
              :label="startCase(prop)"
              clearable
              dense
              filled
              hide-details
              class="my-2"
            />

            <v-combobox
              v-for="(items, prop) in comboboxes"
              :key="prop"
              v-model="usageProps[prop]"
              :items="items"
              :label="startCase(prop)"
              clearable
              dense
              filled
              hide-details
              class="my-2"
            />

            <v-autocomplete
              v-for="(items, prop) in autocompletes"
              :key="prop"
              v-model="usageProps[prop]"
              :items="items"
              :label="startCase(prop)"
              clearable
              dense
              filled
              hide-details
              class="my-2"
            />
          </v-responsive>
        </div>
      </v-col>

      <v-col cols="12">
        <v-divider />
      </v-col>

      <v-col cols="12" v-if="!hideAttributes">
        <Markup type='html' :source='formatAttributes' tile />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';
import startCase from 'lodash/startCase';
import padStart from 'lodash/padStart';

// Components
import Markup from '~vuepress/components/code/Markup.vue';
import VueFile from '~vuepress/components/examples/VueFile.vue';

const DEFAULT_OPTIONS = {
  booleans: [],
  inputs: [],
  selects: [],
  comboboxes: [],
  autocompletes: [],
};

export default {
  name: 'Playground',
  components: { Markup, VueFile },
  props: {
    filename: { type: [Object, String], default: undefined },
    hideAttributes: { type: Boolean },
  },
  data: () => ({
    booleans: [],
    inputs: [],
    selects: [],
    comboboxes: [],
    autocompletes: [],
    file: undefined,
    hasError: false,
    options: {},
    usageProps: {},
  }),
  computed: {
    ...mapGetters({
      isMobile: 'isMobile',
      isDark: 'theme/isDark',
    }),
    playgroundColor () {
      return this.isDark ? undefined : 'grey lighten-5';
    },
    hasOptions () {
      const options = Object.keys(DEFAULT_OPTIONS).reduce((opts, option) => [
        ...opts,
        ...Object.values(this[option]),
      ], []);
      return new Set(options).size > 0;
    },
    formatAttributes () {
      let attributeArray = [];

      const tag = 'VueDatePicker';
      for (const [key, value] of Object.entries(this.usageProps)) {
        if (!!value === false) continue;

        let trimmed = key.trim();

        if (Array.isArray(value)) {
          trimmed = padStart(trimmed, trimmed.length + 1, ':');
          trimmed += `="[${value}]"`;
        } else if (value !== true) trimmed += `="${value}"`;

        attributeArray.push(trimmed);
      }

      attributeArray = attributeArray.sort();

      const indent = attributeArray.length ? '\r  ' : '';
      const tail = `${attributeArray.length ? '\r' : ''}/>`;

      return `<${tag}${indent}${attributeArray.join('\r  ')}${tail}`;
    },
  },
  methods: {
    startCase,
    setContents (component) {
      if (!component) return;

      const data = component.data();
      this.usageProps = Object.assign({}, data.defaults);

      for (const [key, value] of Object.entries(data.options)) {
        this[key] = value;
      }
    },
  },
};
</script>
