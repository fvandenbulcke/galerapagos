<script lang="ts">
  import { defineComponent } from 'vue';
  import TheImage from '@/components/images/TheImage.vue';
  import TheProgressBar from '@/components/progressBar/TheProgressBar.vue';

  export default defineComponent({
    name: 'RaftProgress',

    components: { TheImage, TheProgressBar },
  });
</script>

<template>
  <div>
    <the-image class="game-play-raft" name="raft.jpg" />
    <the-progress-bar :progressValue="1" :maxValue="3" />
    <the-progress-bar :progressValue="2" :maxValue="5" />
  </div>
</template>

<style scoped></style>
