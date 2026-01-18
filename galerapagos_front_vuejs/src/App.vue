<script setup lang="ts">
  import { onMounted } from 'vue';

  import RegisterView from './views/register/RegisterView.vue';
  import GameList from './views/gameList/GameList.vue';
  import GamePlay from './views/game/GamePlay.vue';
  import useGameStateManager from './application/state/game.state.manager';

  const { player, game, login } = useGameStateManager();

  onMounted(() => {
    login().catch(() => {
      console.error('❌ The user has to login');
    });
  });
</script>

<template>
  <main>
    <register-view v-if="!player" />
    <game-list v-else-if="!game" />
    <game-play v-else :game="game" />
  </main>
</template>
