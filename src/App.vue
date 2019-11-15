<template>
  <v-app>
    <TheNavBar @show-game-menu="handleShowGameMenu" />
    <v-content>
      <TheGameMenu
        :isOpen="isGameMenuOpen"
        :options="gameMenuOptions"
        @start-new-game="handleNewGame"
      />
      <TheGameBoardRedactor :isOpen="isGameBoardRedactorOpen" />
    </v-content>
  </v-app>
</template>

<script>
import TheNavBar from './components/TheNavBar.vue';
import TheGameMenu from './components/TheGameMenu.vue';
import TheGameBoardRedactor from './components/TheGameBoardRedactor.vue';

export default {
  name: 'App',

  components: {
    TheNavBar,
    TheGameMenu,
    TheGameBoardRedactor,
  },

  data: () => ({
    isGameMenuOpen: false, // !default should be true
    isGameBoardRedactorOpen: false,
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
    hideGameMenu() {
      this.isGameMenuOpen = false;
    },

    handleShowGameMenu() {
      this.isGameMenuOpen = true;
    },

    showGameBoardRedactor() {
      this.isGameBoardRedactorOpen = true;
    },

    handleNewGame() {
      this.hideGameMenu();
      this.showGameBoardRedactor();
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
