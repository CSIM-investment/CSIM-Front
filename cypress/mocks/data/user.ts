import { faker } from '@faker-js/faker'
import type { LoginMutation } from '../../../src/common/generated/graphql'
import { UserRoles, UserStatus } from '../../../src/common/generated/graphql'

export const fakeUser: LoginMutation['login']['user'] = {
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  id: faker.datatype.uuid(),
  role: UserRoles.User,
  status: UserStatus.IsActive,
  favoritesCrypto: [],
}
