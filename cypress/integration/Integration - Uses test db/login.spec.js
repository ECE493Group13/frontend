import { test1Username, test1Password, test2Username, test2Password } from "../secrets.js";

describe("Login", () => {
    const url = "http://localhost:3000";
  
    beforeEach(() => {
      cy.visit(url);
    });
  
    it('should show error message if username or password is incorrect', () => {
      cy.get("#input1").type(test1Username);
      cy.get("#input2").type("incorrect_password");
  
      cy.get(".dms-button").contains("Log in").click();
  
      cy.contains("Incorrect username or password.");
    });

    it('should route to home page on complete login', () => {
        cy.get("#input1").type(test1Username);
        cy.get("#input2").type(test1Password);

        cy.get(".dms-button").contains("Log in").click();

        cy.url().should('include', '/home');
    });

    it('should route to home page on complete login', () => {
        cy.get("#input1").type(test2Username);
        cy.get("#input2").type(test2Password);

        cy.get(".dms-button").contains("Log in").click();

        cy.url().should('include', '/changePassword');
    });
  });