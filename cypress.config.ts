import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env:{
      signInPage: '/signin'
    },
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});