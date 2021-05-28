<template>
  <v-simple-table
    :fixed-header="Boolean(height)"
    :height="height"
    outlined
    class="rounded-lg overflow-hidden my-4"
  >
    <template v-if="!disableSearch" #top>
      <div class="d-flex pa-8">
        <v-text-field
          v-model="search"
          placeholder="Search..."
          append-inner-icon="fal fa-search"
          clearable
          hide-details
          outlined
          no-label
          dense
          type="search"
          class="justify-self-md-end"
        />
      </div>
      <v-divider />
    </template>

    <thead>
      <tr>
        <th
          v-for="heading in headings"
          :key="heading"
          class="text-capitalize text-left"
        >
          {{ heading }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in filteredTableItems" :key="rowIndex">
        <slot v-for="([key, value], cellIndex) in Object.entries(row)" :cell="value" :cell-index="cellIndex">
          <td
            v-if="cellIndex === 0"
            :key="`td_${cellIndex}`"
            class="text-no-wrap text-body-2 text-left"
          >
            <code>{{ value }}</code>
            <GIcon
              v-if="copyClass"
              right
              size="16"
              v-clipboard:copy="`.${value}`"
              v-clipboard:success="onCopy"
              class="hidden-sm-and-down"
              @click="() => ({})"
            >
            fal fa-copy
            </GIcon>
          </td>
          <td
            v-else-if="key === 'properties'"
            :key="`td_${cellIndex}`"
            :class="{' text-medium': cellIndex === 1 }"
            class="text-body-2 text-left py-4"
          >
            <Markup :source="value" type="css" dense />
          </td>
          <td
            v-else
            :key="`td_${cellIndex}`"
            :class="{' text-medium': cellIndex === 1 }"
            class="text-pre text-body-2 text-left py-4"
            v-html="value"
          />
        </slot>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
// Components
import Markup from '~vuepress/components/code/Markup.vue';

// Helpers
import { searchItems } from '~vuepress/shared/utils/search';

export default {
  name: 'TableHelper',
  components: { Markup },
  props: {
    items: { type: Object, default: () => ({}) },
    height: { type: [String, Number], default: 400 },
    copyClass: { type: Boolean, default: false },
    searchKey: { type: String, default: 'class' },
    disableSearch: { type: Boolean, default: false },
  },
  data: () => ({
    search: '',
  }),
  computed: {
    firstRow () {
      return Object.values(this.items)[0];
    },
    headings () {
      return Object.keys(this.firstRow);
    },
    rows () {
      return Object.values(this.items);
    },
    filteredTableItems () {
      if (this.disableSearch) return Object.values(this.items);
      return searchItems(Object.values(this.items), this.search || '', this.searchKey);
    },
  },
  methods: {
    onCopy () {
      this.$gnotify.success('La var css a bien été copiée');
    },
  },
};
</script>
