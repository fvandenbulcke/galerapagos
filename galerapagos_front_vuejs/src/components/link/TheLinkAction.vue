<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TheLinkAction',

    emits: ['click'],

    props: {
      label: {
        type: String,
        required: true,
      },
    },
  });
</script>

<template>
  <el-button link type="primary" @click="$emit('click')">{{ label }}</el-button>
</template>

<style scoped></style>
