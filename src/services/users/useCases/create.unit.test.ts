import test from 'ava';
import sinon from 'sinon';
import Chance from 'chance';
import { CreateUserParams } from '../types';
import { createNewUser } from './create';
import { ValidationError } from '../../../lib/validator/error';
import { UserErrorType, UserServiceError } from '../UserServiceError';
import { postgresClient } from '../../../infrastructure/database/postgres/connection';
import { UserRepository } from '../dataAccess';

const chance = new Chance();

const testUser: CreateUserParams = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email(),
  password: chance.word({ length: 8 })
};

test.beforeEach((t) => {
  sinon.restore();
});

Object.entries(testUser).forEach(([key, _]) => {
  test(`createNewUser() throws ValidationError exception when ${key} is missing`, async (t) => {
    const data = { ...testUser, [key]: undefined };
    postgresClient;

    const error = await t.throwsAsync(createNewUser(UserRepository)(data));

    t.truthy(error instanceof ValidationError);
  });
});

test.serial('createNewUser() throw UserServiceError exception for duplicate email entry', async (t) => {
  const data = { ...testUser };

  const findDuplicateRecordStub = sinon.stub(UserRepository, 'findDuplicateRecord');
  findDuplicateRecordStub.resolves({ id: chance.guid() });

  const error: UserServiceError | undefined = await t.throwsAsync(createNewUser(UserRepository)(data));

  t.truthy(findDuplicateRecordStub.calledOnceWith(data.email));
  t.truthy(error instanceof UserServiceError);
  t.is(error?.errorType, UserErrorType.DUPLICATE_ENTRY);
});

test.serial('createNewUser() return userId when there is no duplicate record', async (t) => {
  const data = { ...testUser };

  const findDuplicateRecordStub = sinon.stub(UserRepository, 'findDuplicateRecord');
  findDuplicateRecordStub.resolves(null);

  const expectedResult = { userId: chance.guid() };
  const createUserRecordStub = sinon.stub(UserRepository, 'createUser');
  createUserRecordStub.resolves(expectedResult);

  const result = await createNewUser(UserRepository)(data);

  t.deepEqual(expectedResult, result);
  t.truthy(findDuplicateRecordStub.calledOnceWith(data.email));
});
