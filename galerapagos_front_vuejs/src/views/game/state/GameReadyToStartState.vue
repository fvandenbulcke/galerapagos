<script lang="ts">
  import { defineComponent } from 'vue';
  import TheButton from '../../../components/button/TheButton.vue';
  import useGameStateManager from '../../../application/state/game.state.manager';

  export default defineComponent({
    name: 'GameReadyToStartState',

    components: { TheButton },

    setup() {
      const { startGame } = useGameStateManager();
      return {
        startGame,
      };
    },
  });
</script>

<template>
  <div class="game-ready-to-start-state">
    <TheButton label="start game" @click="startGame" />
  </div>
</template>

<style scoped>
  .game-ready-to-start-state {
    height: 115px;
    align-content: center;
  }
</style>
