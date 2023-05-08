<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { useSessionStore } from '~/authentication/stores/session'
import { useLoginMutation } from '~/common/generated/graphql'
import { useGraphqlErrorHandler } from '~/common/composables/useGraphqlErrorHandler'
import { useVuelidateValidators } from '~/common/composables/useVuelidateValidators'

useHead({
  meta: [{ name: 'auth', content: 'App title' }],
})

const { t } = useI18n()
const { setSession, unverifiedEmail } = useSessionStore()
const router = useRouter()
const { validations } = useVuelidateValidators()
const { mutate: login, loading } = useLoginMutation({})
const { handleErrors, catchErrors } = useGraphqlErrorHandler()

const loginState = reactive({
  email: '',
  password: '',
})

const rules = {
  email: {
    email: validations.email,
    required: validations.required,
  },
  password: {
    required: validations.required,
  },
}

const loginForm = useVuelidate(rules, loginState)

async function onLogin() {
  if (unverifiedEmail.value && unverifiedEmail.value === loginState.email)
    return await router.push('register/confirm')

  try {
    const { data, errors } = await login({
      loginUserInput: loginState,
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
      <TextInput  aria-label="Password" v-model="loginState.email" placeholder="Email" />
      <PasswordInput
          aria-label="Password"
          v-model="loginState.password"
        placeholder="Password"
      />
      <Button class="button w-2/3 mb-4" type="submit" :loading="!!loading" :disabled="loginForm.$invalid" :label="t('login.action')" />
    </form>
    <p>
      {{ t('register.placeholders.registerRedirection.wording') }}
      <RouterLink to="/register" class="font-bold">
        {{ t('register.placeholders.registerRedirection.link') }}
      </RouterLink>
    </p>
  </AuthLayout>
</template>

<route lang="yaml">
meta:
  auth: false
</route>
