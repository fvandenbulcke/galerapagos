<script lang="ts">
  import { defineComponent, onMounted, ref, type PropType, type Ref } from 'vue';
  import TheImage from '../../components/images/TheImage.vue';

  export type Game = {
    id: string;
    players: string[];
    currentPlayer: string;
  };

  export default defineComponent({
    name: 'GamePlay',

    components: { TheImage },

    props: {
      game: {
        type: Object as PropType<Game>,
        required: true,
      },
    },

    setup() {
      const raft: Ref<HTMLCanvasElement | undefined> = ref();
      const context: Ref<CanvasRenderingContext2D | undefined> = ref();

      onMounted(() => {
        context.value = raft.value?.getContext('2d') || undefined;

        if (raft.value) {
          raft.value.height =
            raft.value.height * (raft.value.clientWidth / raft.value.clientHeight);
        }

        if (context.value) {
          context.value.beginPath();
          context.value.arc(20, 20, 20, 0, 2 * Math.PI);
          context.value.stroke();
          //context.value.fillText('jelledev.com', 50, 50);
        }
      });

      return { raft };
    },
  });
</script>

<template>
  Game
  <div class="game-play-raft-container">
    <canvas class="game-play-canvas" id="raft" ref="raft" />
    <!-- <the-image class="game-play-raft" name="raft.jpg" /> -->
  </div>
</template>

<style scoped>
  .game-play-raft-container {
    position: relative;
    height: 500px;
    width: 500px;
    border: solid red 1px;
    display: inline-flex;
    padding: 50px;
  }
  .game-play-raft {
    border: solid blue 1px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
  }
  .game-play-canvas {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
</style>
