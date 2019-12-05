<template>
  <nav>
    <button class="menu" @click="$emit('show-game-menu')">Menu</button>
    <h1 class="logo">Battleship</h1>
    <button class="github-icon" @click="handleOpenRepo">
      <v-icon large>mdi-github-circle</v-icon>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'TheNavBar',

  methods: {
    handleOpenRepo() {
      window.open('https://github.com/igorashs/vue-battleship', '_blank');
    },
  },
};
</script>

<style scoped>
nav {
  height: 10rem;
  background-color: rgb(61, 61, 61);
  display: flex;
  justify-content: center;
  align-items: center;
}

nav h1 {
  text-align: left;
  font-family: bfont;
  font-size: 4rem;
  text-shadow: 0 2px 2px black;
  flex: 1;
}

nav button {
  width: 6rem;
  height: 6rem;
  margin: 0 1rem;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(29, 25, 32, 0.5);
  box-shadow: inset 0 0px 5px 1px rgb(29, 25, 32);
  border: 2px solid rgba(24, 0, 37, 0.192);
  outline: none;
}

nav button:hover,
nav button:focus {
  box-shadow: 0 0px 5px 1px rgb(29, 25, 32);
  animation: pulse 1s infinite alternate;
}

.menu {
  font-family: bfont;
  width: auto;
  height: auto;
  border-radius: 2px;
  padding: 0 0.5rem;
  font-size: 3rem;
}

@keyframes pulse {
  100% {
    box-shadow: 0 0px 5px 1px rgb(0, 255, 213);
  }
}

@media screen and (max-width: 600px) {
  .github-icon {
    display: none !important;
  }
}
</style>
