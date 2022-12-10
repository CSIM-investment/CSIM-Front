<script setup lang="ts">
import { ref } from 'vue'
import { useSessionStore } from '~/authentication/stores/session'
import { useLoginMutation } from '~/common/generated/graphql'
import { useGraphqlErrorHandler } from '~/common/composables/useGraphqlErrorHandler'

useHead({
  meta: [{ name: 'auth', content: 'App title' }],
})

const { t } = useI18n()
const { setSession, unverifiedEmail } = useSessionStore()
const router = useRouter()

const loginForm = ref({
  email: '',
  password: '',
})

const { mutate: login, loading } = useLoginMutation({})
const { handleErrors, catchErrors } = useGraphqlErrorHandler()

async function onLogin() {
  if (unverifiedEmail.value === loginForm.value.email)
    return await router.push('register/confirm')

  try {
    const { data, errors } = await login({
      loginUserInput: loginForm.value,
    })

    catchErrors(errors)

    setSession({
      user: data?.login.user,
      accessToken: data?.login.accessToken,
      refreshToken: data?.login.refreshToken,
    })

    await router.push('/')
  }
  catch (e) {
    handleErrors(e)
  }
}
</script>
<template>
  <AuthLayout :title="t('login.title')" :subtitle="t('login.subtitle')">
    <form class="flex flex-col items-center gap-8 w-full" @submit.prevent="onLogin">
      <InputText v-model="loginForm.email" type="text" class="text-input" placeholder="Email" />
      <Password
        v-model="loginForm.password"
        class="password-input"
        placeholder="Password"
        toggle-mask
        :feedback="false"
      />
      <Button class="button w-2/3 mb-4" type="submit" :loading="loading">
        Connexion
      </Button>
    </form>
    <p>
      Pas de compte ?
      <RouterLink to="/register" class="font-bold">
        S'inscrire
      </RouterLink>
    </p>
  </AuthLayout>
</template>
