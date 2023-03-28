import moment from 'moment'
import { aliasRequest } from '../utils/graphql-test-utils'
import { fakeArticles } from '../mocks/data'

context('News', () => {
  beforeEach(() => {
    cy.interceptGql((req) => {
      aliasRequest(req, 'Query', 'GetArticles')
    })
  })

  it('test that all news contains correct information', () => {
    const articles = fakeArticles()
    cy.mock('Query', 'GetArticles', { articles })
    cy.visit('/news')

    const newsCards = cy.getByAria('news card')
    newsCards.should('have.length', articles.length)

    newsCards.each((card, index) => {
      const article = articles[index]
      const cardElement = cy.wrap(card)

      cardElement.getByAria('news title').should('contain', article.title)
      cardElement.getByAria('news description').should('contain', article.description)
      cardElement.getByAria('news image').should('have.attr', 'src', article.picture)
      cardElement.getByAria('news publish date').should('contain', moment(article.publishedDate).format('LL'))
    })
  })
})
