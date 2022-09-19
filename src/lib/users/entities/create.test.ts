import test from 'ava';
import Chance from 'chance';
import { randomUUID } from 'crypto';
import { ApiError } from '../../errors/apiError';
import { CreateUserPayload, CreateUserResponse } from '../schema/schema';
import { create } from './create';

const chance = new Chance();

const saveUser = async (data: CreateUserPayload): Promise<CreateUserResponse> => {
  return Promise.resolve({ id: randomUUID(), firstName: data.firstName, lastName: data.lastName, email: data.email });
};
const createUser = create(saveUser);

const payload = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email(),
  password: chance.string({ alpha: true })
};

Object.entries(payload).forEach(([key, value]) => {
  test.only(`returns correct error message when ${key} is missing`, async (t) => {
    const error = await t.throwsAsync(createUser({ ...payload, [key]: undefined }));
    t.is(error?.message, `Payload missing required property "${key}".`);
  });
});
