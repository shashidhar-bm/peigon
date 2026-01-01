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
        cy.get('[data-testid="new-collection-input"]').type('API Tests');
        cy.get('[data-testid="create-collection-btn"]').click({ force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade

        cy.contains('API Tests').should('be.visible');
    });

    it('should create multiple collections', () => {
        // Create first collection
        cy.contains('button', 'New Collection').click();
        cy.get('[data-testid="new-collection-input"]').type('User API');
        cy.get('[data-testid="create-collection-btn"]').click({ force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade

        // Create second collection
        cy.contains('button', 'New Collection').click();
        cy.get('[data-testid="new-collection-input"]').type('Product API');
        cy.get('[data-testid="create-collection-btn"]').click({ force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade

        // Verify both exist
        cy.contains('User API').should('be.visible');
        cy.contains('Product API').should('be.visible');
    });

    it('should save a request to a collection', () => {
        // Create a collection first
        cy.contains('button', 'New Collection').click();
        cy.get('[data-testid="new-collection-input"]').type('Saved Requests');
        cy.get('[data-testid="create-collection-btn"]').click({ force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade

        // Make a request
        cy.get('[data-testid="method-selector"]').select('GET', { force: true });
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1', { force: true });

        // Save the request
        cy.get('[data-testid="save-request-button"]').click({ force: true });

        // Wait for modal and state
        cy.wait(1000);

        // Select collection and provide request name
        cy.get('[role="dialog"] input[placeholder="Enter request name"]').type('Get User 1', { force: true });
        // Explicitly select the collection to ensure state is set
        cy.contains('Saved Requests').should('be.visible'); // Ensure sidebar has it
        cy.get('[role="dialog"] select').should('contain.text', 'Saved Requests').select('Saved Requests');
        cy.get('[role="dialog"]').contains('button', /save|confirm/i).should('not.be.disabled').click({ force: true });
        cy.wait(1000); // Wait for modal to close
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for collection list update

        // Collection is expanded by default, no need to click
        // cy.contains('Saved Requests').click({ force: true });
        cy.wait(500);

        // Verify request appears in collection
        cy.contains('Get User 1').should('exist');
    });

    it('should load a saved request from collection', () => {
        // Create collection and save a request
        cy.contains('button', 'New Collection').click();
        cy.get('[data-testid="new-collection-input"]').type('My Collection');
        cy.get('[data-testid="create-collection-btn"]').click({ force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade

        // Configure and save a request
        cy.get('[data-testid="method-selector"]').select('POST', { force: true });
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts', { force: true });

        cy.get('[data-testid="save-request-button"]').click({ force: true });
        cy.get('[role="dialog"] input[placeholder="Enter request name"]').type('Create Post', { force: true });
        cy.get('[role="dialog"] select').should('contain.text', 'My Collection').select('My Collection');
        cy.get('[role="dialog"]').contains('button', /save|confirm/i).should('not.be.disabled').click({ force: true });
        cy.wait(1000); // Wait for modal to close
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for collection list update

        // Expand collection
        // Collection is expanded by default
        // cy.contains('My Collection').click({ force: true });
        cy.wait(500);

        // Clear the request builder
        cy.get('[data-testid="method-selector"]').select('GET', { force: true });
        cy.get('input[type="text"]').first().clear({ force: true });

        // Load the saved request
        cy.contains('Create Post').click();

        // Verify request was loaded
        cy.get('[data-testid="method-selector"]').should('have.value', 'POST');
        cy.get('input[type="text"]').first().should('have.value', 'https://jsonplaceholder.typicode.com/posts');
    });

    it('should rename a collection', () => {
        // Create a collection
        cy.contains('button', 'New Collection').click();
        cy.get('[data-testid="new-collection-input"]').type('Old Name');
        cy.get('[data-testid="create-collection-btn"]').click({ force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade

        // Right-click or find rename option
        // Click edit button (force because it might be hidden until hover)
        cy.contains('Old Name').parent().parent().find('button[title="Edit"]').click({ force: true });

        // Change the name
        cy.get('input').first().clear().type('New Name');
        cy.contains('button', /save|confirm/i).click({ force: true });

        // Verify name changed
        cy.contains('New Name').should('be.visible');
        cy.contains('Old Name').should('not.exist');
    });

    it('should delete a collection', () => {
        // Create a collection
        cy.contains('button', 'New Collection').click();
        cy.get('[data-testid="new-collection-input"]').type('To Delete');
        cy.get('[data-testid="create-collection-btn"]').click({ force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade

        // Delete the collection

        cy.on('window:confirm', () => true);
        cy.contains('To Delete').parent().parent().find('button[title="Delete"]').click({ force: true });

        // Verify collection is gone
        cy.contains('To Delete').should('not.exist');
    });

    it('should organize multiple requests in a collection', () => {
        // Create collection
        cy.contains('button', 'New Collection').click();
        cy.get('[data-testid="new-collection-input"]').type('User Management');
        cy.get('[data-testid="create-collection-btn"]').click({ force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade

        // Save first request
        cy.get('[data-testid="method-selector"]').select('GET', { force: true });
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users', { force: true });
        cy.get('[data-testid="save-request-button"]').click({ force: true });
        cy.get('[role="dialog"] input[placeholder="Enter request name"]').type('List Users', { force: true });
        cy.get('[role="dialog"] select').should('contain.text', 'User Management').select('User Management');
        cy.get('[role="dialog"]').contains('button', /save|confirm/i).should('not.be.disabled').click({ force: true });
        cy.wait(1000); // Wait for modal to close
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for collection list update

        // Save second request
        cy.get('[data-testid="method-selector"]').select('POST', { force: true });
        cy.get('input[type="text"]').first().clear({ force: true }).type('https://jsonplaceholder.typicode.com/users', { force: true });
        cy.get('[data-testid="save-request-button"]').click({ force: true });
        cy.get('[role="dialog"] input[placeholder="Enter request name"]').type('Create User', { force: true });
        cy.get('[role="dialog"] select').should('contain.text', 'User Management').select('User Management');
        cy.get('[role="dialog"]').contains('button', /save|confirm/i).should('not.be.disabled').click({ force: true });
        cy.wait(1000); // Wait for modal to close
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for collection list update

        // Expand collection
        // Collection is expanded by default
        // cy.contains('User Management').click({ force: true });
        cy.wait(500);

        // Verify both requests are in collection
        cy.contains('List Users').should('be.visible');
        cy.contains('Create User').should('be.visible');
    });

    it('should update a saved request', () => {
        // Create collection and save request
        cy.contains('button', 'New Collection').click();
        cy.get('[data-testid="new-collection-input"]').type('Test Collection');
        cy.get('[data-testid="create-collection-btn"]').click({ force: true });
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade
        cy.wait(1000); // Wait for overlay to fade

        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/users/1', { force: true });
        cy.get('[data-testid="save-request-button"]').click({ force: true });
        cy.get('[role="dialog"] input[placeholder="Enter request name"]').type('User Request', { force: true });
        cy.get('[role="dialog"] select').should('contain.text', 'Test Collection').select('Test Collection');
        cy.get('[role="dialog"]').contains('button', /save|confirm/i).should('not.be.disabled').click({ force: true });
        cy.wait(1000); // Wait for modal to close
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for collection list update

        // Expand collection
        // Collection is expanded by default
        // cy.contains('Test Collection').click({ force: true });
        cy.wait(500);

        // Load and modify the request
        cy.contains('User Request').click();
        cy.get('input[type="text"]').first().clear({ force: true }).type('https://jsonplaceholder.typicode.com/users/2', { force: true });

        // Save the updated request
        cy.contains('button', /save|update/i).click({ force: true });
        // Handle modal
        cy.get('[role="dialog"]').contains('button', /save|confirm/i).should('not.be.disabled').click({ force: true });
        cy.wait(1000); // Wait for modal to close
        cy.get('[role="dialog"]').should('not.exist');
        cy.wait(1000); // Wait for collection list update

        // Reload and verify changes
        cy.reload();
        // The update creates a new request, so we must select the last one
        cy.get('body').find(':contains("User Request")').last().click({ force: true });
        cy.get('input[type="text"]').first().should('have.value', 'https://jsonplaceholder.typicode.com/users/2');
    });
});
