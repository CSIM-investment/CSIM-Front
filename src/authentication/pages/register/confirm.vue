<script setup lang="ts">
import CodeInput from '~/authentication/components/organisms/CodeInput.vue'
import { useConfirmEmailMutation } from '~/common/generated/graphql'
import { useGraphqlErrorHandler } from '~/common/composables/useGraphqlErrorHandler'
import { useSessionStore } from '~/authentication/stores/session'

const { t } = useI18n()
const router = useRouter()
const { unverifiedEmail, setSession } = useSessionStore()
const { mutate: confirmEmailMutation, loading } = useConfirmEmailMutation({})
const { handleErrors, catchErrors } = useGraphqlErrorHandler()

const emailCode = ref('')

async function onVerifyCode() {
  if (isNaN(+emailCode.value))
    return

  try {
    const { data, errors } = await confirmEmailMutation({
      emailCode: +emailCode.value,
      email: unverifiedEmail.value,
    })
    catchErrors(errors)

    unverifiedEmail.value = undefined
    setSession({
      refreshToken: data.confirmEmail.refreshToken,
      accessToken: data.confirmEmail.accessToken,
      user: data.confirmEmail.user,
    })
    router.push('/')
  }
  catch (e) {
    emailCode.value = ''
    handleErrors(e)
  }
}
</script>

<template>
  <AuthLayout :title="t('confirm.title')" :subtitle="t('confirm.subtitle')">
    <form class="flex flex-col gap-8 items-center w-full" @submit.prevent="onVerifyCode">
      <CodeInput v-model="emailCode" />

      <Button class="button mb-4" type="submit" :loading="!!loading">
        {{ t('confirm.submit') }}
      </Button>
    </form>
  </AuthLayout>
</template>
