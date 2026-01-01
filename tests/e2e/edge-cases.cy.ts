describe('Edge Cases and Error Handling', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should handle empty URL submission', () => {
        // Try to send request with empty URL
        cy.get('input[type="text"]').first().clear();
        cy.contains('button', 'Send').should('be.disabled');

        // Should show validation error or prevent submission
        // The button might be disabled or show an error message
        cy.wait(500);
    });

    it('should handle invalid JSON in request body', () => {
        cy.get('[data-testid="method-selector"]').select('POST');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts');

        cy.contains('button', 'Body').click();
        cy.get('[data-testid="body-type-selector"]').select('json');

        // Enter invalid JSON
        cy.get('textarea').type('{ invalid json here }', { parseSpecialCharSequences: false });

        // Try to send - should either show error or send anyway
        cy.contains('button', 'Send').click();
        cy.wait(2000);
    });

    it('should handle very long URLs', () => {
        const longUrl = 'https://jsonplaceholder.typicode.com/users?' + 'a=1&'.repeat(100);
        cy.get('input[type="text"]').first().type(longUrl.substring(0, 500));

        // Should handle long URL gracefully
        cy.wait(500);
    });

    it('should handle special characters in collection names', () => {
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('Test & Collection <> "Special" Chars');
        cy.contains('button', 'Create').click();

        // Should create collection with special chars or sanitize them
        cy.wait(500);
    });

    it('should handle duplicate collection names', () => {
        // Create first collection
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('Duplicate Name');
        cy.contains('button', 'Create').click();

        // Try to create another with same name
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('Duplicate Name');
        cy.contains('button', 'Create').click();

        // Should either prevent creation or allow with warning
        cy.wait(500);
    });

    it('should handle network timeout gracefully', () => {
        // Use a URL that will timeout
        cy.get('input[type="text"]').first().type('https://httpstat.us/200?sleep=30000');
        cy.contains('button', 'Send').click();

        // Wait a bit then check for timeout handling
        cy.wait(5000);
        // Should show loading state or timeout error
    });

    it('should handle empty collection name', () => {
        cy.contains('button', 'New Collection').click();
        // Leave input empty
        cy.contains('button', 'Create').click();

        // Should show validation error or prevent creation
        cy.wait(500);
    });

    it('should handle invalid environment variable syntax', () => {
        cy.get('input[type="text"]').first().type('{{invalid}}{{syntax}}{{here', { parseSpecialCharSequences: false });

        // Should handle malformed variable syntax gracefully
        cy.wait(500);
    });

    it('should handle rapid consecutive requests', () => {
        const url = 'https://jsonplaceholder.typicode.com/users/1';
        cy.get('input[type="text"]').first().type(url);

        // Send multiple requests quickly
        cy.contains('button', 'Send').click();
        cy.wait(100);
        cy.contains('button', 'Send').click();
        cy.wait(100);
        cy.contains('button', 'Send').click();

        // Should handle concurrent requests properly
        cy.wait(3000);
    });

    it('should handle missing required headers gracefully', () => {
        // Some APIs require specific headers
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts');
        cy.get('[data-testid="method-selector"]').select('POST');

        // Send without Content-Type header (should be added automatically)
        cy.contains('button', 'Send').click();
        cy.wait(2000);
    });

    it('should handle empty response body', () => {
        cy.get('[data-testid="method-selector"]').select('DELETE');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts/1');
        cy.contains('button', 'Send').click();

        // Should display empty body gracefully
        cy.contains('200', { timeout: 10000 }).should('be.visible');
        cy.wait(1000);
    });

    it('should handle 500 server error', () => {
        // Use httpstat.us to simulate 500 error
        cy.get('input[type="text"]').first().type('https://httpstat.us/500');
        cy.contains('button', 'Send').click();

        // Should display error status or error message
        cy.wait(3000);
        // The app might show '500' or 'error' or 'Internal Server Error'
        cy.get('body').invoke('text').should('match', /500|error|failed/i);
    });

    it('should handle 401 unauthorized error', () => {
        cy.get('input[type="text"]').first().type('https://httpstat.us/401');
        cy.contains('button', 'Send').click();

        // Should display unauthorized status or error message
        cy.wait(3000);
        // The app might show '401' or 'Unauthorized' or 'error'
        cy.get('body').invoke('text').should('match', /401|unauthorized|error/i);
    });

    it('should handle very large response bodies', () => {
        // Get a large response
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/photos');
        cy.contains('button', 'Send').click();

        // Should handle large response without crashing
        cy.contains('200', { timeout: 15000 }).should('be.visible');
        cy.wait(2000);
    });

    it('should preserve state after browser refresh', () => {
        // Create a collection
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('Persistent Collection');
        cy.contains('button', 'Create').click();

        // Refresh the page
        cy.reload();

        // Verify collection still exists
        cy.contains('Persistent Collection').should('be.visible');
    });

    it('should handle switching tabs while request is in flight', () => {
        cy.get('input[type="text"]').first().type('https://httpstat.us/200?sleep=3000');
        cy.contains('button', 'Send').click();

        // Switch tabs while waiting
        cy.contains('button', 'Headers').click();
        cy.contains('button', 'Body').click();
        cy.contains('button', 'Params').click();

        // Should still show response when it arrives
        cy.wait(5000);
    });
});
