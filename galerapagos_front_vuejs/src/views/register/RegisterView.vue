<script lang="ts">
  import { defineComponent } from 'vue';

  import TheButton from '../../components/button/TheButton.vue';
  import TheTextField from '../../components/textField/TheTextField.vue';
  import {
    buildFieldValidation,
    buildFormValidation,
    FieldType,
    type FormValidation,
  } from '../../infrastructure/validation.composable';

  export default defineComponent({
    name: 'RegisterView',

    components: { TheButton, TheTextField },

    setup() {
      const formRules = {
        userLogin: {
          type: FieldType.STRING,
          isRequired: true,
        },
      } as FormValidation;

      const { handleSubmit } = buildFormValidation(formRules);
      const { value: userLogin, errorMessage } = buildFieldValidation('userLogin');

      const onLogin = handleSubmit(
        (values) => {
          console.log(values);
        },
        (ctx) => {
          console.log('values.userLogin');
          console.error('ctx', ctx.values);
        },
      );

      return {
        formRules,
        onLogin,
        userLogin: userLogin as unknown as string,
        errorMessage,
      };
    },
  });
</script>

<template>
  <div>
    <TheTextField
      v-model="userLogin"
      label="Input name"
      :required="formRules.userLogin.isRequired"
      :error-message="errorMessage"
    />
    <TheButton label="login" @click="onLogin" />
  </div>
</template>

<style scoped></style>
