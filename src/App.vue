<template>
  <v-app>
    <TheNavBar @show-game-menu="handleShowGameMenu" />
    <v-content>
      <TheGameMenu
        :isOpen="isGameMenuOpen"
        :options="gameMenuOptions"
        @start-new-game="handleNewGame"
      />
      <TheGameBoardRedactor
        :isOpen="isGameBoardRedactorOpen"
        :MAX="MAX_RANGE"
        :MIN="MIN_RANGE"
        :cords="cords"
      />
    </v-content>
  </v-app>
</template>

<script>
import TheNavBar from './components/TheNavBar.vue';
import TheGameMenu from './components/TheGameMenu.vue';
import TheGameBoardRedactor from './components/TheGameBoardRedactor.vue';

import {
  MAX_CORD_RANGE as MAX_RANGE,
  MIN_CORD_RANGE as MIN_RANGE,
} from './scripts/factories/createGameBoard';

export default {
  name: 'App',

  components: {
    TheNavBar,
    TheGameMenu,
    TheGameBoardRedactor,
  },

  data: () => ({
    MAX_RANGE,
    MIN_RANGE,
    isGameMenuOpen: true,
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

  computed: {
    cords() {
      const cords = [];
      for (let i = this.MIN_RANGE; i <= this.MAX_RANGE; i += 1) {
        for (let j = this.MIN_RANGE; j <= this.MAX_RANGE; j += 1) {
          cords.push({ x: j, y: i });
        }
      }
      return cords;
    },
  },

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
