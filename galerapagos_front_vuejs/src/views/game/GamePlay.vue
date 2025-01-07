<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import GamePlayerList, { type Player } from './player/GamePlayerList.vue';
  import GameWaitingForPlayerState from './state/GameWaitingForPlayerState.vue';
  import GamePlayState, { GameWheater, type GameState } from './state/GamePlayState.vue';

  export type Game = {
    id: string;
    players: Player[];
    currentPlayer: string;
  };

  export default defineComponent({
    name: 'GamePlay',

    components: { GamePlayerList, GameWaitingForPlayerState, GamePlayState },

    props: {
      game: {
        type: Object as PropType<Game>,
        required: true,
      },
    },

    setup() {
      const gameState: GameState = {
        wheater: GameWheater.Rain,
        water: 10,
        fish: 4,
      };
      return { gameState };
    },
  });
</script>

<template>
  <div class="game-play">
    <div class="game-players">
      <game-player-list :players="game.players" :currentPlayer="game.currentPlayer" />
    </div>
    <div class="game-play-body">
      <div class="game-play-body-state">
        <!-- <game-waiting-for-player-state /> -->
        <game-play-state :state="gameState" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .game-play {
    width: 1000px;
    gap: 20px;
    display: flex;
    flex-direction: column;
  }
</style>
