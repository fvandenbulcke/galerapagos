<script lang="ts">
  import { defineComponent } from 'vue';

  import TheButton from '../../components/button/TheButton.vue';
  import TheTextField from '../../components/textField/TheTextField.vue';
  import {
    buildFieldValidation,
    buildFormValidation,
    FieldType,
    type FormValidation,
  } from '../../application/infrastructure/validation.composable';
  import useGameStateManager from '@/application/state/game.state.manager';

  export default defineComponent({
    name: 'RegisterView',

    components: { TheButton, TheTextField },

    setup() {
      const { login } = useGameStateManager();

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
          login(values.userLogin!);
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
