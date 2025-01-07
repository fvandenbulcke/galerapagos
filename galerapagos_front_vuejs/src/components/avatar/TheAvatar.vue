<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TheAvatar',

    setup() {
      const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
      return { circleUrl };
    },
  });
</script>

<template>
  <el-avatar :size="50" :src="circleUrl" />
</template>

<style scoped></style>
