Cypress.Commands.add('getByAria', (label: string) => {
  return cy.get(`[aria-label="${label}"]`)
})

Cypress.Commands.add('getByRole', (roleName: string) => {
  return cy.get(`[role="${roleName}"]`)
})

Cypress.Commands.add('getByDataTest', (label: string) => {
  return cy.get(`[data-test="${label}"]`)
})

Cypress.Commands.add('getByInputName', (inputName: string) => {
  return cy.get(`input[name='${inputName}']`)
})
