describe('History Management', () => {
    beforeEach(() => {
        cy.visit('/');
        // Clear history from previous tests
        cy.window().then((win) => {
            // Use the actual key prefix from constants/apiConstants.ts + storageService.ts
            // Or just clear everything to be safe
            win.localStorage.removeItem('peigen_data_history');
        });
        cy.reload();
        // Verify history is empty initially
        cy.contains('No request history').should('be.visible');
    });

    it('should automatically save requests to history', () => {
        // Make a request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1', { force: true });
        cy.contains('button', 'Send').click({ force: true });

        // Wait for response
        cy.contains('200', { timeout: 10000 }).should('be.visible');

        // Open history
        cy.contains('button', 'History').click({ force: true });

        // Verify request appears in history
        cy.contains('https://jsonplaceholder.typicode.com/users/1').should('be.visible');
    });

    it('should load request from history', () => {
        // Make a request
        cy.get('[data-testid="method-selector"]').select('POST', { force: true });
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts', { force: true });
        cy.contains('button', 'Send').click({ force: true });

        // Wait for response
        cy.wait(2000);

        // Clear current request
        cy.get('[data-testid="method-selector"]').select('GET', { force: true });
        cy.get('input[type="text"]').first().clear({ force: true });

        // Open history and load the request
        cy.contains('button', 'History').click({ force: true });
        cy.contains('https://jsonplaceholder.typicode.com/posts').click({ force: true });

        // Verify request was loaded
        cy.get('[data-testid="method-selector"]').should('have.value', 'POST');
        cy.get('input[type="text"]').first().should('have.value', 'https://jsonplaceholder.typicode.com/posts');
    });

    it('should show multiple requests in history', () => {
        // Make first request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1', { force: true });
        cy.contains('button', 'Send').click({ force: true });
        cy.wait(2000);

        // Make second request
        cy.get('input[type="text"]').first().clear({ force: true }).type('https://jsonplaceholder.typicode.com/posts/1', { force: true });
        cy.contains('button', 'Send').click({ force: true });
        cy.wait(2000);

        // Make third request
        cy.get('input[type="text"]').first().clear({ force: true }).type('https://jsonplaceholder.typicode.com/comments/1', { force: true });
        cy.contains('button', 'Send').click({ force: true });
        cy.wait(2000);

        // Open history
        cy.contains('button', 'History').click({ force: true });

        // Verify all requests are in history
        cy.contains('users/1').should('be.visible');
        cy.contains('posts/1').should('be.visible');
        cy.contains('comments/1').should('be.visible');
    });

    it('should clear history', () => {
        // Make some requests
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1', { force: true });
        cy.contains('button', 'Send').click({ force: true });
        cy.wait(2000);

        // Open history
        cy.contains('button', 'History').click({ force: true });

        // Clear history
        // If history is empty, this button won't exist
        cy.contains('button', /clear history|clear all/i).should('exist').click({ force: true });

        // Confirm if needed (handled by window.confirm stub mostly, but check if custom modal)
        // cy.contains('button', /confirm|yes|clear/i).click();

        // Verify history is empty
        cy.contains('No request history').should('be.visible');
    });

    it('should persist history across page reloads', () => {
        // Make a request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1', { force: true });
        cy.contains('button', 'Send').click({ force: true });
        cy.wait(2000);

        // Reload the page
        cy.reload();

        // Open history
        cy.contains('button', 'History').click({ force: true });

        // Verify request is still in history
        cy.contains('users/1').should('be.visible');
    });

    it('should show request method in history', () => {
        // Make a POST request
        cy.get('[data-testid="method-selector"]').select('POST', { force: true });
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts', { force: true });
        cy.contains('button', 'Send').click({ force: true });
        cy.wait(2000);

        // Open history
        cy.contains('button', 'History').click({ force: true });

        // Verify method is shown
        cy.contains('POST').should('be.visible');
    });

    it('should show timestamp in history', () => {
        // Make a request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1', { force: true });
        cy.contains('button', 'Send').click({ force: true });
        cy.wait(2000);

        // Open history
        cy.contains('button', 'History').click({ force: true });

        // Verify timestamp is shown (looking for time-related text)
        cy.contains(/\d{1,2}:\d{2}|ago|today|yesterday/i).should('be.visible');
    });
});
