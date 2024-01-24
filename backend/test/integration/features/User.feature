Feature: User endpoint operations

  Scenario: Add a new user to the database
    Given a request body with the valid email address test@test.com
    And the request body contains a valid profile
    When the request is sent to the user creation endpoint
    Then a new user is created in the database
