import firebase from 'firebase/compat'
import { VueFire, VueFireAuth } from 'vuefire'
import type { UserModule } from '~/types'
import initializeApp = firebase.initializeApp

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CREDENTIALS)
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export const install: UserModule = ({ app }) => {
  app
    .use(VueFire, {
      // imported above but could also just be created here
      firebaseApp,
      modules: [
        // we will see other modules later on
        VueFireAuth(),
      ],
    })
}
