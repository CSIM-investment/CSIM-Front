import type { MockedSchema, OperationName, OperationType } from 'cypress/mocks/graphql/schema'
import type { CyHttpMessages } from 'cypress/types/net-stubbing'

declare global {
  type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>
  } : T

  declare namespace Cypress {
    interface Chainable {
      getByAria(label: string): Chainable

      getByDataTest(label: string): Chainable

      getByInputName(inputName: string): Chainable

      getByRole(roleName: string): Chainable

      interceptGql(callback: (req: CyHttpMessages.IncomingHttpRequest) => void): Chainable
      mock<Type extends OperationType, Name extends OperationName<Type>>(
        operationType: Type,
        operationName: Name,
        mock?: DeepPartial<MockedSchema[Type][Name]>,
      ): Chainable

      mockError<Type extends OperationType, Name extends OperationName<Type>>(
        operationType: Type,
        operationName: Name,
        errorMessage: string,
      ): Chainable
    }
  }
}
