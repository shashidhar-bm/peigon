describe('Collection Management', () => {
    beforeEach(() => {
        cy.visit('/');
        // Clear any existing data
        cy.window().then((win) => {
            win.localStorage.clear();
        });
        cy.reload();
    });

    it('should create a new collection', () => {
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('API Tests');
        cy.contains('button', 'Create').click();

        cy.contains('API Tests').should('be.visible');
    });

    it('should create multiple collections', () => {
        // Create first collection
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('User API');
        cy.contains('button', 'Create').click();

        // Create second collection
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('Product API');
        cy.contains('button', 'Create').click();

        // Verify both exist
        cy.contains('User API').should('be.visible');
        cy.contains('Product API').should('be.visible');
    });

    it('should save a request to a collection', () => {
        // Create a collection first
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('Saved Requests');
        cy.contains('button', 'Create').click();

        // Make a request
        cy.get('[data-testid="method-selector"]').select('GET');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');

        // Save the request
        cy.contains('button', /save|save request/i).click();

        // Select collection and provide request name
        cy.get('input[placeholder*="name" i], input[placeholder*="request" i]').type('Get User 1');
        cy.contains('button', /save|confirm/i).click();

        // Verify request appears in collection
        cy.contains('Get User 1').should('be.visible');
    });

    it('should load a saved request from collection', () => {
        // Create collection and save a request
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('My Collection');
        cy.contains('button', 'Create').click();

        // Configure and save a request
        cy.get('[data-testid="method-selector"]').select('POST');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts');

        cy.contains('button', /save|save request/i).click();
        cy.get('input[placeholder*="name" i], input[placeholder*="request" i]').type('Create Post');
        cy.contains('button', /save|confirm/i).click();

        // Clear the request builder
        cy.get('[data-testid="method-selector"]').select('GET');
        cy.get('input[type="text"]').first().clear();

        // Load the saved request
        cy.contains('Create Post').click();

        // Verify request was loaded
        cy.get('[data-testid="method-selector"]').should('have.value', 'POST');
        cy.get('input[type="text"]').first().should('have.value', 'https://jsonplaceholder.typicode.com/posts');
    });

    it('should rename a collection', () => {
        // Create a collection
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('Old Name');
        cy.contains('button', 'Create').click();

        // Right-click or find rename option
        cy.contains('Old Name').rightclick();
        cy.contains(/rename|edit/i).click();

        // Change the name
        cy.get('input').first().clear().type('New Name');
        cy.contains('button', /save|confirm/i).click();

        // Verify name changed
        cy.contains('New Name').should('be.visible');
        cy.contains('Old Name').should('not.exist');
    });

    it('should delete a collection', () => {
        // Create a collection
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('To Delete');
        cy.contains('button', 'Create').click();

        // Delete the collection
        cy.contains('To Delete').rightclick();
        cy.contains(/delete|remove/i).click();

        // Confirm deletion
        cy.contains('button', /confirm|delete|yes/i).click();

        // Verify collection is gone
        cy.contains('To Delete').should('not.exist');
    });

    it('should organize multiple requests in a collection', () => {
        // Create collection
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('User Management');
        cy.contains('button', 'Create').click();

        // Save first request
        cy.get('[data-testid="method-selector"]').select('GET');
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users');
        cy.contains('button', /save|save request/i).click();
        cy.get('input[placeholder*="name" i], input[placeholder*="request" i]').type('List Users');
        cy.contains('button', /save|confirm/i).click();

        // Save second request
        cy.get('[data-testid="method-selector"]').select('POST');
        cy.get('input[type="text"]').first().clear().type('https://jsonplaceholder.typicode.com/users');
        cy.contains('button', /save|save request/i).click();
        cy.get('input[placeholder*="name" i], input[placeholder*="request" i]').type('Create User');
        cy.contains('button', /save|confirm/i).click();

        // Verify both requests are in collection
        cy.contains('List Users').should('be.visible');
        cy.contains('Create User').should('be.visible');
    });

    it('should update a saved request', () => {
        // Create collection and save request
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('Test Collection');
        cy.contains('button', 'Create').click();

        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1');
        cy.contains('button', /save|save request/i).click();
        cy.get('input[placeholder*="name" i], input[placeholder*="request" i]').type('User Request');
        cy.contains('button', /save|confirm/i).click();

        // Load and modify the request
        cy.contains('User Request').click();
        cy.get('input[type="text"]').first().clear().type('https://jsonplaceholder.typicode.com/users/2');

        // Save the updated request
        cy.contains('button', /save|update/i).click();

        // Reload and verify changes
        cy.reload();
        cy.contains('User Request').click();
        cy.get('input[type="text"]').first().should('have.value', 'https://jsonplaceholder.typicode.com/users/2');
    });
});
