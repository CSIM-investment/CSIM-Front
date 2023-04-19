import { aliasRequest } from '../utils/graphql-test-utils'

context('Login', () => {
  beforeEach(() => {
    cy.interceptGql((req) => {
      aliasRequest(req, 'Mutation', 'Login')
      aliasRequest(req, 'Query', 'Account')
    })
  })

  it('should log me in and redirect me to homepage with incorrect credentials', () => {
    cy.mock('Mutation', 'Login')

    cy.visit('/login')

    cy.getByAria('email input').type('email@email.fr')
    cy.getByAria('password input').type('password')
    cy.get('button[type="submit"]').click()

    cy.wait('@gqlLoginMutation').its('response.statusCode').should('eq', 200)

    cy.url().should('not.contain', '/login')
  })

  it('should not log me in and display error message with incorrect email and password', () => {
    const errorMessage = 'Invalid credentials'
    cy.mockError('Mutation', 'Login', errorMessage)

    cy.visit('/login')

    cy.getByAria('email input').type('wrong@email.com')
    cy.getByAria('password input').type('wrongpassword')
    cy.getByAria('Login').click()

    cy.wait('@gqlLoginMutation').its('response.statusCode').should('eq', 200)
    cy.getByRole('alert').should('contain', errorMessage)
    cy.url().should('contain', '/login')
  })

  it('should log me automatically if I have a valid token', () => {
    window.localStorage.setItem('accessToken', 'accessToken')
    window.localStorage.setItem('refreshToken', 'refreshToken')
    cy.mock('Query', 'Account')

    cy.visit('/')
    cy.getByAria('log in').should('not.exist')
  })
})
