Feature: User endpoint operations

  Scenario: Add a new user to the database
    Given the request body with the valid email address test@test.com
    And the request body contains a valid first name: Max
    And the request body contains a valid last name: Mustermann
    When the request is sent to the user creation endpoint
    Then a new user is created in the database
    And the userId of the newly created user is returned
