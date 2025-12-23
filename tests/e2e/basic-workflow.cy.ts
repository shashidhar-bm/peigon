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
    // Select GET method
    cy.get('select').first().should('have.value', 'GET');
    
    // Enter URL
    cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
    
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
    cy.contains('None').should('be.visible');
  });

  it('should add request parameters', () => {
    cy.contains('button', 'Params').click();
    cy.contains('Add Parameter').click();
    
    cy.get('input[placeholder="Key"]').first().type('userId');
    cy.get('input[placeholder="Value"]').first().type('1');
  });

  it('should switch environments', () => {
    // Check if environment selector exists
    cy.get('select').last().should('exist');
  });

  it('should view request history', () => {
    cy.contains('button', 'History').click();
    cy.contains('No request history').should('be.visible');
  });
});

