<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import RaftProgress from './RaftProgress.vue';

  export enum GameWheater {
    Sun,
    Rain,
  }

  export type GameState = {
    wheater: GameWheater;
    water: number;
    fish: number;
  };

  export default defineComponent({
    name: 'GamePlayState',

    components: { RaftProgress },

    props: {
      state: {
        type: Object as PropType<GameState>,
        required: true,
      },
    },

    setup() {
      return {
        GameWheater,
      };
    },
  });
</script>

<template>
  <div class="game-play-state">
    <div class="game-play-state-resourses">
      <span class="game-play-state-resourses-type">Wheater:</span>
      <span>{{ Object.values(GameWheater)[state.wheater] }}</span>
      <span class="game-play-state-resourses-type">Water:</span>
      <span>{{ state.water }}</span>
      <span class="game-play-state-resourses-type">Fish:</span>
      <span>{{ state.fish }}</span>
    </div>
    <div class="game-play-state-raft">
      <raft-progress />
    </div>
  </div>
</template>

<style scoped>
  .game-play-state {
    display: flex;
  }
  .game-play-state-resourses {
    display: grid;
    grid-template-rows: repeat(3, 25px);
    grid-template-columns: auto 100px;
    column-gap: 10px;
  }

  .game-play-state-resourses-type {
    font-weight: bold;
  }

  .game-play-state-raft {
    width: 200px;
  }
</style>
