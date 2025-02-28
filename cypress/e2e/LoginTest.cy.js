describe("Login Tests", () => {
  beforeEach(function () {
    cy.visit("/"); // Visit the baseUrl defined in cypress.config.js
    cy.fixture("loginData").then((data) => {
      this.data = data;
    });
  });

  // Positive test cases
  it("TC_01 - Login with valid credentials", function () {
    cy.get("#user-name").clear().type(this.data.validUser.username);
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").click();
  });

  it("TC_02 - Login with other valid users", function () {
    this.data.otherValidUsers.forEach((user) => {
      cy.get("#user-name").clear().type(user.username);
      cy.get("#password").clear().type(user.password);
      cy.get("#login-button").click();
      cy.url().should("include", "/inventory.html");
      cy.get("#react-burger-menu-btn").click();
      cy.get("#logout_sidebar_link").click();
      cy.reload();
    });
  });

  it("TC_03 - Verify case sensitivity of username", function () {
    cy.get("#user-name").clear().type(this.data.caseSensitive.username);
    cy.get("#password").clear().type(this.data.caseSensitive.password);
    cy.get("#login-button").click();
    cy.get("h3[data-test='error']").should("contain", "Username and password do not match");
  });

  it("TC_04 - Verify case sensitivity of password", function () {
    cy.get("#user-name").clear().type(this.data.validUser.username);
    cy.get("#password").clear().type(this.data.caseSensitive.wrongPassword);
    cy.get("#login-button").click();
    cy.get("h3[data-test='error']").should("contain", "Username and password do not match");
  });

  // Negative test cases
  it("TC_05 - Login with incorrect username", function () {
    cy.get("#user-name").clear().type(this.data.invalidUser.username);
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
    cy.get("h3[data-test='error']").should("contain", "Username and password do not match");
  });

  it("TC_06 - Login with incorrect password", function () {
    cy.get("#user-name").clear().type(this.data.validUser.username);
    cy.get("#password").clear().type(this.data.invalidUser.password);
    cy.get("#login-button").click();
    cy.get("h3[data-test='error']").should("contain", "Username and password do not match");
  });

  it("TC_07 - Login with empty fields", function () {
    cy.get("#login-button").click();
    cy.get("h3[data-test='error']").should("contain", "Username is required");
  });

  it("TC_08 - Login with only username filled", function () {
    cy.get("#user-name").clear().type(this.data.validUser.username);
    cy.get("#login-button").click();
    cy.get("h3[data-test='error']").should("contain", "Password is required");
  });

  it("TC_09 - Login with only password filled", function () {
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
    cy.get("h3[data-test='error']").should("contain", "Username is required");
  });

  it("TC_10 - Login with spaces before/after username", function () {
    cy.get("#user-name").clear().type(" standard_user ");
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
  });

  it("TC_11 - Login with spaces before/after password", function () {
    cy.get("#user-name").clear().type(this.data.validUser.username);
    cy.get("#password").clear().type(" secret_sauce ");
    cy.get("#login-button").click();
  });

  it("TC_12 - Login as locked_out_user", function () {
    cy.get("#user-name").clear().type("locked_out_user");
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
    cy.get("h3[data-test='error']").should("contain", "Sorry, this user has been locked out.");
  });

  // Special User Scenarios
  it("TC_13 - Login as performance_glitch_user", function () {
    cy.get("#user-name").clear().type("performance_glitch_user");
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
  });

  it("TC_14 - Login as problem_user", function () {
    cy.get("#user-name").clear().type("problem_user");
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
  });

  it("TC_15 - Login as error_user", function () {
    cy.get("#user-name").clear().type("error_user");
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
  });

  // Edge Cases
  it("TC_16 - Login with long username input", function () {
    cy.get("#user-name").clear().type("a".repeat(100));
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
  });

  it("TC_17 - Login with long password input", function () {
    cy.get("#user-name").clear().type(this.data.validUser.username);
    cy.get("#password").clear().type("a".repeat(100));
    cy.get("#login-button").click();
  });

  it("TC_18 - Login with Special Characters in Username", function () {
    cy.get("#user-name").clear().type("!@#$%^&*");
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
  });

  it("TC_19 - Login with Special Characters in Password", function () {
    cy.get("#user-name").clear().type(this.data.validUser.username);
    cy.get("#password").clear().type("!@#$%^&*");
    cy.get("#login-button").click();
  });
});