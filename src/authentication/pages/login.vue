<script setup lang="ts">
import { ref } from 'vue';
import AuthLayout from '../organisms/AuthLayout.vue';
const { t } = useI18n();
const loginForm = ref({
  email: '',
  password: '',
});

function onLogin(event: FormDataEvent) {
  console.log(loginForm.value);
}
</script>
<template>
  <AuthLayout :title="t('login.title')" :subtitle="t('login.subtitle')">
    <form class="flex flex-col items-center gap-8 w-full" @submit.prevent="onLogin">
      <InputText type="text" class="text-input" placeholder="Email" v-model="loginForm.email" />
      <Password
        class="password-input"
        placeholder="Password"
        v-model="loginForm.password"
        toggleMask
        :feedback="false"
      />
      <Button class="button w-2/3 mb-4" type="submit">Connexion</Button>
    </form>
    <p>
      Pas de compte ?
      <RouterLink to="/signin" class="font-bold">S'inscrire</RouterLink>
    </p>
  </AuthLayout>
</template>
