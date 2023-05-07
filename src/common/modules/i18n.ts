import moment from 'moment-with-locales-es6'
import { createI18n } from 'vue-i18n'
import { type UserModule } from '~/types'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const messages = Object.fromEntries(
  Object.entries(
    import.meta.globEager('../../../locales/*.y(a)?ml'))
    .map(([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(17, yaml ? -5 : -4), value.default]
    }),
)

export const install: UserModule = ({ app }) => {
  const lang = localStorage.getItem('lang') ?? 'en'

  const i18n = createI18n({
    legacy: false,
    locale: lang,
    messages,
  })

  moment.locale(lang)

  app.use(i18n)
}
