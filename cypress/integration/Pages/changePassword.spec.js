describe("Change Password Page", () => {
  const url = "http://localhost:3000";

  beforeEach(() => {
    cy.visit(url + "/changePassword");
  });

  it('it should have "Data Mining System" in the header', () => {
    cy.get("#header").should("have.text", "Data Mining System");
  });

  beforeEach(() => {
    cy.visit(url);

    cy.request({
      url: "http://localhost:4433/auth/login",
      method: "POST",
      body: {
        username: testUsername,
        password: testTempPassword,
      },
    }).then((response) => {
      expect(response.body.token).to.not.be.undefined;

      const token = response.body.token;
      sessionStorage.setItem("token", `Bearer ${token}`);

      cy.visit(url + "/changePassword");
    });
  });

  it('it should have "Data Mining System" in the header', () => {
    cy.get("#header").find("p").should("have.text", "Data Mining System");
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
