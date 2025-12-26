describe('Response Viewer', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display JSON response with proper formatting', () => {
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', 'Send').click();

        // Wait for response
        cy.contains('200', { timeout: 10000 }).should('be.visible');

        // Verify JSON content is displayed
        cy.contains('"id"').should('be.visible');
        cy.contains('"name"').should('be.visible');
    });

    it('should display response headers', () => {
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', 'Send').click();

        // Wait for response
        cy.contains('200', { timeout: 10000 }).should('be.visible');

        // Switch to Headers tab in response
        cy.contains('button', /headers|response headers/i).click();

        // Verify headers are displayed
        cy.contains(/content-type|Content-Type/i).should('be.visible');
    });

    it('should handle 404 error response', () => {
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/99999');
        cy.contains('button', 'Send').click();

        // Verify error status is displayed
        cy.contains('404', { timeout: 10000 }).should('be.visible');
    });

    it('should handle network errors gracefully', () => {
        cy.get('input[type="text"]').first().type('https://invalid-domain-that-does-not-exist-12345.com/api');
        cy.contains('button', 'Send').click();

        // Should show error message
        cy.contains(/error|failed|network/i, { timeout: 10000 }).should('be.visible');
    });

    it('should display array response', () => {
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users');
        cy.contains('button', 'Send').click();

        // Wait for response
        cy.contains('200', { timeout: 10000 }).should('be.visible');

        // Verify array content
        cy.contains('[').should('be.visible');
        cy.contains('"id"').should('be.visible');
    });

    it('should show response time', () => {
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', 'Send').click();

        // Wait for response
        cy.contains('200', { timeout: 10000 }).should('be.visible');

        // Response time should be displayed (in ms)
        cy.contains(/\d+\s*ms/i).should('be.visible');
    });

    it('should show response size', () => {
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', 'Send').click();

        // Wait for response
        cy.contains('200', { timeout: 10000 }).should('be.visible');

        // Response size should be displayed
        cy.contains(/\d+\s*(B|KB|bytes)/i).should('be.visible');
    });

    it('should handle empty response body', () => {
        cy.get('[data-testid="method-selector"]').select('DELETE');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts/1');
        cy.contains('button', 'Send').click();

        // Wait for response
        cy.contains('200', { timeout: 10000 }).should('be.visible');

        // Should handle empty body gracefully
        cy.wait(1000);
    });
});
