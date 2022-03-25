describe("Change Password Page", () => {
  const url = "http://localhost:3000";

  beforeEach(() => {
    cy.visit(url + "/changePassword");
  });

  it('it should have "Data Mining System" in the header', () => {
    cy.get("#header").should("have.text", "Data Mining System");
  });

    it('it should have "Data Mining System" in the header', () => {
      cy.get("#header").should("have.text", "Data Mining System");
    });

    it("it should not have profile icon in the header", () => {
      cy.get("#profile-icon").should("not.exist");
    });

    it("it has a double input form container", () => {
      cy.get("form")
        .parent()
        .should("have.class", "dms-double-input-form-container");
    });

  it("should show error message if old password doesn't match temporary password", () => {
    // Ignore uncaught exception resulting from failing to fetch some stuff from the home
    // Page which tries to load before we get rerouted to login page
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    });

    const oldPassword = "someinput";
    const newPassword = "Str0ngPass!";

    cy.get("#input1").type(oldPassword);
    cy.get("#input2").type(newPassword);

    cy.get("#submit-button").find("button").click();
    cy.intercept("POST", "http://localhost:4433/auth/update-password", {
      statusCode: 401,
      body: {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    }).as("backendAPI");
    cy.contains(
      "There was an error processing this request. Please try again later."
    );
  });
});
