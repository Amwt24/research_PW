describe('Task Flow and State Debugger E2E Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the application, verify default state, and allow adding tasks', () => {
    // 1. Check title and default header
    cy.get('h1').contains('STATECHECKER').should('exist');
    cy.contains('Design Authentication Architecture').should('exist');
    cy.contains('Configure Cypress E2E Suite').should('exist');

    // 2. Check Redux State Inspector shows raw JSON
    cy.get('#tab-state-btn').click();
    cy.get('#store-state-raw').should('contain', 'Design Authentication Architecture');
    cy.get('#store-state-raw').should('contain', 'Configure Cypress E2E Suite');

    // 3. Check Action Logs tab contains initial @@INIT log
    cy.get('#tab-logs-btn').click();
    cy.get('[data-testid="log-entry"]').should('have.length.gte', 1);
    cy.get('[data-testid="log-entry"]').first().should('contain', '@@INIT');

    // 4. Add a new task
    cy.get('#task-title-input').type('E2E Cypress Test Task');
    cy.get('#task-desc-input').type('Verification of the debugger application');
    cy.get('#task-priority-select').select('high');
    cy.get('#add-task-btn').click();

    // 5. Verify task was added to list
    cy.contains('E2E Cypress Test Task').should('exist');

    // 6. Verify debugger recorded the 'tasks/addTask' action
    cy.get('#tab-logs-btn').click();
    cy.get('[data-testid="log-entry"]').should('contain', 'tasks/addTask');

    // 7. Verify store state was updated with new task
    cy.get('#tab-state-btn').click();
    cy.get('#store-state-raw').should('contain', 'E2E Cypress Test Task');
    cy.get('#store-state-raw').should('contain', 'Verification of the debugger application');
  });

  it('should support updating task status, clearing logs, and resetting state', () => {
    // 1. Change status of the second task (Configure Cypress E2E Suite)
    // Find the change status button and click it
    cy.contains('Configure Cypress E2E Suite')
      .parents('[data-testid^="task-card-"]')
      .find('[data-testid^="status-btn-"]')
      .click();

    // Verify task state changes (should transition status to "done" or other depending on sequence)
    cy.get('#tab-logs-btn').click();
    cy.get('[data-testid="log-entry"]').should('contain', 'tasks/updateTaskStatus');

    // 2. Clear Logs
    cy.get('#clear-logs-btn').click();
    cy.get('[data-testid="log-entry"]').should('have.length', 1); // Should only have clearLogs action log
    cy.get('[data-testid="log-entry"]').should('contain', 'tasks/clearLogs');

    // 3. Reset Store to original state
    cy.get('#reset-store-btn').click();
    // Default tasks should exist
    cy.contains('Design Authentication Architecture').should('exist');
    cy.contains('Configure Cypress E2E Suite').should('exist');
  });
});
