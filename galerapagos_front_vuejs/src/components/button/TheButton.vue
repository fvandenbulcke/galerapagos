<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TheButton',

    emits: ['click'],

    props: {
      label: {
        type: String,
        required: true,
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    setup() {
      return {
        onClick: () => {
          console.log(' onClick ');
        },
      };
    },
  });
</script>

<template>
  <el-button type="primary" :disabled="disabled" @click="$emit('click')">{{ label }}</el-button>
</template>

<style scoped></style>
