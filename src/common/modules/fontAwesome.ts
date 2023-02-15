import { faBitcoinSign, faCaretUp, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, app }) => {
  if (isClient) {
    app.component('FontAwesomeIcon', FontAwesomeIcon)

    library.add(faUserSecret, faBitcoinSign, faCaretUp)
  }
}
