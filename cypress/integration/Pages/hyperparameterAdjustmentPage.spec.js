describe("Hyperparameter Adjustment Page", () => {
  const url = "http://localhost:3000";

  beforeEach(() => {
    cy.setToken();

    cy.intercept(
      {
        method: 'GET',
        path: '/filter-task',
      },
      {
        fixture: 'sampleDatasets',
      },
    ).as('sampleDatasets')
    cy.visit(url + "/home");
    cy.wait(['@sampleDatasets']);

    cy.contains("Train").first().click(); 

    cy.intercept(
      {
        method: 'GET',
        path: '/train-task/suggest-hparams',
      },
      {
        fixture: 'hyperparamSuggestions',
      },
    ).as('hyperparamSuggestions')
    cy.visit(url + "/trainSettings");
    cy.wait(['@hyperparamSuggestions']);
  });

  it('should have "Data Mining System" in the header', () => {
    cy.get("#header").should("have.text", "Data Mining System");
  });

  it("should have a clickable profile icon in the header", () => {
    cy.get("#profile-icon")
      .invoke("css", "cursor")
      .should("equal", "pointer");;
  });

  it('should have correct embedding text placeholder', () => {
    cy.get('[for="embedding_size"] > .dms-number-input').should('have.attr', 'placeholder', '200');
  });

  it('should have correct epochs to train placeholder', () => {
    cy.get('[for="epochs_to_train"] > .dms-number-input').should('have.attr', 'placeholder', '15');
  });

  it('should have correct learning rate placeholder', () => {
    cy.get('[for="learning_rate"] > .dms-number-input').should('have.attr', 'placeholder', '0.025');
  });

  it('should have correct num neg samples placeholder', () => {
    cy.get('[for="num_neg_samples"] > .dms-number-input').should('have.attr', 'placeholder', '25');
  });

  it('should have correct batch size placeholder', () => {
    cy.get('[for="batch_size"] > .dms-number-input').should('have.attr', 'placeholder', '500');
  });

  it('should have correct concurrent steps placeholder', () => {
    cy.get('[for="concurrent_steps"] > .dms-number-input').should('have.attr', 'placeholder', '12');
  });

  it('should have correct window size placeholder', () => {
    cy.get('[for="window_size"] > .dms-number-input').should('have.attr', 'placeholder', '5');
  });

  it('should have correct min count placeholder', () => {
    cy.get('[for="min_count"] > .dms-number-input').should('have.attr', 'placeholder', '5');
  });

  it('should have correct subsample placeholder', () => {
    cy.get('[for="subsample"] > .dms-number-input').should('have.attr', 'placeholder', '0.001');
  });

  it('should have train model button', () => {
    cy.get('.dms-button').contains("Train Model");
  });
});
      