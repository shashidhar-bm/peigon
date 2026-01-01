describe('Request Creation and Management', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should create a POST request with JSON body', () => {
    // Select POST method
    cy.get('[data-testid="method-selector"]').should('be.visible').select('POST');

    // Enter URL
    cy.get('input[placeholder="Enter request URL"]').type('https://jsonplaceholder.typicode.com/posts');

    // Go to Body tab
    cy.contains('button', 'Body').click();

    // Select JSON body type
    cy.get('[data-testid="body-type-selector"]').select('json');

    // Enter JSON body
    const jsonBody = '{\n  "title": "Test Post",\n  "body": "Test content",\n  "userId": 1\n}';
    cy.get('textarea').type(jsonBody, { parseSpecialCharSequences: false });

    // Send request
    cy.contains('button', 'Send').click();

    // Verify response
    cy.contains('201', { timeout: 10000 }).should('be.visible');
  });

  it('should add custom headers', () => {
    cy.contains('button', 'Headers').click();
    cy.contains('Add Header').click();

    cy.get('input[placeholder="Header"]').first().type('X-Custom-Header');
    cy.get('input[placeholder="Value"]').first().type('CustomValue');

    // Verify header was added
    cy.get('input[placeholder="Header"]').first().should('have.value', 'X-Custom-Header');
  });

  it('should configure bearer token authorization', () => {
    cy.contains('button', 'Authorization').click();

    // Select Bearer Token
    cy.get('[data-testid="auth-type-selector"]').select('Bearer Token');

    // Enter token
    cy.get('input[placeholder*="token"]').type('test-bearer-token-123');

    // Verify token was entered
    cy.get('input[placeholder*="token"]').should('have.value', 'test-bearer-token-123');
  });

  it('should test different HTTP methods', () => {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

    methods.forEach(method => {
      cy.get('[data-testid="method-selector"]').should('be.visible').select(method);
      cy.get('[data-testid="method-selector"]').should('have.value', method);
    });
  });
});

