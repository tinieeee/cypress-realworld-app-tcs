import { Before } from "@badeball/cypress-cucumber-preprocessor";

export function loadLoginPage(){
Before(function () {
    return cy.fixture('user_login').then((data) => {
      this.userData = data; // Storing the data in Cucumber's scenario context
    });
  });
}