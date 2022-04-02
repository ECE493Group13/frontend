import { test1Username, test1Password } from "../secrets.js";

describe("Login", () => {
    const url = "http://localhost:3000";
  
    beforeEach(() => {
      cy.visit(url);

      // Login
      cy.get("#input1").type(test1Username);
      cy.get("#input2").type(test1Password);
      cy.get(".dms-button").contains("Log in").click();
    });
  
    it('should log user out without errors', () => {
        cy.get("#profile-icon").click();
        cy.get(".dms-button").contains("Log out").click();
        cy.url().should('include', '/');
    });
  });