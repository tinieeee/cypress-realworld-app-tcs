//Hook for the cucumber step defenition files
//Once hook file is created this is available to all the files within the folder for this scenario for all the files under e2e folder

import { Before } from "@badeball/cypress-cucumber-preprocessor";


export function loadUserFixture(){
Before(function () {
    return cy.fixture('user_login').then((data) => {
      this.userData = data; // Storing the data in Cucumber's scenario context
    });
  });
}
