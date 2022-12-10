import { ref } from 'vue'

import {
  AccountDocument,

} from '~/common/generated/graphql'

import type { User as GqlUser } from '~/common/generated/graphql'
import { apolloClient } from '~/common/services/graphql'

export type User = Partial<GqlUser>

interface Session {
  user: User
  accessToken: string
  refreshToken: string
  unverifiedEmail?: string
}

export const useSessionStore = createGlobalState(
  () => {
    const user = ref<User | undefined>()
    const accessToken = useStorage<Session['accessToken']>('accessToken', '')
    const refreshToken = useStorage<Session['refreshToken']>('refreshToken', '')
    const unverifiedEmail = useStorage<Session['unverifiedEmail']>('unverifiedEmail', '')

    async function fetchSession(): Promise<void> {
      if (accessToken.value) {
        try {
          const accountData = await apolloClient.query({
            query: AccountDocument,
          })

          user.value = accountData.data.account
        }
        catch (e) {
          accessToken.value = ''
        }
      }
    }

    function setSession(session: Session) {
      user.value = session.user
      accessToken.value = session.accessToken
      refreshToken.value = session.refreshToken
    }

    return { user, accessToken, refreshToken, unverifiedEmail, fetchSession, setSession }
  },
)
