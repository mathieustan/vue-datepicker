<template>
  <v-container v-if="prev || next">
    <v-divider />
    <v-row no-gutters>
      <v-col cols="6" class="mt-2">
        <div v-if="prev" class="d-flex align-center justify-start">
          <v-icon left> fal fa-long-arrow-left</v-icon>
          <v-btn
            v-if="prev.type === 'external'"
            :href="prev.path"
            target="_blank"
            rel="noopener noreferrer"
            plain
            color="primary"
          >
            {{ prev.title || prev.path }}
            <OutboundLink />
          </v-btn>

          <v-btn
            v-else
            class="prev"
            :to="prev.path"
            plain
            color="primary"
          >
            {{ prev.title || prev.path }}
          </v-btn>
        </div>
      </v-col>
      <v-col cols="6" class="mt-2">
        <div v-if="next" class="d-flex align-center justify-end">
          <v-btn
            v-if="next.type === 'external'"
            :href="next.path"
            target="_blank"
            rel="noopener noreferrer"
            plain
            color="primary"
          >
            {{ next.title || next.path }}
            <OutboundLink />
          </v-btn>

          <v-btn
            v-else
            :to="next.path"
            plain
            color="primary"
          >
            {{ next.title || next.path }}
          </v-btn>
          <v-icon right> fal fa-long-arrow-right</v-icon>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import isString from 'lodash/isString';
import isNil from 'lodash/isNil';

import { resolvePage } from '@parent-theme/util';

const LINK_TYPES = {
  NEXT: {
    resolveLink: resolveNext,
    getThemeLinkConfig: ({ nextLinks }) => nextLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.next,
  },
  PREV: {
    resolveLink: resolvePrev,
    getThemeLinkConfig: ({ prevLinks }) => prevLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.prev,
  },
};

export default {
  name: 'PageNav',
  props: ['sidebarItems'],
  computed: {
    prev () {
      return resolvePageLink(LINK_TYPES.PREV, this);
    },

    next () {
      return resolvePageLink(LINK_TYPES.NEXT, this);
    },
  },
};

function resolvePrev (page, items) {
  return find(page, items, -1);
}

function resolveNext (page, items) {
  return find(page, items, 1);
}

function resolvePageLink (
  linkType,
  { $themeConfig, $page, $route, $site, sidebarItems },
) {
  const { resolveLink, getThemeLinkConfig, getPageLinkConfig } = linkType;

  // Get link config from theme
  const themeLinkConfig = getThemeLinkConfig($themeConfig);

  // Get link config from current page
  const pageLinkConfig = getPageLinkConfig($page);

  // Page link config will overwrite global theme link config if defined
  const link = isNil(pageLinkConfig) ? themeLinkConfig : pageLinkConfig;

  if (link === false) {
    return undefined;
  } else if (isString(link)) {
    return resolvePage($site.pages, link, $route.path);
  } else {
    return resolveLink($page, sidebarItems);
  }
}

function find (page, items, offset) {
  const res = [];
  flatten(items, res);
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset];
    }
  }
}

function flatten (items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res);
    } else {
      res.push(items[i]);
    }
  }
}
</script>
