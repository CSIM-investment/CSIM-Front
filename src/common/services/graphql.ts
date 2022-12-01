import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'

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

export const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache,
  uri,
  defaultOptions: { mutate: { errorPolicy: 'all' } },
})
