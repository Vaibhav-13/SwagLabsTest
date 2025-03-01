Feature: Checkout Functionality

  Scenario: Proceed to checkout
    Given User has an item in the cart
    When User clicks on checkout
    Then User should be redirected to the checkout page

  Scenario: Try checkout with an empty cart
    Given User is on the cart page without items
    When User clicks checkout
    Then The system should display "Your cart is empty"