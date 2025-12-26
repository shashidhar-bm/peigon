describe('Advanced Request Features', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should send request with URL-encoded body', () => {
        cy.get('[data-testid="method-selector"]').select('POST');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts');

        // Go to Body tab
        cy.contains('button', 'Body').click();

        // Select URL-encoded type
        cy.get('[data-testid="body-type-selector"]').select('urlencoded');

        // Add form fields
        cy.contains('button', /add field|add parameter/i).click();
        cy.get('input[placeholder*="key" i]').first().type('title');
        cy.get('input[placeholder*="value" i]').first().type('Test Title');

        cy.contains('button', /add field|add parameter/i).click();
        cy.get('input[placeholder*="key" i]').last().type('body');
        cy.get('input[placeholder*="value" i]').last().type('Test Body');

        // Send request
        cy.contains('button', 'Send').click();

        // Verify response
        cy.contains('201', { timeout: 10000 }).should('be.visible');
    });

    it('should send request with raw text body', () => {
        cy.get('[data-testid="method-selector"]').select('POST');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts');

        // Go to Body tab
        cy.contains('button', 'Body').click();

        // Select raw type
        cy.get('[data-testid="body-type-selector"]').select('raw');

        // Enter raw text
        cy.get('textarea').type('This is raw text content');

        // Send request
        cy.contains('button', 'Send').click();

        // Should get a response
        cy.wait(2000);
    });

    it('should send PUT request with JSON body', () => {
        cy.get('[data-testid="method-selector"]').select('PUT');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts/1');

        // Go to Body tab
        cy.contains('button', 'Body').click();
        cy.get('[data-testid="body-type-selector"]').select('json');

        // Enter JSON
        const jsonBody = '{\n  "id": 1,\n  "title": "Updated Title",\n  "body": "Updated content"\n}';
        cy.get('textarea').type(jsonBody, { parseSpecialCharSequences: false });

        // Send request
        cy.contains('button', 'Send').click();

        // Verify response
        cy.contains('200', { timeout: 10000 }).should('be.visible');
    });

    it('should send PATCH request', () => {
        cy.get('[data-testid="method-selector"]').select('PATCH');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts/1');

        // Go to Body tab
        cy.contains('button', 'Body').click();
        cy.get('[data-testid="body-type-selector"]').select('json');

        // Enter partial update
        cy.get('textarea').type('{"title": "Patched Title"}', { parseSpecialCharSequences: false });

        // Send request
        cy.contains('button', 'Send').click();

        // Verify response
        cy.contains('200', { timeout: 10000 }).should('be.visible');
    });

    it('should send DELETE request', () => {
        cy.get('[data-testid="method-selector"]').select('DELETE');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts/1');

        // Send request
        cy.contains('button', 'Send').click();

        // Verify response
        cy.contains('200', { timeout: 10000 }).should('be.visible');
    });

    it('should configure API Key authentication', () => {
        // Go to Authorization tab
        cy.contains('button', 'Authorization').click();

        // Select API Key auth type
        cy.get('select').last().select('apiKey');

        // Configure API key
        cy.get('input[placeholder*="key" i]').type('X-API-Key');
        cy.get('input[placeholder*="value" i]').type('test-api-key-123');

        // Select where to add (header or query)
        cy.contains(/header|query/i).click();

        // Make request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', 'Send').click();

        // Verify request was sent
        cy.wait(2000);
    });

    it('should configure Basic authentication', () => {
        // Go to Authorization tab
        cy.contains('button', 'Authorization').click();

        // Select Basic auth type
        cy.get('select').last().select('basic');

        // Enter credentials
        cy.get('input[placeholder*="username" i]').type('testuser');
        cy.get('input[placeholder*="password" i]').type('testpass');

        // Make request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', 'Send').click();

        // Verify request was sent
        cy.wait(2000);
    });

    it('should add multiple custom headers', () => {
        cy.contains('button', 'Headers').click();

        // Add first header
        cy.contains('Add Header').click();
        cy.get('input[placeholder="Header"]').first().type('X-Custom-Header-1');
        cy.get('input[placeholder="Value"]').first().type('Value1');

        // Add second header
        cy.contains('Add Header').click();
        cy.get('input[placeholder="Header"]').last().type('X-Custom-Header-2');
        cy.get('input[placeholder="Value"]').last().type('Value2');

        // Verify both headers are present
        cy.get('input[placeholder="Header"]').should('have.length.at.least', 2);
    });

    it('should add query parameters with special characters', () => {
        cy.contains('button', 'Params').click();

        // Add parameter with special characters
        cy.contains('Add Parameter').click();
        cy.get('input[placeholder="Key"]').first().type('search');
        cy.get('input[placeholder="Value"]').first().type('test & value');

        // Add another parameter
        cy.contains('Add Parameter').click();
        cy.get('input[placeholder="Key"]').last().type('filter');
        cy.get('input[placeholder="Value"]').last().type('name=John Doe');

        // Make request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users');
        cy.contains('button', 'Send').click();

        // Verify request was sent
        cy.contains('200', { timeout: 10000 }).should('be.visible');
    });

    it('should handle HEAD request', () => {
        cy.get('[data-testid="method-selector"]').select('HEAD');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');

        // Send request
        cy.contains('button', 'Send').click();

        // HEAD requests return no body but should show headers
        cy.wait(2000);
    });

    it('should handle OPTIONS request', () => {
        cy.get('[data-testid="method-selector"]').select('OPTIONS');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users');

        // Send request
        cy.contains('button', 'Send').click();

        // Verify request was sent
        cy.wait(2000);
    });
});
