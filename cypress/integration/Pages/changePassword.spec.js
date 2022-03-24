describe("Change Password Page", () => {
    const url = "http://localhost:3000";
      
    beforeEach(() => {
      cy.visit(url + "/changePassword");
    });
  
    it('it should have "Data Mining System" in the header', () => {
      cy.get("#header").should("have.text", "Data Mining System");
    });

    it('it should not have profile icon in the header', () => {
      cy.get("#profile-icon").should("not.exist");
    });

    it("it has a double input form container", () => {
      cy.get("form")
        .parent()
        .should("have.class", "dms-double-input-form-container");
    });

    it('it should have "Reset Password" title', () => {
      cy.contains("Reset Password");
    });

    it('has an old password input with placeholder "Old password"', () => {
      cy.get("#input1").should("have.attr", "placeholder", "Old password");
    });
  
    it('has a new password input with placeholder "New password"', () => {
      cy.get("#input2").should("have.attr", "placeholder", "New password");
    });
  
    it("accepts old password input", () => {
      const input = "old_password";
      cy.get("#input1").type(input).should("have.value", input);
    });
  
    it("accepts new password input", () => {
      const input = "new_password";
      cy.get("#input2").type(input).should("have.value", input);
    });

    it('it has a "Submit" button', () => {
      cy.get("form").find("button").should("have.text", "Submit");
    });
    
    it("should show error message if either input is blank", () => {
      cy.get("#submit-button").click();
      cy.contains("Please complete all fields.");
    });

    it("should show error message if new password input is blank", () => {
      cy.get("#input2").type("some input");
      cy.get("#submit-button").find("button").click();
      cy.contains("Please complete all fields.");
    });
  
    it("should show error message if old password input is blank", () => {
      cy.get("#input1").type("some input");
      cy.get("#submit-button").find("button").click();
      cy.contains("Please complete all fields.");
    });

    it("should show error message if new password is not strong enough", () => {
      cy.get("#input1").type("some input");
      cy.get("#input2").type("weakPass");
      cy.get("#submit-button").find("button").click();
      cy.contains("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit and one special character.");
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
                newPassword: newPassword
              },
      }).as("backendAPI");
      cy.contains("There was an error processing this request. Please try again later.");
    });
  });