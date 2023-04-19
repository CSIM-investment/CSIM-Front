import { aliasRequest } from '../utils/graphql-test-utils'
import { cryptos } from '../mocks/data'

context('Landing', () => {
  beforeEach(() => {
    cy.interceptGql((req) => {
      aliasRequest(req, 'Query', 'GetCryptosList')
    })
  })

  it('should show me the list of cryptos on the landing page', () => {
    cy.mock('Query', 'GetCryptosList')

    cy.visit('/')

    const cryptoTable = cy.getByRole('table')

    const cryptosRows = cryptoTable.get('tbody tr')
    cryptosRows.should('have.length', 3)
    cryptosRows.each((rowElement, index) => {
      const crypto = cryptos[index]
      const cryptoRow = cy.wrap(rowElement)

      cryptoRow.should('contain', crypto.name)
      cryptoRow.should('contain', crypto.current_price)
    })
  })
})
