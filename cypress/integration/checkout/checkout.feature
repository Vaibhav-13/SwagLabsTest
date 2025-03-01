Feature: Checkout Process
  Scenario: Proceed to checkout
    Given User has an item in the cart
    When User clicks on the checkout button
    Then User should be redirected to the checkout page

  Scenario: Checkout with empty cart
    Given User is on the cart page with no items
    When User clicks on checkout button
    Then User should see an error message