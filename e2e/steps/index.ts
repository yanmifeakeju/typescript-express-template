import { Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import superagent from 'superagent';
import { postgresClient } from '../../src/infrastructure/database/postgres/connection';
import Chance from 'chance';

const chance = new Chance();

When('the client creates a POST request to \\/users', function () {
  this.request = superagent('POST', `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/v1/users`);
});

When('attaches a generic empty payload', function () {
  return undefined;
});

When('attaches a generic non-JSON payload', function () {
  this.request.send('<?xml version="1.0" encoding="UTF-8" ?><email>dan@danyll.com</email>');
  this.request.set('Content-Type', 'text/xml');
});

When('attaches a generic malformed payload', function () {
  this.request.send('"{email: bola@mail.com');
  this.request.set('Content-Type', 'application/json');
});

When('attaches a Create User payload which is missing the {string} field', function (missingFields: string) {
  const payload: Record<string, unknown> = {
    first_name: chance.first(),
    last_name: chance.last(),
    email: chance.email(),
    password: chance.string({ length: 10, alpha: true })
  };

  const fieldsToDelete = missingFields
    .split(',')
    .map((s: string) => s.trim())
    .filter((s: string) => s !== '');

  fieldsToDelete.forEach((field: string | number) => delete payload[field]);
  this.request.send(JSON.stringify(payload)).set('Content-Type', 'application/json');
});

When(
  'attaches a Create User payload where the {string} field is not a {string}',
  function (field: string, type: string) {
    const payload: Record<string, unknown> = {
      firstName: chance.first(),
      lastName: chance.last(),
      email: chance.email(),
      password: chance.string({ length: 10, alpha: true })
    };

    const sampleValues: Record<string, Record<'is' | 'not', unknown>> = {
      string: {
        is: 'string',
        not: 10
      }
    };

    payload[field] = sampleValues[type].not;

    this.request.send(JSON.stringify(payload)).set('Content-Type', 'application/json');
  }
);

When('attaches a valid Create User payload', function () {
  const payload: Record<string, unknown> = {
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    password: chance.string({ length: 10, alpha: true })
  };

  this.requestPayload = payload;
  this.request.send(JSON.stringify(payload)).set('Content-Type', 'application/json');
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
  assert.equal(this.responsePayload.message, message);
});

Then('contains a success property which is false', function () {
  assert.equal(this.responsePayload.success, false);
});

Then('contains a success property which is true', function () {
  assert.equal(this.responsePayload.success, true);
});

Then('the user details should be added to the database', async function () {
  const user = await postgresClient.user.findMany({ where: { email: this.requestPayload.email } });
  assert.equal(user[0].email, this.requestPayload.email);
});
