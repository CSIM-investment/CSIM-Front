<script setup lang="ts">
import { ref } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import { useRegisterMutation } from '~/common/generated/graphql'
import { useGraphqlErrorHandler } from '~/common/composables/useGraphqlErrorHandler'
import { useVuelidateValidators } from '~/common/composables/useVuelidateValidators'
import { useSessionStore } from '~/authentication/stores/session'

const { t } = useI18n()
const router = useRouter()
const { unverifiedEmail } = useSessionStore()
const { getValidatorMessage, validations } = useVuelidateValidators()
const { catchErrors, handleErrors } = useGraphqlErrorHandler()

enum RegisterStep {
  Infos,
  Password,
}

interface RegisterForm {
  email: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  confirmTerms: boolean
}

const registerState = reactive<RegisterForm>({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  confirmTerms: false,
})

const rules = {
  email: {
    email: validations.email,
    required: validations.required,
  },
  firstName: {
    required: validations.required,
  },
  lastName: {
    required: validations.required,
  },
  password: {
    minLength: validations.minLength(10),
    required: validations.required,
  },
  confirmPassword: {
    sameAsPassword: helpers.withMessage(
      t('validators.sameAsPassword'),
      (value: string) => value === registerState.password,
    ),
  },
}

const $validation = useVuelidate(rules, registerState)

const currentFormStep = ref<RegisterStep>(RegisterStep.Infos)

const { mutate: register, loading: isRegistering } = useRegisterMutation({})

const areInfosInvalid = computed(
  () => ['email', 'firstName', 'lastName'].some(field => $validation.value[field].$invalid),
)

async function onRegister() {
  await $validation.value.$validate()

  if (areInfosInvalid.value)
    return

  if (currentFormStep.value === RegisterStep.Infos)
    return currentFormStep.value = RegisterStep.Password

  const { confirmPassword, confirmTerms, ...userInput } = registerState

  try {
    const { errors } = await register({ createUserInput: userInput })
    catchErrors(errors)

    unverifiedEmail.value = userInput.email
    await router.push('register/confirm')
  }
  catch (error: unknown) {
    currentFormStep.value = RegisterStep.Infos
    handleErrors(error)
  }
}

</script>
<template>
  <AuthLayout :title="t('register.title')" :subtitle="t('register.subtitle')">
    <form class="flex flex-col items-center w-full" @submit.prevent="onRegister">
      <div v-if="currentFormStep === RegisterStep.Infos" class="flex flex-col items-center gap-2 w-2/3">
        <TextInput
          v-model="registerState.lastName"
          :placeholder="t('register.placeholders.lastName')"
          :error-message="getValidatorMessage($validation.lastName)"
        />
        <TextInput
          v-model="registerState.firstName"
          :placeholder="t('register.placeholders.firstName')"
          :error-message="getValidatorMessage($validation.firstName)"
        />

        <TextInput
          v-model="registerState.email"
          :placeholder="t('register.placeholders.email')"
          :error-message="getValidatorMessage($validation.email)"
        />
      </div>
      <div v-else class="flex flex-col items-center w-2/3 gap-2 pb-8">
        <PasswordInput
          v-model="registerState.password"
          :placeholder="t('register.placeholders.password')"
          :error-message="getValidatorMessage($validation.password)"
        />
        <PasswordInput
          v-model="registerState.confirmPassword"
          :placeholder="t('register.placeholders.confirmPassword')"
          :error-message="getValidatorMessage($validation.confirmPassword)"
        />
        <div class="field-checkbox">
          <Checkbox input-id="binary" class="mr-4" v-model="registerState.confirmTerms" :binary="true" />
          <i18n-t keypath="register.terms.label" tag="label">
            <template #termsLink>
              <RouterLink to="/terms" class="text-primary underline">
                {{ t('register.terms.termsLink') }}
              </RouterLink>
            </template>
            <template #privacyLink>
              <RouterLink to="/privacy" class="text-primary underline">
                {{ t('register.terms.privacyLink') }}
              </RouterLink>
            </template>
          </i18n-t>
        </div>
      </div>

      <Button
        v-if="currentFormStep === RegisterStep.Infos"
        class="button mb-4 w-2/3"
        type="submit"
        :disabled="areInfosInvalid"
        :label="t('register.next')"
      />
      <div v-else class="flex flex-wrap content-between w-full">
        <Button
          :label="t('register.back')"
          class="p-button-text"
          icon="pi pi-arrow-left"
          @click="currentFormStep = RegisterStep.Infos"
        />
        <Button
          class="button mb-4 ml-auto"
          type="submit"
          :disabled="$validation.$invalid"
          :loading="!!isRegistering"
          :label="t('register.submit')"
        />
      </div>
    </form>
    <p>
      {{ t('register.loginRedirection.wording') }}
      <RouterLink to="/login" class="font-bold">
        {{ t('register.loginRedirection.link') }}
      </RouterLink>
    </p>
  </AuthLayout>
</template>

<route lang="yaml">
meta:
  auth: false
</route>
