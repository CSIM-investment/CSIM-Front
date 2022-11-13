import { useToast } from 'primevue/usetoast'
import type { GraphQLErrors } from '@apollo/client/errors'

export function useGraphqlErrorHandler() {
  const toast = useToast()

  function catchErrors(errors: GraphQLErrors) {
    if (!errors || errors.length === 0)
      return

    const errorsList: string[] = []

    errors.forEach((error) => {
      if (error.extensions?.code === 'BAD_USER_INPUT') {
        error.extensions.response.message.forEach((validationError: string) => {
          errorsList.push(validationError)
        })
      }
      else {
        errorsList.push(error.message)
      }
    })

    throw errorsList?.map(error => new Error(error))
  }

  function handleErrors(errors: unknown) {
    toast.removeAllGroups()

    if (errors instanceof Array<string>) {
      errors.forEach(error => toast.add({ detail: error, severity: 'error' }),
      )
    }
  }

  return { catchErrors, handleErrors }
}
