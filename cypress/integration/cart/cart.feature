Feature: Shopping Cart Functionality

  Scenario: Verify cart item details
    Given User has an item in the cart
    When User views the cart page
    Then The correct product name, description, price, and quantity should be displayed

  Scenario: Remove an item from the cart
    Given User has an item in the cart
    When User removes the item
    Then The cart should be empty