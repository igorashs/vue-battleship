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
    plBoardElement: null,
    pcBoardElement: null,
  }),

  methods: {
    initTheGame(plBoardElement, pcBoardElement) {
      this.plBoardElement = plBoardElement;
      this.pcBoardElement = pcBoardElement;

      this.renderTheBoards();
      this.addPcBoardEvent();
    },

    renderTheBoards() {
      const pl = document.querySelector('.pl');
      pl.appendChild(this.plBoardElement);

      const pc = document.querySelector('.pc');
      pc.appendChild(this.pcBoardElement);
    },

    resetTheGame() {
      if (this.plBoardElement) this.plBoardElement.remove();
      if (this.pcBoardElement) this.pcBoardElement.remove();
    },

    addPcBoardEvent() {
      this.pcBoardElement.addEventListener('click', (e) => {
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
