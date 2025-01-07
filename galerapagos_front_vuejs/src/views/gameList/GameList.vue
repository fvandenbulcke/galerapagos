<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import GameItem from './GameItem.vue';

  export type Game = {
    id: string;
    players: string[];
  };

  export default defineComponent({
    name: 'GameList',

    components: { GameItem },

    props: {
      games: {
        type: Array as PropType<Game[]>,
        required: true,
      },
    },
  });
</script>

<template>
  <div class="game-list-container">
    <div class="game-list">
      <game-item v-for="game in games" :key="game.id" :id="game.id" :players="game.players" />
    </div>
  </div>
</template>

<style scoped>
  .game-list-container {
    container-name: game-list-container;
    container-type: inline-size;
    display: flex;
    justify-content: center;
  }

  .game-list {
    display: grid;
    gap: 10px;
  }

  @container game-list-container (inline-size <= 700px) {
    .game-list {
      grid-template-columns: repeat(2, 250px);
    }
  }

  @container game-list-container (inline-size > 700px) {
    .game-list {
      grid-template-columns: repeat(3, 250px);
    }
  }

  @container game-list-container (inline-size > 900px) {
    .game-list {
      grid-template-columns: repeat(4, 250px);
    }
  }
</style>
