<template>
  <v-dialog v-model="isOpen" persistent>
    <div class="container">
      <h2>Arrange your board</h2>
      <div class="redactor">
        <div class="board">
          <div
            class="spot"
            v-for="(_, i) in Math.pow(MAX + 1, 2)"
            :key="keys[MIN + i]"
            :data-cord="stringifiedCords[MIN + i]"
          ></div>
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
  },

  methods: {},
};
</script>

<style scoped>
.container h2 {
  font-size: 2.4rem;
  font-family: bfont;
  text-shadow: 0 2px 2px black;
  text-align: center;
  text-decoration: underline;
}

.options {
  display: flex;
  justify-content: space-around;
}

.options button {
  font-size: 2rem;
  font-family: bfont;
  text-shadow: 0 2px 2px black;
  text-align: center;
  outline: none;
}

.options button:hover,
.options button:focus {
  color: rgb(128, 255, 0);
}

.board {
  --spot-size: 32px;
  display: grid;
  grid-template-columns: repeat(10, var(--spot-size));
  grid-gap: 2px;
}

.board .spot {
  width: var(--spot-size);
  height: var(--spot-size);
  background-color: blueviolet;
}
</style>
