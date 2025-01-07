<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import TheFormField, { formFieldProps } from '../form-field/TheFormField.vue';

  export default defineComponent({
    name: 'TheTextField',
    components: { TheFormField },

    emits: ['update:modelValue'],

    props: {
      ...formFieldProps,
      modelValue: {
        type: String,
        required: true,
      },
    },

    setup(props, { emit }) {
      const input = computed({
        get() {
          return props.modelValue;
        },
        set(newValue) {
          emit('update:modelValue', newValue);
        },
      });
      return {
        input,
      };
    },
  });
</script>

<template>
  <TheFormField :label="label" :required="required" :error-message="errorMessage">
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
  </TheFormField>
</template>

<style scoped></style>
