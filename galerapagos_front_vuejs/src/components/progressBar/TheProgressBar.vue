<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TheProgressBar',

    props: {
      progressValue: {
        type: Number,
        required: true,
      },
      maxValue: {
        type: Number,
        required: true,
      },
    },
  });
</script>

<template>
  <el-progress :percentage="(progressValue * 100) / maxValue">
    {{ progressValue }}/{{ maxValue }}
  </el-progress>
</template>

<style scoped></style>
