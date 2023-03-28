import { aliasRequest } from '../utils/graphql-test-utils'

context('Register', () => {
  beforeEach(() => {
    cy.interceptGql((req) => {
      aliasRequest(req, 'Mutation', 'Register')
      aliasRequest(req, 'Mutation', 'ConfirmEmail')
    })
  })

  it('test the register form and email verification test', () => {
    cy.visit('/register')
    cy.mock('Mutation', 'Register')
    cy.mock('Mutation', 'ConfirmEmail')

    const nextButton = cy.getByAria('Next')
    nextButton.should('be.disabled')

    cy.getByAria('lastName field').type('Doe')
    cy.getByAria('firstName field').type('John')
    cy.getByAria('email field').type('john.doe@ynov.com')

    cy.getByAria('Next').should('not.be.disabled').click()

    cy.getByAria('Create your account').should('be.disabled')

    cy.getByAria('password field').type('a long password')
    cy.getByAria('confirm password field').type('a long password')
    cy.getByAria('Create your account').should('be.disabled')

    cy.getByAria('accept terms section').children().first().click()

    cy.getByAria('Create your account').should('not.be.disabled').click()
    cy.getByAria('email code step 1').type('123456')

    cy.getByAria('Confirm email').should('not.be.disabled').click()

    cy.url().should('not.contain', '/register')
  })

  it('should show the previous step when clicking on the previous button', () => {
    cy.visit('/register')

    cy.getByAria('lastName field').type('Doe')
    cy.getByAria('firstName field').type('John')
    cy.getByAria('email field').type('john.doe@ynov.com')

    cy.getByAria('Next').click()

    cy.getByAria('lastName field').should('not.exist')
    cy.getByAria('password field').should('exist')

    cy.getByAria('Back').click()

    cy.getByAria('lastName field').should('exist')
  })
})
