<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import TheAvatar from '../../../components/avatar/TheAvatar.vue';
  import GamePlayerCards from './GamePlayerCards.vue';

  export type GamePlayer = {
    name: string;
    isActive: boolean;
    numberOfCards: number;
  };

  export default defineComponent({
    name: 'GamePlayerItem',

    components: { TheAvatar, GamePlayerCards },

    props: {
      player: {
        type: Object as PropType<GamePlayer>,
        required: true,
      },
    },

    setup(props) {
      return {};
    },
  });
</script>

<template>
  <div :class="`game-player${player.isActive ? '-active' : ''}`">
    <the-avatar />
    <div>
      {{ player.name }}
      <game-player-cards :numberOfCards="player.numberOfCards" />
    </div>
  </div>
</template>

<style scoped>
  .game-player,
  .game-player-active {
    background-color: #f0f0f0;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    column-gap: 10px;
  }

  .game-player-active {
    border: solid 1px brown;
  }

  .game-player-cards {
    display: flex;
    gap: 5px;
  }

  .game-player-card {
    height: 10px;
    width: 10px;
    background-color: saddlebrown;
  }
</style>
