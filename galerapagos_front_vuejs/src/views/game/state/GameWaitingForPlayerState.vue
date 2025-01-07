<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'GameWatingForPlayerState',

    setup() {
      return {
        loading: true,
      };
    },
  });
</script>

<template>
  <div class="game-waiting-for-player-state">
    <div v-loading="loading" element-loading-text="Waiting for other players" />
  </div>
</template>

<style scoped>
  .game-waiting-for-player-state {
    height: 115px;
    align-content: center;
  }
</style>
