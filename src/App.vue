<template>
  <v-app>
    <TheNavBar @show-game-menu="handleShowGameMenu" />
    <v-content>
      <TheGame ref="game" />
      <TheGameMenu
        :isOpen="isGameMenuOpen"
        :options="gameMenuOptions"
        @start-new-game="handleNewGame"
      />
      <TheGameBoardRedactor :isOpen="isGameBoardRedactorOpen" @start-game="handleStartGame"/>
    </v-content>
  </v-app>
</template>

<script>
import TheNavBar from './components/TheNavBar.vue';
import TheGameMenu from './components/TheGameMenu.vue';
import TheGameBoardRedactor from './components/TheGameBoardRedactor.vue';
import TheGame from './components/TheGame.vue';

export default {
  name: 'App',

  components: {
    TheGame,
    TheNavBar,
    TheGameMenu,
    TheGameBoardRedactor,
  },

  data: () => ({
    isGameMenuOpen: true,
    isGameBoardRedactorOpen: false,
    gameMenuOptions: {
      resume: {
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

    openGameBoardRedactor() {
      this.isGameBoardRedactorOpen = true;
    },

    closeGameBoardRedactor() {
      this.isGameBoardRedactorOpen = false;
    },

    handleNewGame() {
      this.hideGameMenu();
      this.openGameBoardRedactor();

      this.$refs.game.resetTheGame();
    },

    handleStartGame(plBoard, plBoardContainerElement) {
      this.closeGameBoardRedactor();

      this.$refs.game.renderTheBoards(plBoardContainerElement);
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
  font-size: 10px !important;
}
</style>
