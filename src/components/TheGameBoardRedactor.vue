<template>
  <v-dialog v-model="isOpen" persistent>
    <div class="container">
      <h2>Arrange your board</h2>
      <div class="redactor">
        <div class="board-container">
          <div class="cords letters">
            <div class="letter" v-for="l in lettersCords" :key="l">
              {{ l }}
            </div>
          </div>
          <div class="cords numbers">
            <div class="number" v-for="n in numbersCords" :key="n">
              {{ n }}
            </div>
          </div>
          <div class="board">
            <div
              class="spot"
              v-for="(_, i) in Math.pow(MAX + 1, 2)"
              :key="keys[MIN + i]"
              :data-cord="stringifiedCords[MIN + i]"
            ></div>
          </div>
        </div>
        <div class="ships-selection"></div>
      </div>
      <div class="options">
        <button>Random</button>
        <button>Next</button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    cords: Array,
    MAX: Number,
    MIN: Number,
  },

  computed: {
    keys() {
      return this.cords.map((c, i) => `${JSON.stringify(c)}-${i}`);
    },

    stringifiedCords() {
      return this.cords.map((c) => JSON.stringify(c));
    },

    lettersCords() {
      const cords = [];

      for (let i = this.MIN; i <= this.MAX + 1; i += 1) {
        cords.push(String.fromCharCode(65 + i));
      }

      return cords;
    },

    numbersCords() {
      const cords = [];

      for (let i = this.MIN + 1; i <= this.MAX + 1; i += 1) {
        cords.push(i);
      }

      return cords;
    },
  },

  methods: {},
};
</script>

<style scoped>
.container {
  font-family: bfont;
}

.container h2 {
  font-size: 3.2rem;
  text-shadow: 0 2px 2px black;
  text-align: right;
  text-decoration: underline;
}

.options {
  display: flex;
  justify-content: space-around;
}

.options button {
  font-size: 3.2rem;
  text-shadow: 0 2px 2px black;
  text-align: center;
  outline: none;
}

.options button:hover,
.options button:focus {
  color: rgb(128, 255, 0);
}

.redactor {
  display: flex;
  --spot-size: 4rem;
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
  grid-gap: 2px;
  border: 2px solid rgb(0, 44, 102);
  background-color: rgb(0, 44, 102);
}

.board .spot {
  width: var(--spot-size);
  height: var(--spot-size);
  background-color: rgb(35, 137, 218);
}
</style>
