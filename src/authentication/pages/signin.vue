<script setup lang="ts">
import { ref } from 'vue';
import AuthLayout from '../organisms/AuthLayout.vue';
const { t } = useI18n();
const signInForm = ref({
  lastName: '',
  firstName: '',
  email: '',
  password: '',
  verifyPassword: '',
});

function onSignIn() {
  console.log(signInForm.value);
}
</script>
<template>
  <AuthLayout :title="t('signin.title')" :subtitle="t('signin.subtitle')">
    <form class="flex flex-col gap-8 items-center w-full" @submit.prevent="onSignIn">
      <InputText type="text" class="text-input" placeholder="Nom" v-model="signInForm.lastName" />
      <InputText
        type="text"
        class="text-input"
        placeholder="Prénom"
        v-model="signInForm.firstName"
      />
      <InputText type="text" class="text-input" placeholder="Email" v-model="signInForm.email" />
      <Password
        class="password-input"
        placeholder="Mot de passe"
        v-model="signInForm.password"
        toggleMask
        :feedback="false"
      />
      <Password
        class="password-input"
        placeholder="Retapez votre mot de passe"
        v-model="signInForm.verifyPassword"
        toggleMask
        :feedback="false"
      />
      <Button class="button mb-4" type="submit">S'inscrire</Button>
    </form>
    <p>
      Déja un compte ?
      <RouterLink to="/login" class="font-bold">Se connecter</RouterLink>
    </p>
  </AuthLayout>
</template>
