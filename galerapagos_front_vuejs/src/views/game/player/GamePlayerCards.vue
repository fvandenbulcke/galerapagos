<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'GamePlayerCards',

    props: {
      numberOfCards: {
        type: Number,
        required: true,
      },
    },

    setup(props) {
      return {};
    },
  });
</script>

<template>
  <ul class="game-player-cards">
    <li v-for="i in numberOfCards" :key="`card-${i}`" class="game-player-card" />
  </ul>
</template>

<style scoped>
  .game-player-cards {
    display: flex;
    gap: 5px;
    padding: 0;
  }

  .game-player-card {
    list-style: none;
    height: 15px;
    width: 10px;
    border-radius: 2px;
    background-color: saddlebrown;
  }
</style>
