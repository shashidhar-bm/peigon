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
        cy.contains('button', /new environment|add environment/i).click();
        cy.get('input').first().type('Development');
        cy.contains('button', /create|save/i).click();

        // Add baseUrl variable
        cy.contains('button', /add variable|new variable/i).click();
        cy.get('input[placeholder*="key" i], input[placeholder*="name" i]').first().type('baseUrl');
        cy.get('input[placeholder*="value" i]').first().type('https://jsonplaceholder.typicode.com');
        cy.contains('button', /save|add/i).click();

        // Add userId variable
        cy.contains('button', /add variable|new variable/i).click();
        cy.get('input[placeholder*="key" i], input[placeholder*="name" i]').last().type('userId');
        cy.get('input[placeholder*="value" i]').last().type('1');
        cy.contains('button', /save|add/i).click();

        // STEP 2: Create a collection
        cy.log('Creating collection');
        cy.contains('button', 'New Collection').click();
        cy.get('input').first().type('User API Tests');
        cy.contains('button', 'Create').click();

        // STEP 3: Make a GET request using environment variables
        cy.log('Making GET request with environment variables');
        cy.get('[data-testid="method-selector"]').should('be.visible').select('GET');
        cy.get('input[type="text"]').first().type('{{{{baseUrl}}}}/users/{{{{userId}}}}');
        cy.contains('button', 'Send').click();

        // Verify response
        cy.contains('200', { timeout: 10000 }).should('be.visible');
        cy.contains('"id"').should('be.visible');

        // STEP 4: Save the GET request to collection
        cy.log('Saving GET request to collection');
        cy.contains('button', /save|save request/i).click();
        cy.get('input[placeholder*="name" i], input[placeholder*="request" i]').type('Get User by ID');
        cy.contains('button', /save|confirm/i).click();

        // STEP 5: Make a POST request with JSON body
        cy.log('Making POST request with JSON body');
        cy.get('[data-testid="method-selector"]').select('POST');
        cy.get('input[type="text"]').first().clear().type('{{{{baseUrl}}}}/users');

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
        cy.contains('button', /save|save request/i).click();
        cy.get('input[placeholder*="name" i], input[placeholder*="request" i]').type('Create New User');
        cy.contains('button', /save|confirm/i).click();

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
        cy.get('input').first().type('Staging');
        cy.contains('button', /create|save/i).click();

        // Add different baseUrl for staging
        cy.contains('button', /add variable|new variable/i).click();
        cy.get('input[placeholder*="key" i], input[placeholder*="name" i]').first().type('baseUrl');
        cy.get('input[placeholder*="value" i]').first().type('https://staging-api.example.com');
        cy.contains('button', /save|add/i).click();

        // STEP 11: Switch between environments
        cy.log('Switching between environments');
        cy.get('select').last().select('Development');
        cy.wait(500);
        cy.get('select').last().select('Staging');
        cy.wait(500);

        // STEP 12: Verify the workflow is complete
        cy.log('Workflow complete!');
        cy.contains('User API Tests').should('be.visible');
        cy.contains('Get User by ID').should('be.visible');
        cy.contains('Create New User').should('be.visible');
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
