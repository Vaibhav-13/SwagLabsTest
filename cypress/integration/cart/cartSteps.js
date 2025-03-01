import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import cartPage from "../../support/pageObjects/cartPage";

Given("User is logged in", () => {
  cy.login(); // Custom command for login
});

When("User adds an item to the cart", () => {
  cartPage.addItemToCart("Sauce Labs Backpack");
});

Then("The item should be displayed in the cart", () => {
  cartPage.verifyCartItem("Sauce Labs Backpack");
});