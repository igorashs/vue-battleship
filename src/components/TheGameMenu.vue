<template>
  <v-dialog v-model="isOpen" persistent>
    <div class="menu-container">
      <button class="menu-btn">New Game</button>
      <button class="menu-btn" :class="{ disable: options.resume.isDisabled }">
        Resume
      </button>
      <button class="menu-btn" :class="{ disable: options.save.isDisabled }">
        Save
      </button>
      <button class="menu-btn" :class="{ disable: options.load.isDisabled }">
        Load
      </button>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    options: Object,
  },
};
</script>

<style scoped>
.menu-btn {
  width: 20rem;
  margin: 2rem;
  font-size: 2rem;
  font-family: bfont;
  outline: none;
  text-shadow: 0 2px 2px black;
}

.menu-btn:hover,
.menu-btn:focus {
  color: rgb(128, 255, 0);
}

.menu-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.disable {
  pointer-events: none;
  color: rgb(117, 117, 117);
}
</style>
