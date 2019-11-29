<template>
  <div class="game-wrapper">
    <div class="game-container">
      <div class="pl">
      </div>
      <div class="pc">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheGame',

  data: () => ({

  }),

  methods: {
    initTheGame(plBoardElement, pcBoardElement) {
      this.renderTheBoards(plBoardElement, pcBoardElement);
      // this.addEventsForBoard();
    },

    renderTheBoards(plBoardElement, pcBoardElement) {
      const pl = document.querySelector('.pl');
      pl.appendChild(plBoardElement);

      const pc = document.querySelector('.pc');
      pc.appendChild(pcBoardElement);
    },

    resetTheGame() {
      const plBoard = document.querySelector('.pl');
      if (plBoard.firstElementChild) plBoard.firstElementChild.remove();

      const pcBoard = document.querySelector('.pc');
      if (pcBoard.firstElementChild) pcBoard.firstElementChild.remove();
    },
  },
};
</script>

<style scoped>
.game-container {
  font-family: bfont;
  --spot-size: 4rem;
  padding: 4rem;
  display: flex;
  justify-content: space-around;
}

.pl, .pc {
  display: flex;
  flex-direction: column;
}

.cords {
  display: grid;
  text-shadow: 0 2px 2px black;
  font-size: 1.8rem;
}

.letters {
  justify-content: space-evenly;
  grid-template-columns: repeat(10, var(--spot-size));
  grid-column: 2 / 3;
}

.numbers {
  grid-template-rows: repeat(10, var(--spot-size));
  align-content: space-evenly;
}

.letter,
.number {
  width: var(--spot-size);
  height: var(--spot-size);
  display: flex;
  justify-content: center;
  align-items: center;
}

.board-container {
  display: grid;
  grid-template: var(--spot-size) 1fr / var(--spot-size) 1fr;
}

.board {
  display: grid;
  grid-template-columns: repeat(10, var(--spot-size));
  grid-gap: 4px;
  border: 4px solid rgb(0, 44, 102);
  background-color: rgb(0, 44, 102);
}

.spot {
  width: var(--spot-size);
  height: var(--spot-size);
  background-color: rgb(35, 137, 218);
  position: relative;
}

.ship-container {
  display: flex;
  align-items: center;
}

.ship {
  display: grid;
  grid-auto-flow: column;
  background-color: rgb(128, 128, 128);
  grid-gap: 4px;
  cursor: initial;
  z-index: 69;
}

.part {
  width: var(--spot-size);
  height: var(--spot-size);
  background-color: grey;
  border: 4px solid rgb(70, 70, 70);
}
</style>
