import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import checkoutPage from "../../support/pageObjects/checkoutPage";

Given("User has an item in the cart", () => {
  cy.login();
  checkoutPage.addItemToCart("Sauce Labs Bike Light");
});

When("User clicks on the checkout button", () => {
  checkoutPage.clickCheckout();
});

Then("User should be redirected to the checkout page", () => {
  cy.url().should("include", "/checkout-step-one.html");
});