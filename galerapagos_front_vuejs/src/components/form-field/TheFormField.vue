<template>
  <el-form-item label-position="top" :label="label" :required="required" :error="errorMessage">
    <slot />
  </el-form-item>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export const formFieldProps = {
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },
  };

  export default defineComponent({
    name: 'TheFormField',
    props: formFieldProps,
  });
</script>

<style scoped>
  .the-form-field-message {
    margin: 0;
    color: red;
  }
</style>
