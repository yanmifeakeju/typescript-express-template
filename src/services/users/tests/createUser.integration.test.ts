import test from 'ava';
import { Chance } from 'chance';
import { UserService } from '..';
import { postgresClient } from '../../../infrastructure/database/postgres/connection';
import { CreateUserParams } from '../types';
import { UserErrorType, UserServiceError } from '../UserServiceError';

test.after(async (t) => {
  await postgresClient.user.deleteMany();
});

test('throws UserServiceError when adding an data with existing email in the database', async (t) => {
  const chance = new Chance();

  const data: CreateUserParams = {
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    password: chance.word({ length: 10 })
  };

  await postgresClient.user.create({
    data: { first_name: data.firstName, last_name: data.lastName, email: data.email, password: data.password }
  });

  const error: UserServiceError | undefined = await t.throwsAsync(UserService.createUser(data));

  t.truthy(error instanceof UserServiceError);
  t.is(error?.errorType, UserErrorType.DUPLICATE_ENTRY);
});

test('returns userId when passed valid data', async (t) => {
  const chance = new Chance();

  const data: CreateUserParams = {
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    password: chance.word({ length: 10 })
  };

  const { userId } = await UserService.createUser(data);

  t.truthy(userId);
});
