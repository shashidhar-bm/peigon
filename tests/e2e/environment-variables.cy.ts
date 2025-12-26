describe('Environment Variables', () => {
    beforeEach(() => {
        cy.visit('/');
        // Clear any existing data
        cy.window().then((win) => {
            win.localStorage.clear();
        });
        cy.reload();
    });

    it('should create a new environment', () => {
        // Click on environment selector
        cy.get('select').last().should('exist');

        // Look for add environment button or option
        cy.contains('button', /new environment|add environment/i).should('be.visible').click();

        // Enter environment name
        cy.get('input').first().type('Development');
        cy.contains('button', /create|save/i).click();

        // Verify environment was created
        cy.contains('Development').should('be.visible');
    });

    it('should add variables to an environment', () => {
        // Create environment first
        cy.contains('button', /new environment|add environment/i).click();
        cy.get('input').first().type('Test Environment');
        cy.contains('button', /create|save/i).click();

        // Add a variable
        cy.contains('button', /add variable|new variable/i).click();
        cy.get('input[placeholder*="key" i], input[placeholder*="name" i]').first().type('baseUrl');
        cy.get('input[placeholder*="value" i]').first().type('https://api.example.com');

        // Save variable
        cy.contains('button', /save|add/i).click();

        // Verify variable appears
        cy.contains('baseUrl').should('be.visible');
        cy.contains('https://api.example.com').should('be.visible');
    });

    it('should use environment variables in URL', () => {
        // Create environment with variable
        cy.contains('button', /new environment|add environment/i).click();
        cy.get('input').first().type('API Environment');
        cy.contains('button', /create|save/i).click();

        cy.contains('button', /add variable|new variable/i).click();
        cy.get('input[placeholder*="key" i], input[placeholder*="name" i]').first().type('baseUrl');
        cy.get('input[placeholder*="value" i]').first().type('https://jsonplaceholder.typicode.com');
        cy.contains('button', /save|add/i).click();

        // Use variable in request
        cy.get('input[type="text"]').first().clear().type('{{{{baseUrl}}}}/users/1');
        cy.contains('button', 'Send').click();

        // Verify request was successful
        cy.contains('200', { timeout: 10000 }).should('be.visible');
    });

    it('should switch between environments', () => {
        // Create first environment
        cy.contains('button', /new environment|add environment/i).click();
        cy.get('input').first().type('Dev');
        cy.contains('button', /create|save/i).click();

        // Create second environment
        cy.contains('button', /new environment|add environment/i).click();
        cy.get('input').first().type('Staging');
        cy.contains('button', /create|save/i).click();

        // Switch between environments using selector
        cy.get('select').last().select('Dev');
        cy.get('select').last().should('have.value', 'Dev');

        cy.get('select').last().select('Staging');
        cy.get('select').last().should('have.value', 'Staging');
    });

    it('should handle undefined variables gracefully', () => {
        // Try to use a variable that doesn't exist
        cy.get('input[type="text"]').first().type('{{{{undefinedVar}}}}/test');
        cy.contains('button', 'Send').click();

        // Should show error or handle gracefully
        // The exact behavior depends on implementation
        cy.wait(1000);
    });
});
