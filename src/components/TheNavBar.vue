<template>
  <nav>
    <h1 class="logo">Battleship</h1>
    <button @click="handleClick">
      <v-icon large>mdi-github-circle</v-icon>
    </button>
  </nav>
</template>

<script>
export default {
  methods: {
    handleClick() {
      window.open('https://github.com/igorashs/vue-battleship', '_blank');
    },
  },
};
</script>

<style scoped>
nav {
  height: 100px;
  background-color: rgb(61, 61, 61);
  display: flex;
  justify-content: center;
  align-items: center;
}

nav h1 {
  text-align: center;
  font-family: bfont;
  font-size: 4rem;
  text-shadow: 0 2px 2px black;
  flex: 1;
}

nav button {
  width: 4rem;
  height: 4rem;
  margin: 0 1rem;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(29, 25, 32, 0.5);
  box-shadow: 0 0px 5px 1px rgb(29, 25, 32);
  outline: none;
}

nav button:hover,
nav button:focus {
  box-shadow: 0 0px 5px 1px rgb(98, 0, 255);
  animation: pulse 750ms infinite;
}

@keyframes pulse {
  100% {
    transform: scale(1.2);
    box-shadow: 0 0px 5px 1px rgb(0, 255, 213);
  }
}
</style>
