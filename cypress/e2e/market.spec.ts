import { aliasRequest } from '../utils/graphql-test-utils'
import { cryptos, detailedCrypto } from '../mocks/data'

context('Market', () => {
  beforeEach(() => {
    cy.interceptGql((req) => {
      aliasRequest(req, 'Query', 'GetCryptosList')
      aliasRequest(req, 'Query', 'GetCrypto')
    })
  })

  it('test that all news contains correct information', () => {
    cy.mock('Query', 'GetCryptosList')
    cy.visit('/market')

    cy.wait('@gqlGetCryptosListQuery').its('response.statusCode').should('eq', 200)

    const cryptosRows = cy.getByRole('table').get('tbody tr')

    cryptosRows.each((row, index) => {
      const rowElement = cy.wrap(row)
      const crypto = cryptos[index]

      rowElement.should('contain', crypto.name)
      rowElement.should('contain', crypto.symbol)
      rowElement.should('contain', crypto.current_price)
    })
  })

  it('test that the crypto details page content is correct', () => {
    cy.mock('Query', 'GetCrypto')

    cy.visit('/cryptos/BTC')

    cy.getByAria('Crypto name').should('contain', detailedCrypto.name)
    cy.get(`[alt='${detailedCrypto.name} logo']`).invoke('attr', 'src').should('eq', detailedCrypto.image)
    cy.getByAria('Current price').should('contain', detailedCrypto.current_price)
    cy.getByAria('Change percentage 24h').should('contain', detailedCrypto.market_cap_change_percentage_24h)
    cy.getByAria('Market cap').should('contain', detailedCrypto.market_cap)
    cy.getByAria('Total volume').should('contain', detailedCrypto.total_volume)
    cy.getByAria('High 24h').should('contain', detailedCrypto.high_24h)
    cy.getByAria('Circulating supply').should('contain', detailedCrypto.circulating_supply)
  })

  it.skip('test that the crypto convertor works', () => {
    cy.mock('Query', 'GetCrypto')
    cy.intercept('GET', 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=daily', (req) => {
      req.reply({
        body: {
          prices: [
            [1610000000000, 10],
          ],
        },
      })
    })

    cy.visit('/cryptos/BTC')

    const cryptoConvertor = cy.getByAria('Crypto convertor')
    cryptoConvertor.getByAria('BTC input').type('0')
    cryptoConvertor.getByAria('USD input').should('have.value', '100')
  })
})
