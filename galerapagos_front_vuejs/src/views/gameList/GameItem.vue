<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import TheButton from '../../components/button/TheButton.vue';
  import TheLinkAction from '../../components/link/TheLinkAction.vue';

  export default defineComponent({
    name: 'GameItem',

    components: { TheButton, TheLinkAction },

    emits: ['join', 'displayPlayerDetails'],

    props: {
      id: {
        type: String,
        required: true,
      },
      players: {
        type: Array as PropType<string[]>,
        required: true,
      },
    },
  });
</script>

<template>
  <div class="game-item">
    <div>Game {{ id }}</div>
    <div class="game-players">
      <ul>
        <li v-for="player in players" :key="player">
          <the-link-action :label="player" @click="() => $emit('displayPlayerDetails')" />
        </li>
      </ul>
    </div>
    <div class="game-item-action">
      <the-button label="join game" @click="() => $emit('join')" />
    </div>
  </div>
</template>

<style scoped>
  .game-item {
    border: solid 1px black;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 8px;
    min-width: 250px;
  }

  .game-item-action {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .game-players {
    ul {
      padding-inline-start: 20px;
    }

    li {
      list-style: none;
    }
  }
</style>
