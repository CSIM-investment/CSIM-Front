import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createPinia } from 'pinia'
import App from './App.vue'

import './common/assets/styles/style.scss'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, (ctx) => {
  ctx.app.use(createPinia())
  // install all modules under `modules/`
  Object.values(import.meta.globEager('./common/modules/*.ts')).forEach(i => i.install?.(ctx))
})
