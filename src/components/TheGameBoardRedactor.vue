<template>
  <v-dialog v-model="isOpen" persistent>
    <div class="container">
      <h2>Arrange your board</h2>
      <div class="redactor">
        <div class="board"></div>
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
  },
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
</style>
