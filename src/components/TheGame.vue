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
      this.addPcBoardEvent(pcBoardElement);
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

    addPcBoardEvent(pcBoardElement) {
      pcBoardElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('spot')) {
          this.$emit('round', JSON.parse(e.target.dataset.cord));
        }
      });
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

.pl >>> .ship,
.pc >>> .ship  {
  cursor: initial;
}

.pc >>> .spot {
  cursor: crosshair;
}
.pc >>> .spot:hover {
  background-color: rgb(98, 0, 255);
}
</style>
