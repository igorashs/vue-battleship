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
          this.$emit('round', e.target.dataset.cord);
        }
      });
    },

    updatePcBoard(cord, response) {
      if (response === true) {
        const spot = this.pcBoardElement
          .querySelector(`.spot[data-cord=${JSON.stringify(cord)}]`);

        spot.append('x');
        spot.style.backgroundColor = 'rgb(248, 39, 39)';
        spot.style.lineHeight = '1';
      }

      if (response === false) {
        const spot = this.pcBoardElement
          .querySelector(`.spot[data-cord=${JSON.stringify(cord)}]`);

        spot.append('*');
      }

      if (response.ship) {
        const ship = document.createElement('div');
        ship.classList.add('ship');

        for (let i = 0; i < response.ship.getLength(); i += 1) {
          const part = document.createElement('div');
          part.classList.add('part');
          part.append('x');
          ship.appendChild(part);
        }

        const firstSpot = this.pcBoardElement
          .querySelector(`.spot[data-cord=${JSON.stringify(JSON.stringify(response.cords[0]))}]`);

        ship.style['grid-auto-flow'] = response.isVertical ? 'row' : 'column';
        ship.style.position = 'absolute';

        if (firstSpot.firstChild) firstSpot.firstChild.remove();
        firstSpot.appendChild(ship);
      }
    },

    updatePlBoard(cord, response) {
      if (response === true || response.ship) {
        const part = this.plBoardElement
          .querySelector(`.part[data-cord=${JSON.stringify(cord)}]`);

        part.append('x');
        part.style.backgroundColor = 'rgb(218, 100, 100)';
      }

      if (response === false) {
        const spot = this.plBoardElement
          .querySelector(`.spot[data-cord=${JSON.stringify(cord)}]`);

        spot.append('*');
      }
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

.pc >>> .spot,
.pl >>> .spot {
  text-shadow: 0 0 2px black;
  text-align: center;
  font-size: var(--spot-size);
  user-select: none;
}

.pc >>> .spot {
  cursor: crosshair;
}

.pc >>> .spot:hover {
  background-color: rgb(98, 0, 255);
}

.pc >>> .spot .ship {
  display: grid;
  grid-auto-flow: column;
  background-color: rgb(187, 82, 82);
  grid-gap: 4px;
  z-index: 69;
}

.pc >>> .spot .part {
  width: var(--spot-size);
  height: var(--spot-size);
  background-color: rgb(218, 100, 100);
  border: 4px solid rgb(70, 70, 70);
}

.pc >>> .spot .part ,
.pl >>> .spot .part {
  text-shadow: 0 0 2px black;
  text-align: center;
  font-size: var(--spot-size);
  line-height : 0.745;
}
</style>
