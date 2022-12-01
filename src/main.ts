import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { faBitcoinSign, faCaretUp, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import App from './App.vue'
import { apolloClient } from '~/common/services/graphql'

import './common/assets/styles/style.scss'
import './common/assets/styles/tailwindPrimevue.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, (ctx) => {
  ctx.app.provide(DefaultApolloClient, apolloClient)
  ctx.app.component('font-awesome-icon', FontAwesomeIcon)
  ctx.app.use(createPinia())
  ctx.app.use(PrimeVue)
  library.add(faUserSecret, faBitcoinSign, faCaretUp)
  // install all modules under `modules/`
  Object.values(import.meta.globEager('./common/modules/*.ts')).forEach(i => i.install?.(ctx))
})
