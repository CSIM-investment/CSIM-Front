import type { CyHttpMessages } from 'cypress/types/net-stubbing'
import { GraphQLError } from 'graphql'
import type { MockedSchema, OperationName, OperationType } from '../mocks/graphql/schema'

export const hasOperationName = (request: CyHttpMessages.IncomingHttpRequest, operationName: string) => {
  const { body } = request

  return body.operationName === operationName
}

export const aliasRequest = <Type extends OperationType, Name extends OperationName<Type>>(
  request: CyHttpMessages.IncomingHttpRequest,
  operationType: Type,
  operationName: Name,
) => {
  if (hasOperationName(request, String(operationName)))
    request.alias = `gql${String(operationName)}${operationType}`
}

export const mockRequest = <Type extends OperationType, Name extends OperationName<Type>>(
  req: CyHttpMessages.IncomingHttpRequest,
  operationType: Type,
  operationName: Name,
  mock: MockedSchema[Type][Name] | GraphQLError,
) => {
  if (hasOperationName(req, operationName as string)) {
    req.alias = `gql${String(operationName)}${operationType}`

    if (mock instanceof GraphQLError) {
      req.reply({
        body: {
          errors: [mock],
        },
      })
    }
    else {
      req.reply({
        body: {
          data: mock,
        },
      })
    }
  }
}
