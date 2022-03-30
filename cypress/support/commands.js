// https://kubajz.dev/cypress-authentication-route2
Cypress.Commands.add("login", (path, visitOptions) => {
  const options = {
    method: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    body: {
      client_id: Cypress.env("CLIENT_ID"),
      client_secret: Cypress.env("CLIENT_SECRET"),
      refresh_token: Cypress.env("REFRESH_TOKEN"),
      grant_type: "refresh_token",
      audience: Cypress.env("IAP_AUDIENCE"),
    },
    // Restrict cypress from showing errored response by default.
    // It would dump the whole request object, including env values.
    failOnStatusCode: false,
  };

  return cy.request(options).then((response) => {
    if (response.status !== 200) {
      throw new Error(
        `Request to get auth token failed, response: ${JSON.stringify(
          response.body
        )}`
      );
    }

    const { id_token: token } = response.body;

    return cy.visit(path || "/", {
      headers: { Authorization: `Bearer ${token}` },
      ...visitOptions,
    });
  });
});
