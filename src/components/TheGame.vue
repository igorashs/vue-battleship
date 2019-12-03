<template>
  <div class="game-wrapper">
    <div class="game-container">
      <div class="pl">
      </div>
      <div class="game-info"></div>
      <div class="pc">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheGame',

  data: () => ({
    isGameInitiated: false,
    plElement: null,
    pcElement: null,
    plBoardElement: null,
    pcBoardElement: null,
    plBoardInfoElement: null,
    pcBoardInfoElement: null,
    gameInfo: null,
    pl: null,
    pc: null,
  }),

  methods: {
    initTheGame(plBoardElement, pcBoardElement, pl, pc) {
      this.plElement = document.querySelector('.pl');
      this.pcElement = document.querySelector('.pc');
      this.gameInfo = document.querySelector('.game-info');
      this.plBoardElement = plBoardElement;
      this.pcBoardElement = pcBoardElement;
      this.pl = pl;
      this.pc = pc;

      this.renderTheBoards();
      this.renderTheBoardsInfo();
      this.updateTheBoardsInfo();
      this.updateGameInfo('Your Turn!');
      this.addPcBoardEvent();

      this.isGameInitiated = true;
    },

    renderTheBoards() {
      this.plElement.appendChild(this.plBoardElement);
      this.pcElement.appendChild(this.pcBoardElement);
    },

    resetTheGame() {
      if (this.isGameInitiated) {
        this.updateGameInfo('');
        this.plBoardElement.remove();
        this.pcBoardElement.remove();
        this.plBoardInfoElement.remove();
        this.pcBoardInfoElement.remove();
      }
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
        spot.style.pointerEvents = 'none';
      }

      if (response === false) {
        const spot = this.pcBoardElement
          .querySelector(`.spot[data-cord=${JSON.stringify(cord)}]`);

        spot.append('*');
        spot.style.pointerEvents = 'none';
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

    updateTheBoardsInfo() {
      const updateInfoFor = (player, boardInfoElement) => {
        const nameEl = boardInfoElement.firstElementChild;
        const aliveShipsEl = boardInfoElement.lastElementChild;
        const name = player.getName();
        const aliveShips = player.getBoard().getAliveShipsCount();

        if (`${nameEl.textContent} Board` !== name) {
          nameEl.textContent = `${name} Board`;
        }

        if (`Alive Ships: ${aliveShipsEl.textContent}` !== aliveShips) {
          aliveShipsEl.textContent = `Alive Ships: ${aliveShips}`;
        }
      };

      updateInfoFor(this.pl, this.plBoardInfoElement);
      updateInfoFor(this.pc, this.pcBoardInfoElement);
    },

    renderTheBoardsInfo() {
      const createBoardInfo = () => {
        const infoElement = document.createElement('div');
        const name = document.createElement('h3');
        const aliveShips = document.createElement('h4');

        infoElement.classList.add('board-info');
        name.classList.add('name');
        aliveShips.classList.add('alive-ships');

        infoElement.appendChild(name);
        infoElement.appendChild(aliveShips);

        return infoElement;
      };

      this.plBoardInfoElement = createBoardInfo();
      this.pcBoardInfoElement = createBoardInfo();

      this.plElement.appendChild(this.plBoardInfoElement);
      this.pcElement.appendChild(this.pcBoardInfoElement);
    },

    updateGameInfo(msg = '', color = 'rgb(43, 197, 87)') {
      this.gameInfo.textContent = msg;
      this.gameInfo.style.color = color;

      if (!this.gameInfo.classList.contains('pulse')) {
        this.gameInfo.classList.add('pulse');
        this.gameInfo.classList.add('top-bot-borders');
      }

      if (!msg) {
        this.gameInfo.classList.remove('pulse');
        this.gameInfo.classList.remove('top-bot-borders');
      }
    },

    disablePcBoard() {
      this.pcBoardElement.style.pointerEvents = 'none';
    },

    enablePcBoard() {
      this.pcBoardElement.style.pointerEvents = 'auto';
    },
  },
};
</script>

<style scoped>
* {
  user-select: none;
}

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

.pc >>> .board-info,
.pl >>> .board-info {
  text-shadow: 0 0 2px black;
  text-align: center;
  padding-left: var(--spot-size);
}

.pl >>> .board-info {
  color: rgb(43, 197, 87);
}

.pc >>> .board-info {
  color: rgb(226, 54, 54);
}

.pc >>> .board-info .name,
.pl >>> .board-info .name {
  border-bottom: 1px solid;
  font-size: 2.6rem;
}

.pc >>> .board-info .alive-ships,
.pl >>> .board-info .alive-ships {
  font-size: 2.4rem;
}

.game-info {
  font-size: 3.0rem;
  align-self: center;
  text-align: center;
  text-shadow: 0 0 6px black;
  width: 100%;
}

.top-bot-borders {
  padding: 1rem;
  margin: 1rem;
  border-top: 1px solid;
  border-bottom: 1px solid;
}

.pulse {
  animation: pulse 500ms alternate infinite;
}

@keyframes pulse {
   100% {
    box-shadow: inset 0 0 2px 1px rgb(82, 82, 82),
      0 0 2px 1px rgb(255, 255, 255);
    color: rgb(255, 255, 255);
  }
}
</style>
