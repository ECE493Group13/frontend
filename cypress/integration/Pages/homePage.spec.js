describe("Home Page", () => {
  const url = "http://localhost:3000";

  describe("Keyword Bar", () => {
    beforeEach(() => {
      cy.setToken();
      cy.intercept(
        {
          method: "GET",
          path: "/filter-task",
        },
        {
          fixture: "sampleDatasets",
        }
      ).as("sampleDatasets");
      cy.visit(url + "/home");
      cy.wait(["@sampleDatasets"]);
    });

    it ('should not send a request to filter-task if keywords are empty', () => {
      cy.intercept(
        {
          method: "GET",
          path: "/filter-task",
        }
      ).as("interceptFilter");

      cy.get(".keyword-submit-button").click();

      cy.wait(["@interceptFilter"]);

      // Expect API call to fail to be intercepted
      cy.on("fail", (err) => {
        expect(err.message).to.include(
          "`cy.wait()` timed out waiting `100ms` for the 1st request to the route: `interceptFilter`. No request ever occurred."
        );
        done();
      });
    });

    it ('should send keywords to request in lowercase', () => {
      cy.intercept(
        {
          method: "POST",
          path: "/filter-task",
        },
        {
          fixture: "sampleFilterTask",
        }
      ).as("interceptFilter");

      cy.get(".dms-keyword-bar").type("KEYWORD");
      cy.get(".keyword-submit-button").click();

      cy.wait("@interceptFilter").then((req) => {
        expect(req.request.body.keywords[0]).to.equal('keyword');
      });
    });

    it ('should send keywords when enter is typed versus clicking the button', () => {
      cy.intercept(
        {
          method: "POST",
          path: "/filter-task",
        },
        {
          fixture: "sampleFilterTask",
        }
      ).as("interceptFilter");

      cy.get(".dms-keyword-bar").type("test{enter}");

      cy.wait("@interceptFilter").then((req) => {
        expect(req.request.body.keywords[0]).to.equal('test');
      });
    });
  });

  describe("Dataset Tab", () => {
    beforeEach(() => {
      cy.setToken();
      cy.intercept(
        {
          method: "GET",
          path: "/filter-task",
        },
        {
          fixture: "sampleDatasets",
        }
      ).as("sampleDatasets");
      cy.visit(url + "/home");
      cy.wait(["@sampleDatasets"]);
    });

    it('should have "Data Mining System" in the header', () => {
      cy.get("#header").should("have.text", "Data Mining System");
    });

    it("should have a clickable profile icon in the header", () => {
      cy.get("#profile-icon")
        .invoke("css", "cursor")
        .should("equal", "pointer");
    });

    it('should have "New Dataset" title', () => {
      cy.get(".new-dataset-text").should("have.text", "New Dataset");
    });

    it("should have keyword bar with placeholder text", () => {
      cy.get(".dms-keyword-bar").should(
        "have.attr",
        "placeholder",
        "Space separated keywords..."
      );
    });

    it("should have submit button for keywords with plus icon", () => {
      cy.get(".keyword-submit-button")
        .find("svg")
        .should("have.attr", "data-icon", "plus");
    });

    it("should have dataset tab", () => {
      cy.get(".dms-tab-navigator").contains("Datasets");
    });

    it("should have models tab", () => {
      cy.get(".dms-tab-navigator").contains("Models");
    });

    it("should have dataset tab selected", () => {
      cy.get(".active").contains("Datasets");
    });

    it("should show loading indicator while fetching datasets", () => {
      cy.intercept(
        {
          method: "GET",
          path: "/filter-task",
        },
        (req) => {
          // Delay response so we catch loading indicator
          req.on("response", (res) => {
            res.setThrottle(1000);
          });
        },
        {
          fixture: "sampleDatasets",
        }
      ).as("delayedIntercept");

      cy.visit(url + "/home");

      cy.get(".dms-loading-indicator").should("exist");

      cy.wait(["@delayedIntercept"]);
    });

    it("should show message when no datasets are returned", () => {
      cy.intercept(
        {
          method: "GET",
          path: "/filter-task",
        },
        {
          fixture: "emptyArray",
        }
      ).as("emptyResponse");

      cy.visit(url + "/home");
      cy.wait(["@emptyResponse"]);

      cy.contains(
        "You have no datasets. Enter keywords into the input above to generate a new dataset."
      );
    });

    it("should not show erroneous dataset", () => {
      cy.contains("Sample Error").should("not.exist");
    });
  });

  describe("Models Tab", () => {
    beforeEach(() => {
      cy.setToken();
      // filter-task is triggered before we can click on models tab
      cy.intercept(
        {
          method: "GET",
          path: "/filter-task",
        },
        {
          fixture: "sampleDatasets",
        }
      ).as("sampleDatasets");
      cy.intercept(
        {
          method: "GET",
          path: "/train-task",
        },
        {
          fixture: "sampleModels",
        }
      ).as("sampleModels");
      cy.visit(url + "/home");
      cy.wait(["@sampleDatasets"]);
      cy.get(".dms-tab-navigator").contains("Models").click();
      cy.wait(["@sampleModels"]);
    });

    it('should have "Data Mining System" in the header', () => {
      cy.get("#header").should("have.text", "Data Mining System");
    });

    it("should have dataset tab", () => {
      cy.get(".dms-tab-navigator").contains("Datasets");
    });

    it("it should have models tab", () => {
      cy.get(".dms-tab-navigator").contains("Models");
    });

    it("should have models tab selected", () => {
      cy.get(".active").contains("Models");
    });

    it("should show loading indicator while fetching models", () => {
      cy.intercept(
        {
          method: "GET",
          path: "/filter-task",
        },
        {
          fixture: "sampleDatasets",
        }
      ).as("sampleDatasets");
      cy.intercept(
        {
          method: "GET",
          path: "/train-task",
        },
        (req) => {
          // Delay response so we catch loading indicator
          req.on("response", (res) => {
            res.setThrottle(2000);
          });
        },
        {
          fixture: "sampleModels",
        }
      ).as("delayedIntercept");

      cy.visit(url + "/home");
      cy.wait(["@sampleDatasets"]);
      cy.get(".dms-tab-navigator").contains("Models").click();

      cy.get(".dms-loading-indicator").should("exist");

      cy.wait(["@delayedIntercept"]);
    });

    it("should show message when no models are returned", () => {
      cy.intercept(
        {
          method: "GET",
          path: "/filter-task",
        },
        {
          fixture: "sampleDatasets",
        }
      ).as("sampleDatasets");
      cy.intercept(
        {
          method: "GET",
          path: "/train-task",
        },
        {
          fixture: "emptyArray",
        }
      ).as("emptyResponse");

      cy.visit(url + "/home");
      cy.wait(["@sampleDatasets"]);
      cy.get(".dms-tab-navigator").contains("Models").click();
      cy.wait(["@emptyResponse"]);

      cy.contains(
        "You have no models. Train your datasets to generate a new model."
      );
    });
  });
});
