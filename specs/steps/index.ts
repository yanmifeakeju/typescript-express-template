import { Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import superagent from 'superagent';

When('the client creates a POST request to \\/users', function () {
  this.request = superagent('POST', 'localhost:5000/users');
});

When('attaches a generic empty payload', function () {
  // Write code here that turns the phrase above into concrete actions
  return undefined;
});

When('sends the request', async function () {
  try {
    this.response = await this.request;
  } catch (err) {
    const responseError = err as superagent.ResponseError;
    this.response = responseError.response;
  }
});

Then('our API should respond with a {int} HTTP status code', function (statusCode: number) {
  assert.equal(this.response?.statusCode, statusCode);
});

Then('the payload of the response should be a JSON object', function () {
  try {
    this.responsePayload = JSON.parse(this.response.text);
  } catch (err) {
    throw new Error('Malformed JSON response');
  }
});

Then('contains a message property which says {string}', function (message: string) {
  // Write code here that turns the phrase above into concrete actions

  assert.equal(this.responsePayload.message, message);
});
