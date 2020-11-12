<template>
  <Wrapper
    background-color="white"
    no-padding-example
    is-title
  >
    <template v-slot:description>
      <div class="wrapper__header">
        <input
          v-model="search"
          placeholder="Search..."
          type="search"
        />
      </div>
    </template>

    <template v-slot:example>
      <VTable height="400px" fixed-header>
        <thead>
          <tr>
            <th
              v-for="header in ['name', 'description', 'type', 'default']"
              :key="header"
              :class="header"
            >
              <div
                class="text-capitalize"
                v-text="header"
              />
            </th>
          </tr>
        </thead>

        <tbody>
          <template v-if="filteredApiProps.length === 0">
            <tr>
              <td colspan="100%" class="text-center">
                <b>There are no props for this component</b>
              </td>
            </tr>
          </template>

          <template v-else>
            <tr
              v-for="(data, index) in filteredApiProps"
              :key="index"
            >
              <td class="text-left text-purple text-bold" v-text="hyphenate(data.name)" />
              <td
                class="text-left text-italic"
                v-html="getPropDescription(data.name, data.source, data.description)"
              />
              <td class="text-left"><code> {{ data.type }} </code></td>
              <td class="text-left" v-text="data.default" />
            </tr>
          </template>
        </tbody>
      </VTable>
    </template>
  </Wrapper>
</template>

<script>
import MarkdownIt from 'markdown-it';

// Api
import api, { descriptions } from '../api';
import { searchItems } from '../utils/search';

// Components
import Wrapper from '@/components/Wrapper.vue';
import VTable from '@/components/VTable';

export default {
  name: 'ApiComponent',
  components: { Wrapper, VTable },
  props: {
    apis: { type: Array, default: () => [] },
  },
  data: (vm) => ({
    search: '',
    selectedApi: vm.apis[0],
  }),
  computed: {
    currentApi () {
      return api[this.selectedApi];
    },
    currentApiProps () {
      return (this.currentApi || {}).props;
    },
    filteredApiProps () {
      return searchItems(this.currentApiProps, this.search);
    },
  },
  methods: {
    getPropDescription (name, source, description) {
      const md = new MarkdownIt();
      if (description) return md.render(description);
      if (
        descriptions[this.selectedApi] &&
        descriptions[this.selectedApi].props[name]
      ) return md.render(descriptions[this.selectedApi].props[name]);
      if (!descriptions[source]) return md.render(`**MISSING SOURCE DESCRIPTION** - ${source}`);
      if (
        !descriptions[source].props ||
        !descriptions[source].props[name]
      ) return md.render(`**MISSING DESCRIPTION** - ${source} - ${name}`);
      return md.render(descriptions[source].props[name]);
    },
    hyphenate (str) {
      const hyphenateRE = /\B([A-Z])/g;
      return str.replace(hyphenateRE, '-$1').toLowerCase();
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  &-capitalize {
    text-transform: uppercase;
  }
  &-italic {
    font-style: italic;
  }
  &-bold {
    font-weight: bold;
  }
  &-left {
    text-align: left;;
  }
  &-center {
    text-align: center;
  }
  &-purple {
    color: color(other, dark-purple);
  }
}

code {
  background-color: rgba(255,69,119,.1);
  color: #de003c;
  padding: 0 .4rem;
}
</style>
