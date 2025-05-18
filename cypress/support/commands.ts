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
        scrollToDateRange(
            containerSelector: string,
            fromDate: string,
            toDate: string
        ): Chainable<void>;
        }
}

Cypress.Commands.add("getByData", (selector: string)=>{
    return cy.get(`[data-test="${selector}"]`)
})

//Add generic command to verify validation messages
Cypress.Commands.add("getValidationMessage", (fieldId: string)=>{
    return cy.get(`#${fieldId}`)
})




//This creates a custom Cypress command named scrollToDateRange. containerSelector is the scrollable container’s class or ID.
//fromDate is the first date to click. toDate is the second date to click (after scrolling again).
Cypress.Commands.add('scrollToDateRange', (containerSelector, fromDate, toDate) => {
    const scrollStep = -100; //This defines how much to scroll upward each time. Negative Y value = scroll up.
    const delay = 300; // Wait time (in milliseconds) after each scroll step before checking again. Gives time for DOM to update if new dates are loading.
  
    function scrollToDate(dateStr) { // This is a helper function that scrolls and clicks one specific date (like 2025-03-01).
      function tryScroll() { // It uses tryScroll() to keep scrolling until it finds the target. This function runs in a loop: Looks for the date. If not found → scrolls up and tries again after a delay.
        return cy.get(`[data-date="${dateStr}"]`).then($date => {
          if ($date.length && $date.is(':visible')) { // Checks if: The element exists And it’s visible on the screen
            cy.wrap($date).click({force:true}); // If found and visible, this clicks the date using Cypress.
            return Cypress.Promise.resolve(); // Ends the loop by returning a resolved promise (saying “we’re done!”).
          } else { // If the date isn’t found or visible yet: We scroll up again, Wait a bit, Try Again
            return cy.get(containerSelector).then($container => {
              const container = $container[0]; //Cypress returns a jQuery object. This gets the raw DOM element.
              container.scrollBy(0, scrollStep); //Scrolls the container upward by 100px.
              return Cypress.Promise.delay(delay).then(tryScroll); // Waits 300ms, then calls tryScroll() again to repeat the process
            });
          }
        });
      }
      return tryScroll(); // Starts the scroll-and-click process for a single date
    }
  
    // First scroll to "from" date, then to "to" date
    return scrollToDate(fromDate).then(() => scrollToDate(toDate)); 
  });