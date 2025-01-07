<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TheImage',
    props: {
      name: {
        type: String,
        required: true,
      },
    },
  });
</script>

<template>
  <el-image :src="`/src/assets/images/${name}`" />
</template>

<style scoped></style>
