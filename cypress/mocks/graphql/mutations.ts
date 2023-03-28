import { fakeUser } from '../data/user'
import type { ConfirmEmailMutation } from '../../../src/common/generated/graphql'
import {
  type LoginMutation, type RegisterMutation,
  UserStatus,
} from '../../../src/common/generated/graphql'

export const Mutations: MockedMutation = {
  Login: {
    login: {
      user: fakeUser,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    },
  },
  Register: {
    register: {
      id: '1',
      status: UserStatus.IsPending,
    },
  },
  ConfirmEmail: {
    confirmEmail: {
      user: fakeUser,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    },
  },
}

export interface MockedMutation {
  Login: LoginMutation
  Register: RegisterMutation
  ConfirmEmail: ConfirmEmailMutation
}
