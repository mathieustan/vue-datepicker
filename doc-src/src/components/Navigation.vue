<template>
  <nav>
    <ul>
      <li><a href="#section__about" @click.prevent="scrollToExample('#section__about')">About</a></li>
      <li><a href="#section__install" @click.prevent="scrollToExample('#section__install')">Install</a></li>
      <li><a href="#section__api" @click.prevent="scrollToExample('#section__api')">Api</a></li>
      <li
        v-for="[key] in Object.entries(examples)"
        :key="key"
      >
        <a :href="`#section__${key}`" @click.prevent="scrollToExample(`#section__${key}`)"># {{ key }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import VueScrollTo from 'vue-scrollto';

export default {
  props: {
    examples: { type: Object, default: () => ({}) },
  },
  methods: {
    scrollToExample (element) {
      VueScrollTo.scrollTo(element, 500, {
        offset: -100,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/abstracts/_index.scss';

  nav {
    position: fixed;
    display: none;
    left: 0;
    top: 0;
    margin-top: 80px;
    width: 180px;
    height: calc(100vh - 80px);
    background-color: white;
    border-right: 1px solid #3b454e;
    overflow-y: scroll; /* has to be scroll, not auto */
    -webkit-overflow-scrolling: touch;

    @include mq('md') {
      display: block;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li > a {
      position: relative;
      display: flex;
      padding: 8px 16px;
      text-decoration: none;
      color: #3b454e;
      transition: all .3s get-easing(swing);
      text-transform: capitalize;
      font-size: 14px;

      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        bottom: 0;
        background-color: color(other, blue);
        transition: all .3s get-easing(swing);
        transform-origin: left center;
        transform: scaleX(0);
      }

      &:hover,
      &:active {
        &:before {
          transform: scaleX(1);
        }
      }

      &.current {
        &:before {
          transform: scaleX(1);
        }
        background-color: transparentize(color(other, blue), .7)
      }

    }
  }
</style>
