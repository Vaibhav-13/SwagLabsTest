Feature: Login Functionality
  Scenario: Login with valid credentials
    Given User is on the login page
    When User enters valid username and password
    And Clicks on Login button
    Then User should be redirected to the inventory page

  Scenario: Login with invalid credentials
    Given User is on the login page
    When User enters invalid username or password
    And Clicks on Login button
    Then User should see an error message