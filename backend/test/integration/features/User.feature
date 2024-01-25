Feature: User endpoint operations

  Scenario: Add a new user to the database
    Given the request body contains a valid email address: test@test.com
    And the request body contains a valid first name: Max
    And the request body contains a valid last name: Mustermann
    When the request is sent to the user creation endpoint
    Then the userId of the newly created user is returned
    And a new user is created in the database

  Scenario: Try to create a new user with invalid email address
    Given the request body contains an invalid email address: test.com
    And the request body contains a valid first name: Max
    And the request body contains a valid last name: Mustermann
    When the request is sent to the user creation endpoint
    Then the response contains an email address validation error
    And no user is created in the database
