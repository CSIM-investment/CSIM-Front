import { GraphQLError } from 'graphql'
import _ from 'lodash'

import type { CyHttpMessages } from 'cypress/types/net-stubbing'
import type {
  MockedSchema,
  OperationName,
  OperationType,
} from '../mocks/graphql/schema'
import { mockedSchema } from '../mocks/graphql/schema'
import { aliasRequest, mockRequest } from '../utils/graphql-test-utils'

const backendEndpoint = Cypress.env('backendUrl')

Cypress.Commands.add('interceptGql', (callback: (req: CyHttpMessages.IncomingHttpRequest) => void) => {
  return cy.intercept('POST', backendEndpoint, (req) => {
    callback(req)
  })
})

Cypress.Commands.add(
  'mock',
  <Type extends OperationType, Name extends OperationName<Type>>(
    operationType: Type,
    operationName: Name,
    mock?: DeepPartial<MockedSchema[Type][Name]>,
  ) =>
    cy.intercept('POST', backendEndpoint, (req) => {
      aliasRequest(req, operationType, operationName)

      mockRequest(
        req,
        operationType,
        operationName,
        _.merge(mockedSchema[operationType][operationName], mock),
      )
    }))

Cypress.Commands.add('mockError', <Type extends OperationType, Name extends OperationName<Type>>(
  operationType: Type,
  operationName: Name,
  errorMessage: string,
) =>
    cy.intercept('POST', backendEndpoint, (req) => {
      aliasRequest(req, operationType, operationName)
      mockRequest(req, operationType, operationName, new GraphQLError(errorMessage))
    }),
)
