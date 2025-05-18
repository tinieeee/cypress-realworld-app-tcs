Feature: Login Validation

Scenario: Correct Login credentials
Given  I am on login page and input valid credentials
When Click login button
Then User successfully logged in

Scenario: Incorrect Login credentials
Given  I am on login page and input invalid credentials
When Click login button
Then User not successfully logged in and error message displayed

Scenario: Empty Login credentials
Given  I am on login page and no inputs used on the fields
When Click login button disabled
Then Error message displayed under username field

Scenario: Login Password lessthan 4 characters
Given  I am on login page and input password less than 4 characters
When Click login button disabled
Then Error message displayed under password field