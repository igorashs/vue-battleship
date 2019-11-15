<template>
  <v-app>
    <TheNavBar />
    <v-content></v-content>
  </v-app>
</template>

<script>
import TheNavBar from './components/TheNavBar.vue';

export default {
  name: 'App',

  components: {
    TheNavBar,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@font-face {
  font-family: bfont;
  src: url('./assets/fonts/04B_30__.TTF');
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: inherit;
}

html {
  font-size: 10px;
}
</style>
