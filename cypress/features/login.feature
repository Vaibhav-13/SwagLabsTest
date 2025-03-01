Feature: Login Functionality

  Scenario Outline: Login attempts with different users
    Given User is on the login page
    When User enters username "<username>" and password "<password>"
    And Clicks the login button
    Then The result should be "<result>"
    
    Examples:
      | username                 | password       | result                           |
      | standard_user            | secret_sauce  | successful login                 |
      | problem_user             | secret_sauce  | successful login                 |
      | invalid_user             | wrong_password | error: "Username and password do not match" |
      | locked_out_user          | secret_sauce  | error: "Sorry, this user has been locked out." |