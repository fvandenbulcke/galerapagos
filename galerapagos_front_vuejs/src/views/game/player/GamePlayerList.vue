<script lang="ts">
  import { computed, defineComponent, type PropType } from 'vue';
  import GamePlayerItem, { type GamePlayer } from './GamePlayerItem.vue';

  export type Player = {
    name: string;
    numberOfCards: number;
  };

  export default defineComponent({
    name: 'GamePlayerList',

    components: { GamePlayerItem },

    props: {
      players: {
        type: Array as PropType<Player[]>,
        required: true,
      },
      currentPlayer: {
        type: String,
        required: true,
      },
    },

    setup(props) {
      const gamePlayers = computed(() =>
        props.players.map((player): GamePlayer => {
          return {
            name: player.name,
            numberOfCards: player.numberOfCards,
            isActive: player.name === props.currentPlayer,
          };
        }),
      );

      return { gamePlayers };
    },
  });
</script>

<template>
  <div class="game-players">
    <game-player-item v-for="player in gamePlayers" :key="player.name" :player="player" />
  </div>
</template>

<style scoped>
  .game-players {
    display: flex;
    gap: 20px;
  }
</style>
