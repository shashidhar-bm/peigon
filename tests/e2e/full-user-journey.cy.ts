describe('Full User Journey', () => {
    beforeEach(() => {
        cy.visit('/');
        // Start with clean slate
        cy.window().then((win) => {
            win.localStorage.clear();
        });
        cy.reload();
    });

    it('should complete a full realistic API testing workflow', () => {
        // STEP 1: Create an environment with variables
        cy.log('Creating environment with variables');
        cy.get('[data-testid="new-environment-btn"]').click();
        cy.get('[data-testid="env-name-input"]').type('Development');
        
        // Add baseUrl variable before saving
        cy.get('[data-testid="add-variable-btn"]').click();
        cy.get('input[placeholder="Key"]').first().type('baseUrl');
        cy.get('input[placeholder="Value"]').first().type('https://jsonplaceholder.typicode.com');

        // Add userId variable
        cy.get('[data-testid="add-variable-btn"]').click();
        cy.get('input[placeholder="Key"]').last().type('userId');
        cy.get('input[placeholder="Value"]').last().type('1');
        
        // Now save the environment with variables
        cy.contains('button', /^Create$|^Save$/i).click();

        // STEP 2: Create a collection
        cy.log('Creating collection');
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('User API Tests');
        cy.contains('button', 'Create').click({ force: true });

        // STEP 3: Make a GET request using environment variables
        cy.log('Making GET request with environment variables');
        cy.get('[data-testid="method-selector"]').should('be.visible').select('GET');
        // Type URL with environment variables - use double braces for variable syntax
        cy.get('input[type="text"]').first().type('{{baseUrl}}/users/{{userId}}', { parseSpecialCharSequences: false });
        cy.contains('button', 'Send').click();

        // Verify response
        cy.contains('200', { timeout: 10000 }).should('be.visible');
        cy.contains('"id"').should('be.visible');

        // STEP 4: Save the GET request to collection
        cy.log('Saving GET request to collection');
        cy.contains('button', /save|save request/i).click({ force: true });
        cy.contains('Save Request', { timeout: 2000 }).should('be.visible');
        cy.wait(1000);
        cy.get('[role="dialog"] input[placeholder="Enter request name"]').type('Get User by ID', { force: true });
        // Explicitly select the collection
        cy.get('[role="dialog"] select').should('contain.text', 'User API Tests').select('User API Tests', { force: true });
        cy.get('[role="dialog"]').contains('button', /save|confirm/i).should('not.be.disabled').click({ force: true });
        // Wait for modal to close
        cy.get('[role="dialog"]', { timeout: 3000 }).should('not.exist');
        cy.wait(1000); // Wait for collection tree to update

        // STEP 5: Make a POST request with JSON body
        cy.log('Making POST request with JSON body');
        cy.get('[data-testid="method-selector"]').select('POST');
        cy.get('input[type="text"]').first().clear({ force: true }).type('{{baseUrl}}/users', { parseSpecialCharSequences: false, force: true });

        // Add JSON body
        cy.contains('button', 'Body').click();
        cy.get('[data-testid="body-type-selector"]').select('json');
        const userData = '{\n  "name": "John Doe",\n  "email": "john@example.com",\n  "username": "johndoe"\n}';
        cy.get('textarea').type(userData, { parseSpecialCharSequences: false });

        // Send request
        cy.contains('button', 'Send').click();
        cy.contains('201', { timeout: 10000 }).should('be.visible');

        // STEP 6: Save the POST request to collection
        cy.log('Saving POST request to collection');
        cy.contains('button', /save|save request/i).click({ force: true });
        cy.contains('Save Request', { timeout: 2000 }).should('be.visible');
        cy.wait(1000);
        cy.get('[role="dialog"] input[placeholder="Enter request name"]').type('Create New User', { force: true });
        // Explicitly select the collection
        cy.get('[role="dialog"] select').should('contain.text', 'User API Tests').select('User API Tests', { force: true });
        cy.get('[role="dialog"]').contains('button', /save|confirm/i).should('not.be.disabled').click({ force: true });
        cy.get('[role="dialog"]', { timeout: 3000 }).should('not.exist');
        cy.wait(1000); // Wait for collection tree to update

        // STEP 7: Verify both requests are in the collection
        cy.log('Verifying collection contents');
        cy.contains('Get User by ID').should('be.visible');
        cy.contains('Create New User').should('be.visible');

        // STEP 8: Load a saved request from collection
        cy.log('Loading saved request from collection');
        cy.contains('Get User by ID').click();
        cy.get('[data-testid="method-selector"]').should('have.value', 'GET');
        cy.get('input[type="text"]').first().should('contain.value', 'baseUrl');

        // STEP 9: Check request history
        cy.log('Checking request history');
        cy.contains('button', 'History').click();
        cy.contains('users').should('be.visible');

        // STEP 10: Create a second environment to test switching
        cy.log('Creating second environment');
        cy.contains('button', /new environment|add environment/i).click();
        cy.get('[data-testid="env-name-input"]').type('Staging');
        cy.contains('button', /^Create$|^Save$/i).click();
        
        // Wait for environment to be created and modal to close
        cy.get('body').should('not.contain', 'Environment Name');
        cy.wait(500);
        
        // Edit the environment to add variables
        cy.get('[data-testid="edit-environment-btn"]').click();
        cy.get('[data-testid="add-variable-btn"]').should('be.visible').click();
        cy.get('input[placeholder="Key"]').first().type('baseUrl');
        cy.get('input[placeholder="Value"]').first().type('https://staging-api.example.com');
        cy.contains('button', /^Save$/i).click();
        // Wait for modal to close
        cy.get('body').should('not.contain', 'Environment Name');

        // STEP 11: Switch between environments
        cy.log('Switching between environments');
        cy.get('[data-testid="environment-selector"]').select('Development');
        cy.wait(500);
        cy.get('[data-testid="environment-selector"]').select('Staging');
        cy.wait(500);

        // STEP 12: Verify the workflow is complete
        cy.log('Workflow complete!');
        // Switch back to Collections tab if we're on History tab
        cy.contains('button', 'Collections').click({ force: true });
        cy.wait(500);
        cy.contains('User API Tests', { timeout: 5000 }).should('be.visible');
        cy.contains('Get User by ID', { timeout: 5000 }).should('be.visible');
        cy.contains('Create New User', { timeout: 5000 }).should('be.visible');
    });

    it('should handle a complete testing session with multiple requests', () => {
        // Create collection
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('Complete Test Suite');
        cy.contains('button', 'Create').click();

        // Test 1: GET request
        cy.get('input[type="text"]').first().type('https://jsonplaceholder.typicode.com/posts/1');
        cy.contains('button', 'Send').click();
        cy.contains('200', { timeout: 10000 }).should('be.visible');

        // Test 2: POST request
        cy.get('[data-testid="method-selector"]').select('POST');
        cy.get('input[type="text"]').first().clear().type('https://jsonplaceholder.typicode.com/posts');
        cy.contains('button', 'Body').click();
        cy.get('[data-testid="body-type-selector"]').select('json');
        cy.get('textarea').type('{"title":"Test","body":"Content"}', { parseSpecialCharSequences: false });
        cy.contains('button', 'Send').click();
        cy.contains('201', { timeout: 10000 }).should('be.visible');

        // Test 3: PUT request
        cy.get('[data-testid="method-selector"]').select('PUT');
        cy.get('input[type="text"]').first().clear().type('https://jsonplaceholder.typicode.com/posts/1');
        cy.contains('button', 'Send').click();
        cy.contains('200', { timeout: 10000 }).should('be.visible');

        // Test 4: DELETE request
        cy.get('[data-testid="method-selector"]').select('DELETE');
        cy.contains('button', 'Send').click();
        cy.contains('200', { timeout: 10000 }).should('be.visible');

        // Verify all requests are in history
        cy.contains('button', 'History').click();
        cy.contains('posts').should('be.visible');
    });
});
