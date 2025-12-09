// Custom Cypress commands

Cypress.Commands.add('createRequest', (method: string, url: string) => {
  cy.get('select').first().select(method);
  cy.get('input[type="text"]').first().type(url);
});

Cypress.Commands.add('createCollection', (name: string) => {
  cy.contains('button', 'New Collection').click();
  cy.get('input[placeholder*="collection"]').type(name);
  cy.contains('button', 'Create').click();
});

