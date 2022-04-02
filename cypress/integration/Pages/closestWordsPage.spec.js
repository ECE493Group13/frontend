describe("Hyperparameter Adjustment Page", () => {
  const url = "http://localhost:3000";

  beforeEach(() => {
    cy.setToken();

    cy.intercept(
      {
        method: "GET",
        path: "/filter-task",
      },
      {
        fixture: "emptyArray",
      }
    ).as("sampleDatasets");
    cy.visit(url + "/home");
    cy.wait(["@sampleDatasets"]);

    cy.intercept(
      {
        method: "GET",
        path: "/train-task",
      },
      {
        fixture: "sampleModels",
      }
    ).as("sampleModels");
    cy.get(".dms-tab-navigator").contains("Models").click();
    cy.wait(["@sampleModels"]);

    cy.get(".dms-button").contains("Validate").click();
    cy.visit(url + "/closestWords");
  });

  it('should have "Data Mining System" in the header', () => {
    cy.get("#header").should("have.text", "Data Mining System");
  });

  it("should have a clickable profile icon in the header", () => {
    cy.get("#profile-icon").invoke("css", "cursor").should("equal", "pointer");
  });

  it('should have "Closest Words" title', () => {
    cy.contains("Closest Words");
  });

  it('should have "Enter a word below to receive the n most similar words to it" subtitle', () => {
    cy.contains("Enter a word below to receive the n most similar words to it");
  });

  it('should have a text input with "Word" placeholder', () => {
    cy.get("[type='text']").should("have.attr", "placeholder", "Word");
  });

  it('should have a number input with default value 100', () => {
    cy.get("[type='number']").should("have.attr", "value", "100");
  });

  it("accepts word input", () => {
    const input = "word";
    cy.get("#closest-word-input").type(input).should("have.value", input);
  });

  it("accepts number input", () => {
    const input = 5;
    cy.get("#num-closest-word-input").clear().type(input).should("have.value", input);
  });

  it('should show error message if submit is clicked without entering word', () => {
    cy.get(".dms-button").contains("Submit").click();
    cy.contains("Please enter a word");
  });

  it('should show error message if non-number is entered in number field', () => {
    const input = "e";
    cy.get("#closest-word-input").type(input);

    cy.get("#num-closest-word-input").clear().type(input);
    cy.get(".dms-button").contains("Submit").click();
    cy.contains("Please enter a positive number");
  });

  it('should show error message if negative number is entered in number field', () => {
    const input = -5;
    cy.get("#closest-word-input").type(input);

    cy.get("#num-closest-word-input").clear().type(input).should("have.value", input);
    cy.get(".dms-button").contains("Submit").click();
    cy.contains("Please enter a positive number");
  });

  it('should not show table if no results', () => {
    cy.intercept(
      {
        method: "GET",
        path: "/verify/most-similar?word=word&count=100&trained_model_id=15",
      },
      {
        fixture: "emptyArray",
      }
    ).as("closestWords");

    cy.get("#closest-word-input").type("word");
    cy.get(".dms-button").contains("Submit").click();

    cy.wait(["@closestWords"]);

    cy.get("thbody").should("not.exist");
  });

  it('should show table on successful API call', () => {
    cy.intercept(
      {
        method: "GET",
        path: "/verify/most-similar?word=word&count=100&trained_model_id=15",
      },
      {
        fixture: "closestWords",
      }
    ).as("closestWords");
    
    cy.get("#closest-word-input").type("word");
    cy.get(".dms-button").contains("Submit").click();
    
    cy.wait(["@closestWords"]);

    cy.get("tbody").should("exist");
  });
});