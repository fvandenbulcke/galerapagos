<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import GamePlayerList from './player/GamePlayerList.vue';
  import GameWaitingForPlayerState from './state/GameWaitingForPlayerState.vue';
  import GameReadyToStartState from './state/GameReadyToStartState.vue';
  import GamePlayState from './state/GamePlayState.vue';
  import type { Game } from '../../application/state/types';
  import useGameStateManager from '@/application/state/game.state.manager';

  export default defineComponent({
    name: 'GamePlay',

    components: { GamePlayerList, GameWaitingForPlayerState, GameReadyToStartState, GamePlayState },

    props: {
      game: {
        type: Object as PropType<Game>,
        required: true,
      },
    },

    setup() {
      const {} = useGameStateManager();
      return {};
    },
  });
</script>

<template>
  <div class="game-play">
    <div class="game-players">
      <game-player-list :players="game.players" />
    </div>
    <div class="game-play-body">
      <div class="game-play-body-state">
        <game-play-state v-if="game.state" :state="game.state" />
        <game-ready-to-start-state v-else-if="game.canBeStarted" />
        <game-waiting-for-player-state v-else />
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
