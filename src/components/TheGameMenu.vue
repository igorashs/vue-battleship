<template>
  <v-dialog v-model="isOpen" persistent overlay-opacity="0.8">
    <div class="menu-container">
      <button class="btn" @click="$emit('start-new-game')">
        New Game
      </button>
      <button
        class="btn"
        :class="{ disable: options.resume.isDisabled }"
        @click="$emit('resume-game')"
      >
        Resume
      </button>
      <button class="btn source" @click="handleOpenRepo">
        Source Code
      </button>
      <p class="author">Made by igorash</p>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'TheGameMenu',

  props: {
    isOpen: Boolean,
    options: Object,
  },

  methods: {
    handleOpenRepo() {
      window.open('https://github.com/igorashs/vue-battleship', '_blank');
    },
  },
};
</script>

<style scoped>
.btn {
  margin: 2rem;
  font-size: 3rem;
  font-family: bfont;
  outline: none;
  text-shadow: 0 2px 2px black;
  text-align: center;
}

.btn:hover,
.btn:focus {
  color: rgb(128, 255, 0);
}

.menu-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(34, 34, 34, 0.8);
  box-shadow: inset 0 0 2px 2px rgb(56, 56, 56);
}

.source {
 text-decoration: underline;
 color: rgb(255, 103, 103);
 text-shadow: 0 0px 2px black;
 font-size: 2rem;
}

.disable {
  pointer-events: none;
  color: rgb(117, 117, 117);
}

.author {
  font-family: bfont;
  text-shadow: 0 2px 2px black;
  font-size: 1.6rem;
}
</style>
