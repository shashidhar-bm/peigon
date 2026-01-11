describe('Basic Workflow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the application', () => {
    cy.contains('Peigen').should('be.visible');
  });

  it('should create a new collection', () => {
    cy.contains('button', 'New Collection').click();
    cy.get('input').first().type('My Test Collection');
    cy.contains('button', 'Create').click();

    cy.contains('My Test Collection').should('be.visible');
  });

  it('should send a GET request', () => {
    // Wait for and verify GET method is selected by default
    cy.get('[data-testid="method-selector"]').should('be.visible').and('have.value', 'GET');

    // Enter URL
    cy.get('input[placeholder="Enter request URL"]').type('https://jsonplaceholder.typicode.com/users/1');

    // Click Send button
    cy.contains('button', 'Send').click();

    // Wait for response
    cy.contains('200', { timeout: 10000 }).should('be.visible');
    cy.contains('Body').should('be.visible');
  });

  it('should switch between tabs', () => {
    cy.contains('button', 'Params').click();
    cy.contains('Add Parameter').should('be.visible');

    cy.contains('button', 'Headers').click();
    cy.contains('Add Header').should('be.visible');

    cy.contains('button', 'Body').click();
    cy.contains('This request does not have a body').should('be.visible');
  });

  it('should add request parameters', () => {
    cy.contains('button', 'Params').click();
    cy.contains('Add Parameter').click();

    cy.get('input[placeholder="Key"]').first().type('userId');
    cy.get('input[placeholder="Value"]').first().type('1');
  });

  it('should switch environments', () => {
    // Check if environment selector exists
    cy.get('[data-testid="environment-selector"]').should('exist');
  });

  it('should view request history', () => {
    cy.contains('button', 'History').click();
    cy.contains('No request history').should('be.visible');
  });

  it('should open the chatbot', () => {
    cy.contains('button', 'Chat').click();
    cy.contains("Hello! I'm Peigen AI").should('be.visible');
    cy.get('input[placeholder="Ask something..."]').type('Hello AI{enter}');
    cy.contains('You said: "Hello AI"').should('be.visible');
  });
});

