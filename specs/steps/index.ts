import { Then, When } from '@cucumber/cucumber';
import superagent from 'superagent';

let request: superagent.SuperAgentRequest;
let result: superagent.Response | undefined;
let error: superagent.Response | undefined;

When('the client creates a POST request to \\/users', function () {
  request = superagent('POST', 'localhost:5000/users');
});

When('attaches a generic empty payload', function () {
  // Write code here that turns the phrase above into concrete actions
  return undefined;
});

When('sends the request', async function () {
  try {
    result = await request;
  } catch (err) {
    const responseError = err as superagent.ResponseError;
    error = responseError.response;
  }
});

Then('our API should respond with a {int} HTTP status code', function (int: number) {
  if (error?.statusCode !== 400) {
    throw new Error(JSON.stringify(result?.body));
  }
});

Then('the payload of the response should be a JSON object', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('contains a message property which says {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
