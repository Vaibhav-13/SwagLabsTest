Feature: Shopping Cart Functionality
  Scenario: Add item to cart
    Given User is logged in
    When User adds an item to the cart
    Then The item should be displayed in the cart

  Scenario: Remove item from cart
    Given User has an item in the cart
    When User clicks on remove button
    Then The item should be removed from the cart