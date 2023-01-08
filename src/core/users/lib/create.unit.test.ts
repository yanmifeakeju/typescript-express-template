import test from 'ava';
import sinon from 'sinon';
import Chance from 'chance';
import { CreateUserParams } from '../types';
import { register } from './create';
import { UserErrorType, UserError } from './UserServiceError';
import { User } from '@prisma/client';
import { UserRepository } from '../../repository/User';
import { hashPassword } from '../../../lib/utils/password';
import { ValidationError } from '../../../lib/shared/errors/ValidationError';

const chance = new Chance();

const testUser: CreateUserParams = {
  firstName: chance.first(),
  lastName: chance.last(),
  bio: null,
  email: chance.email(),
  password: chance.word({ length: 8 })
};

test.beforeEach((t) => {
  sinon.restore();
});

Object.entries(testUser).forEach(([key, _]) => {
  const nonRequiredFields = ['bio'];

  if (!nonRequiredFields.includes(key)) {
    test(`createNewUser() throws ValidationError exception when ${key} is missing`, async (t) => {
      const data = { ...testUser, [key]: undefined };

      const error = await t.throwsAsync(register(data));

      t.truthy(error instanceof ValidationError);

      t.pass();
    });
  }
});

test.serial('createNewUser() throw UserServiceError exception for duplicate email entry', async (t) => {
  const data = { ...testUser };

  const findDuplicateRecordStub = sinon.stub(UserRepository, 'find');
  findDuplicateRecordStub.resolves({
    id: chance.guid(),
    bio: data.bio,
    first_name: data.firstName,
    last_name: data.password,
    email: data.email,
    password: await hashPassword(data.password)
  });

  const error: UserError | undefined = await t.throwsAsync(register(data));

  t.truthy(findDuplicateRecordStub.calledOnceWith({ email: data.email }));
  t.truthy(error instanceof UserError);
  t.is(error?.errorType, UserErrorType.DUPLICATE_ENTRY);
});

test.serial('createNewUser() return userId when there is no duplicate record', async (t) => {
  const data = { ...testUser };

  const findDuplicateRecordStub = sinon.stub(UserRepository, 'find');
  findDuplicateRecordStub.resolves(null);

  const expectedResult = { id: chance.guid() };
  const createUserRecordStub = sinon.stub(UserRepository, 'save');
  createUserRecordStub.resolves(expectedResult as User);

  const result = await register(data);

  t.truthy(findDuplicateRecordStub.calledOnceWith({ email: data.email }));
  t.is(expectedResult.id, result.userId);
});
