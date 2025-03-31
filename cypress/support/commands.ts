/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

//Since we are using TypeScript, we must add the type definition for our custom command. 
declare namespace Cypress{
    interface Chainable{
        //We extend the Chainable interface from the Cypress namespace, which allows us to use (and provide code completion) for the getByData() method off of the cy object.
        getByData(dataTestAttribute: string) : Chainable<JQuery<HTMLElement>>
        getValidationMessage(fieldId: string) : Chainable<JQuery<HTMLElement>>
    }
}

Cypress.Commands.add("getByData", (selector: string)=>{
    return cy.get(`[data-test="${selector}"]`)
})

//Add generic command to verify validation messages
Cypress.Commands.add("getValidationMessage", (fieldId: string)=>{
    return cy.get(`#${fieldId}`)
})