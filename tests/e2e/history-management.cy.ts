describe('History Management', () => {
    beforeEach(() => {
        cy.visit('/');
        // Clear history
        cy.window().then((win) => {
            win.localStorage.removeItem('request-history');
        });
        cy.reload();
    });

    it('should automatically save requests to history', () => {
        // Make a request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', 'Send').click();

        // Wait for response
        cy.contains('200', { timeout: 10000 }).should('be.visible');

        // Open history
        cy.contains('button', 'History').click();

        // Verify request appears in history
        cy.contains('https://jsonplaceholder.typicode.com/users/1').should('be.visible');
    });

    it('should load request from history', () => {
        // Make a request
        cy.get('[data-testid="method-selector"]').select('POST');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts');
        cy.contains('button', 'Send').click();

        // Wait for response
        cy.wait(2000);

        // Clear current request
        cy.get('[data-testid="method-selector"]').select('GET');
        cy.get('input[type="text"]').first().clear();

        // Open history and load the request
        cy.contains('button', 'History').click();
        cy.contains('https://jsonplaceholder.typicode.com/posts').click();

        // Verify request was loaded
        cy.get('[data-testid="method-selector"]').should('have.value', 'POST');
        cy.get('input[type="text"]').first().should('have.value', 'https://jsonplaceholder.typicode.com/posts');
    });

    it('should show multiple requests in history', () => {
        // Make first request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', 'Send').click();
        cy.wait(2000);

        // Make second request
        cy.get('input[type="text"]').first().clear().type('https://jsonplaceholder.typicode.com/posts/1');
        cy.contains('button', 'Send').click();
        cy.wait(2000);

        // Make third request
        cy.get('input[type="text"]').first().clear().type('https://jsonplaceholder.typicode.com/comments/1');
        cy.contains('button', 'Send').click();
        cy.wait(2000);

        // Open history
        cy.contains('button', 'History').click();

        // Verify all requests are in history
        cy.contains('users/1').should('be.visible');
        cy.contains('posts/1').should('be.visible');
        cy.contains('comments/1').should('be.visible');
    });

    it('should clear history', () => {
        // Make some requests
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', 'Send').click();
        cy.wait(2000);

        // Open history
        cy.contains('button', 'History').click();

        // Clear history
        cy.contains('button', /clear history|clear all/i).click();

        // Confirm if needed
        cy.contains('button', /confirm|yes|clear/i).click();

        // Verify history is empty
        cy.contains('No request history').should('be.visible');
    });

    it('should persist history across page reloads', () => {
        // Make a request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', 'Send').click();
        cy.wait(2000);

        // Reload the page
        cy.reload();

        // Open history
        cy.contains('button', 'History').click();

        // Verify request is still in history
        cy.contains('users/1').should('be.visible');
    });

    it('should show request method in history', () => {
        // Make a POST request
        cy.get('[data-testid="method-selector"]').select('POST');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts');
        cy.contains('button', 'Send').click();
        cy.wait(2000);

        // Open history
        cy.contains('button', 'History').click();

        // Verify method is shown
        cy.contains('POST').should('be.visible');
    });

    it('should show timestamp in history', () => {
        // Make a request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', 'Send').click();
        cy.wait(2000);

        // Open history
        cy.contains('button', 'History').click();

        // Verify timestamp is shown (looking for time-related text)
        cy.contains(/\d{1,2}:\d{2}|ago|today|yesterday/i).should('be.visible');
    });
});
