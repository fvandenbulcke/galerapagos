<script setup lang="ts">
  import RegisterView from './register/RegisterView.vue';
  import GameList from './gameList/GameList.vue';
  import GamePlay from './game/GamePlay.vue';
  import { number } from 'yup';

  const games = [
    { id: '23456789', players: ['Alice', 'Bob', 'Charlie'] },
    { id: '12345678', players: ['David', 'Eve', 'Frank'] },
    { id: '34567890', players: ['Grace', 'Heidi', 'Ivan'] },
    { id: '45678901', players: ['Judy', 'Kevin', 'Liam'] },
    { id: '56789012', players: ['Mia', 'Nina', 'Oliver'] },
  ];

  const game = {
    id: '23456789',
    players: [
      { name: 'Alice', numberOfCards: 1 },
      { name: 'Bob', numberOfCards: 2 },
      { name: 'Charlie', numberOfCards: 3 },
    ],
    currentPlayer: 'Alice',
  };
</script>

<template>
  <main>
    <game-play :game="game" />
    <!-- <register-view /> -->
    <!-- <game-list :games="games" /> -->
    <!-- <game-play :game="game" /> -->
  </main>
</template>
