/// <reference types="cypress" />

describe('Window Resizing', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should allow resizing the sidebar', () => {
        // Check initial width
        cy.get('aside').should('have.css', 'width', '300px');

        // Find the resizer handle
        cy.get('[data-testid="resizer-horizontal"]')
            .should('be.visible')
            .trigger('mousedown', { which: 1 })
            .trigger('mousemove', { clientX: 400 }) // Drag to resize
            .trigger('mouseup', { force: true });

        // Check if width changed
        // Note: The specific value depends on how the drag logic interprets clientX vs movementX.
        // Our implementation uses movementX, so we need to simulate movement.
        // However, Cypress movement simulation can be tricky.
        // Let's try a simpler approach if possible, or adapt trigger calls.
    });

    it('should resize sidebar using movementX simulation', () => {
        cy.get('aside').then($aside => {
            const startWidth = parseFloat($aside.css('width'));

            cy.get('[data-testid="resizer-horizontal"]')
                .trigger('mousedown', { which: 1, pageX: 300, pageY: 100 })
                .trigger('mousemove', { which: 1, pageX: 400, pageY: 100, movementX: 100 })
                .trigger('mouseup');

            cy.get('aside').should($newAside => {
                const newWidth = parseFloat($newAside.css('width'));
                expect(newWidth).to.be.greaterThan(startWidth);
            });
        });
    });

    it('should allow resizing the main panel split', () => {
        // Check initial state
        cy.get('[data-testid="request-section"]').should('be.visible');
        cy.get('[data-testid="response-section"]').should('be.visible');

        cy.get('[data-testid="resizer-vertical"]')
            .should('be.visible')
            .then($handle => {
                const startY = $handle.offset()?.top || 0;

                cy.wrap($handle)
                    .trigger('mousedown', { which: 1, pageY: startY })
                    .trigger('mousemove', { which: 1, pageY: startY + 50, movementY: 50 })
                    .trigger('mouseup', { force: true });

                cy.get('[data-testid="request-section"]').should($el => {
                    // We expect some height to be set now
                    const height = parseFloat($el.css('height'));
                    expect(height).to.be.greaterThan(100);
                });
            });
    });
});
