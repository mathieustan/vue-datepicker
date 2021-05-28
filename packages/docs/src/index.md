---
home: true
title: "Home"
---

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <h1 class="my-12"> Welcome on VueDatePicker Documentation </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="[key, link] in Object.entries(links)"
        :key="key"
        cols="12"
        md="6"
      >
        <v-card
          class="link d-flex flex-column align-center justify-center background-white pa-4 pa-md-6 rounded-lg"
          :min-height="isMobile ? 'auto' : '300'"
        >
          <p class="text-caption primary--text ma-0">{{ link.subheader }}</p>
          <h1 class="ma-3"> {{ link.title }} </h1>
          <p class="text-body-2 text-center">
            {{ link.description }}
          </p>
          <v-btn plain :to="link.href" color="primary">
            Voir
            <v-icon right>fal fa-long-arrow-right</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    links: {
      docs: {
        title: 'Documentation',
        subheader: 'Getting Started',
        description: 'Documentation about VueDatePicker with different examples for props & misc.',
        href: '/pages/docs/getting-started',
      },
      contribute: {
        title: 'Contribute',
        subheader: 'For the devs',
        description: 'You’ll find all settings and steps to start programming on your machine.',
        href: '/pages/contribute/setting-up',
      },
    },
  }),
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.isMobile;
    },
  },
};
</script>

<style lang="scss" scoped>

  h1 {
    font-size: 2.5em;

    @media only screen and (min-width: 768px) {
      font-size: 3.5em;
    }
  }

  .link {
    background-color: #fff;

   /*  .g-theme--dark & {
      color: rgb(var(--g-theme-background));
    }
    .g-theme--light & {
      color: rgb(var(--g-theme-on-background));
    } */

    h1 {
      font-size: 2em;

      @media only screen and (min-width: 768px) {
        font-size: 2.5em;
      }
    }
  }
</style>
