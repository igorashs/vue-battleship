<template>
  <v-app>
    <TheNavBar @show-game-menu="handleShowGameMenu" />
    <v-content>
      <TheGameMenu :isOpen="isGameMenuOpen" :options="gameMenuOptions" />
    </v-content>
  </v-app>
</template>

<script>
import TheNavBar from './components/TheNavBar.vue';
import TheGameMenu from './components/TheGameMenu.vue';

export default {
  name: 'App',

  components: {
    TheNavBar,
    TheGameMenu,
  },

  data: () => ({
    isGameMenuOpen: false, // !default should be true
    gameMenuOptions: {
      resume: {
        isDisabled: true,
      },

      save: {
        isDisabled: true,
      },

      load: {
        isDisabled: true,
      },
    },
  }),

  methods: {
    handleShowGameMenu() {
      this.isGameMenuOpen = true;
    },
  },
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
