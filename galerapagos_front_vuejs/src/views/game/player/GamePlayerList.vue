<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import GamePlayerItem from './GamePlayerItem.vue';
  import type { GamePlayer } from '../../../application/state/types';

  export default defineComponent({
    name: 'GamePlayerList',

    components: { GamePlayerItem },

    props: {
      players: {
        type: Array as PropType<GamePlayer[]>,
        required: true,
      },
    },
  });
</script>

<template>
  <div class="game-players">
    <game-player-item v-for="player in players" :key="player.name" :player="player" />
  </div>
</template>

<style scoped>
  .game-players {
    display: flex;
    gap: 20px;
  }
</style>
