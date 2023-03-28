import './commands'
import './mock-commands'
import { aliasRequest } from '../utils/graphql-test-utils'

beforeEach(() => {
  cy.intercept('POST', 'http://localhost:3002/graphql', (req) => {
    aliasRequest(req, 'Query', 'Account')
  })
})
