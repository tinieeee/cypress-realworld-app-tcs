import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild"




export default defineConfig({
  e2e: {
    retries: 1, // Retries failed tests once
    baseUrl: 'http://localhost:3000',
    env:{
      signInPage: '/signin'
    },
    specPattern: 'cypress/e2e/**/*.feature',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
    // specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
  },
});