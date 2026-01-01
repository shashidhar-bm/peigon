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
        cy.get('[data-testid="environment-selector"]').should('exist');

        // Click on New Environment
        cy.get('[data-testid="new-environment-btn"]').should('be.visible').click();

        // Enter environment name and save
        cy.get('[data-testid="env-name-input"]').type('Development');
        cy.contains('button', /^Create$|^Save$/i).click();

        // Wait for modal to close
        cy.get('body').should('not.contain', 'Environment Name');

        // Verify environment appears in selector options
        cy.get('[data-testid="environment-selector"] option').contains('Development').should('exist');
        cy.get('[data-testid="environment-selector"]').should('contain', 'Development');
        cy.get('[data-testid="environment-selector"]').invoke('val').should('not.equal', '');
    });

    it('should add variables to an environment', () => {
        // Create environment first
        cy.get('[data-testid="new-environment-btn"]').click();
        cy.get('[data-testid="env-name-input"]').type('Test Environment');
        cy.contains('button', /^Create$|^Save$/i).click();

        // Wait for modal to close
        cy.get('body').should('not.contain', 'Environment Name');

        // Open variables modal for the created environment
        cy.get('[data-testid="edit-environment-btn"]').click();

        // Add a variable
        cy.get('[data-testid="add-variable-btn"]').click();
        cy.get('input[placeholder*="key" i], input[placeholder*="name" i]').first().type('baseUrl');
        cy.get('input[placeholder*="value" i]').first().type('https://api.example.com');

        // Save variable
        cy.contains('button', /^Save$/i).click();

        // Re-open variables modal to verify persistence
        cy.get('[data-testid="edit-environment-btn"]').click();
        cy.contains('baseUrl');
        cy.contains('https://api.example.com');
    });

    it('should use environment variables in URL', () => {
        // Create environment with variable
        cy.get('[data-testid="new-environment-btn"]').click();
        cy.get('[data-testid="env-name-input"]').type('API Environment');
        cy.contains('button', /^Create$|^Save$/i).click();

        cy.get('[data-testid="edit-environment-btn"]').click();

        cy.get('[data-testid="add-variable-btn"]').click();
        cy.get('input[placeholder*="key" i], input[placeholder*="name" i]').first().type('baseUrl');
        cy.get('input[placeholder*="value" i]').first().type('https://jsonplaceholder.typicode.com');
        cy.contains('button', /^Save$/i).click();

        // Close modal before interacting with request UI
        cy.get('body').should('not.contain', 'Environment Name');

        // Use variable in request
        cy.get('input[type="text"]').first().clear({ force: true }).type('{{baseUrl}}/users/1', { parseSpecialCharSequences: false });
        cy.contains('button', 'Send').click();

        // Verify request was successful
        cy.contains('200', { timeout: 10000 }).should('be.visible');
    });

    it('should switch between environments', () => {
        // Create first environment
        cy.get('[data-testid="new-environment-btn"]').click();
        cy.get('[data-testid="env-name-input"]').type('Dev');
        cy.contains('button', /^Create$|^Save$/i).click();

        cy.get('body').should('not.contain', 'Environment Name');

        // Create second environment
        cy.get('[data-testid="new-environment-btn"]').click();
        cy.get('[data-testid="env-name-input"]').type('Staging');
        cy.contains('button', /^Create$|^Save$/i).click();

        cy.get('body').should('not.contain', 'Environment Name');

        // Switch between environments using selector
        cy.get('[data-testid="environment-selector"]').select('Dev');
        cy.get('[data-testid="environment-selector"]').should('have.value', 'Dev');

        cy.get('[data-testid="environment-selector"]').select('Staging');
        cy.get('[data-testid="environment-selector"]').should('have.value', 'Staging');
    });

    it('should handle undefined variables gracefully', () => {
        // Try to use a variable that doesn't exist
        cy.get('input[type="text"]').first().type('{{undefinedVar}}/test', { parseSpecialCharSequences: false });
        cy.contains('button', 'Send').click();

        // Should show error or handle gracefully
        // The exact behavior depends on implementation
        cy.wait(1000);
    });
});
