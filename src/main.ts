import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './common/assets/styles/style.scss'
import { createUploadLink } from 'apollo-upload-client'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import './common/assets/styles/tailwindPrimevue.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import { faBitcoinSign, faCaretUp, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

const routes = setupLayouts(generatedRoutes)
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
library.add(faUserSecret, faBitcoinSign, faCaretUp)
export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, (ctx) => {
  ctx.app.provide(DefaultApolloClient, apolloClient)
  ctx.app.component('font-awesome-icon', FontAwesomeIcon)
  ctx.app.use(createPinia())
  ctx.app.use(PrimeVue)
  // install all modules under `modules/`
  Object.values(import.meta.globEager('./common/modules/*.ts')).forEach(i => i.install?.(ctx))
})
