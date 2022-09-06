Feature: Create User

  Clients should be able to send a request to our API in order to create a user. Our API should validate the structure of the payload and response with an error if is invalid.

  Scenario Outline: Bad Requests: Incorrect Payload
    If the client sends a POST request to /users with an incorrect payload type, it should receive a response with a corresponding 4xx HTTP status code.

    When the client creates a POST request to /users
    And attaches a generic <payloadType> payload
    And sends the request
    Then our API should respond with a <statusCode> HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says <message>

    Examples:
      | payloadType | statusCode | message                                                       |
      | empty       | 400        | 'Payload should not be empty'                                 |
      | non-JSON    | 415        | 'The "Content-Type" header must always be "application/json"' |
      | malformed   | 400        | 'Payload should be valid JSON format.'                        |

  Scenario Outline: Bad Requests: Invalid Data in Payload
    If the client sends a POST request to /users with an invalid payload, it should receive a response with a corresponding 4xx HTTP status code.

    When the client creates a POST request to /users
    And attaches a Create User payload which is missing the '<missingFields>' field
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "Payload must contain at least the email and password fields"

    Examples:
      | missingFields |
      | first_name    |
      | last_name     |
      | email         |
      | password      |
