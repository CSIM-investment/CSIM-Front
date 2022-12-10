import { email, helpers, minLength, required } from '@vuelidate/validators'
import type { BaseValidation } from '@vuelidate/core'

export function useVuelidateValidators() {
  const { t } = useI18n()

  function getValidatorMessage(field: BaseValidation): string {
    if (field.$dirty && field.$errors?.[0]?.$message)
      return field.$errors[0].$message.toString()

    return ''
  }

  const validators = {
    required: helpers.withMessage(t('validators.required'), required),
    email: helpers.withMessage(t('validators.email'), email),
    minLength: (length: number) => helpers.withMessage(
      t('validators.minLength', { length }),
      minLength(length),
    ),
  }

  return { getValidatorMessage, validations: validators }
}
