import { type MockedQuery, Queries } from './queries'
import { type MockedMutation, Mutations } from './mutations'

type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
}

export interface MockedSchema {
  Query: DeepNullable<MockedQuery>
  Mutation: DeepNullable<MockedMutation>
}

export type OperationType = 'Query' | 'Mutation'
export type OperationName<X extends OperationType> = keyof MockedSchema[X]

export const mockedSchema: MockedSchema = {
  Mutation: Mutations,
  Query: Queries,
}
