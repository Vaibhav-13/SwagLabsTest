describe("Login Tests", () => {
  beforeEach(function () {
    cy.visit("/"); //To Visit the baseUrl defined in cypress.config.js
    cy.fixture("loginData").then((data) => {
      this.data = data;
    });
  });

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

  it("TC_12 - Login as locked_out_user", function () {
    cy.get("#user-name").clear().type(this.data.lockedOutUser.username);
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
    cy.get("h3[data-test='error']").should("contain", "Sorry, this user has been locked out.");
  });

  it("TC_13 - Login as performance_glitch_user", function () {
    cy.get("#user-name").clear().type(this.data.performanceGlitchUser.username);
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
  });

  it("TC_14 - Login as problem_user", function () {
    cy.get("#user-name").clear().type(this.data.problemUser.username);
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
  });

  it("TC_15 - Login as error_user", function () {
    cy.get("#user-name").clear().type(this.data.errorUser.username);
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
  });

  it("TC_16 - Session Expiry after Login", function () {
    cy.get("#user-name").clear().type(this.data.validUser.username);
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
    cy.wait(9000); // Wait for 15 minutes
    cy.reload();
    cy.get("h3[data-test='error']").should("contain", "Session expired");
  });

  it("TC_17 - Login with long username input", function () {
    cy.get("#user-name").clear().type(this.data.longUsername);
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
  });

  it("TC_18 - Login with long password input", function () {
    cy.get("#user-name").clear().type(this.data.validUser.username);
    cy.get("#password").clear().type(this.data.longPassword);
    cy.get("#login-button").click();
  });

  it("TC_19 - Login with Special Characters in Username", function () {
    cy.get("#user-name").clear().type(this.data.specialChars.username);
    cy.get("#password").clear().type(this.data.validUser.password);
    cy.get("#login-button").click();
  });

  it("TC_20 - Login with Special Characters in Password", function () {
    cy.get("#user-name").clear().type(this.data.validUser.username);
    cy.get("#password").clear().type(this.data.specialChars.password);
    cy.get("#login-button").click();
  });
});