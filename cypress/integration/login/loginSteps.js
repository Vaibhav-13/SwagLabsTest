import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../../support/pageObjects/loginPage";

Given("User is on the login page", () => {
  cy.visit("/");
});

When("User enters valid username and password", () => {
  cy.fixture("testData").then((data) => {
    loginPage.enterUsername(data.validUser.username);
    loginPage.enterPassword(data.validUser.password);
  });
});

When("User enters invalid username or password", () => {
  loginPage.enterUsername("invalid_user");
  loginPage.enterPassword("wrong_password");
});

When("Clicks on Login button", () => {
  loginPage.clickLogin();
});

Then("User should be redirected to the inventory page", () => {
  cy.url().should("include", "/inventory.html");
});

Then("User should see an error message", () => {
  loginPage.verifyErrorMessage("Epic sadface: Username and password do not match any user.");
});