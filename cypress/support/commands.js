// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('input[id="firstName"]').should('be.visible').type('Marlon').should('have.value', 'Marlon')
    cy.get('input[id="lastName"]').should('be.visible').type('Maciel').should('have.value', 'Maciel')
    cy.get('input[id="email"]').should('be.visible').type('marlonprogrammer@gmail.com').should('have.value', 'marlonprogrammer@gmail.com')
    cy.get('input[id="phone"]').should('be.visible').type('11966136589').should('have.value', '11966136589')
    cy.get('select[id="product"]').should('be.visible')
    cy.get('#email-checkbox').should('be.visible').click('bottom').should('be.checked')
    cy.get('#open-text-area').should('be.visible').type('teste').should('have.value', 'teste')
    cy.contains('button', 'Enviar').should('be.visible').click()
})
