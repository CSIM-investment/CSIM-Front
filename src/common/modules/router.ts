import { type UserModule } from '~/types'

interface RouteMeta {
  auth: boolean
}

export const routesMetas: Record<string, RouteMeta> = {
  login: {
    auth: false,
  },
  register: {
    auth: false,
  },
}

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    const accessToken = localStorage.getItem('accessToken')
    router.beforeEach((to, from, next) => {
      switch (true) {
        case to.meta.auth === false && !!accessToken:
          next('/')
          break
        case to.meta.auth === true && !accessToken:
          next('login')
          break
        default:
          next()
      }
    })
  }
}