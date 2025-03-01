Cypress.Commands.add("login", () => {
    cy.fixture("testData").then((data) => {
      cy.visit("/");
      cy.get('[data-test="username"]').type(data.validUser.username);
      cy.get('[data-test="password"]').type(data.validUser.password);
      cy.get('[data-test="login-button"]').click();
    });
  });