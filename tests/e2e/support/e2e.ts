// Cypress E2E test support file

// Import commands
import './commands';

// Prevent Cypress from failing tests on uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  return false;
});

// Add custom commands to Cypress global namespace
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to create a new request
       * @example cy.createRequest('GET', 'https://api.example.com/users')
       */
      createRequest(method: string, url: string): Chainable<void>;
      
      /**
       * Custom command to create a collection
       * @example cy.createCollection('My Collection')
       */
      createCollection(name: string): Chainable<void>;
    }
  }
}

