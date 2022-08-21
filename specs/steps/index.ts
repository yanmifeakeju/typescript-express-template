import 'dotenv/config';

import { Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import superagent from 'superagent';

When('the client creates a POST request to \\/users', function () {
  this.request = superagent('POST', `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/users`);
});

When('attaches a generic empty payload', function () {
  // Write code here that turns the phrase above into concrete actions
  return undefined;
});

When('attaches a generic non-JSON payload', function () {
  // Write code here that turns the phrase above into concrete actions
  this.request.send('<?xml version="1.0" encoding="UTF-8" ?><email>dan@danyll.com</email>');
  this.request.set('Content-Type', 'text/xml');
});

When('attaches a generic malformed payload', function () {
  // Write code here that turns the phrase above into concrete actions
  this.request.send('"{email: bola@mail.com');
  this.request.set('Content-Type', 'application/json');
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
