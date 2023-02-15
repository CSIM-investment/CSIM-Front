import type { NormalizedCacheObject } from '@apollo/client/core'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createUploadLink } from 'apollo-upload-client'
import { type UserModule } from '~/types'

export const useApollo = () => {
  const apollo = inject<ApolloClient<NormalizedCacheObject>>(DefaultApolloClient)

  if (!apollo)
    throw new Error('Apollo client is not provided')

  return apollo
}

export const install: UserModule = ({ app }) => {
  const cache = new InMemoryCache({
    addTypename: true,
  })
  const uri = `${import.meta.env.VITE_GRAPHQL_URL}/graphql`

  const link = createUploadLink({
    uri,
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink.concat(link),
    cache,
    uri,
    defaultOptions: { mutate: { errorPolicy: 'all' } },
  })

  app.provide(DefaultApolloClient, apolloClient)
}
