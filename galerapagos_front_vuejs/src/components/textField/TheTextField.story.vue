<script lang="ts" setup>
  import TheTextField from './TheTextField.vue';
</script>

<template>
  <Story>
    <Variant title="intial case">
      <TheTextField label="Input field" model-value="input content" />
    </Variant>
    <Variant title="with error validation message">
      <TheTextField label="Input field" model-value="input content" error-message="error message" />
    </Variant>
  </Story>
</template>

<style scoped></style>
