import test from 'ava';
import sinon from 'sinon';
import Chance from 'chance';
import { create } from './create';
import { AppError } from '../../../shared/errors/AppError';
import { User } from '@prisma/client';
import { ValidationError } from '../../../shared/errors/ValidationError';
import { hashPassword } from '../../../utils/password';
import { UserRepository } from '../../repository/user';
import { CreateUserParams } from '../schema';

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
    test(`create() throws ValidationError exception when ${key} is missing`, async (t) => {
      const data = { ...testUser, [key]: undefined };

      const error = await t.throwsAsync(create(data));

      t.truthy(error instanceof ValidationError);

      t.pass();
    });
  }
});

test.serial('create() throw UserError exception for duplicate email entry', async (t) => {
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

  const error: AppError | undefined = await t.throwsAsync(create(data));

  t.truthy(findDuplicateRecordStub.calledOnce);
  t.truthy(error instanceof AppError);
  t.is(error?.errorType, 'DUPLICATE_ENTRY');
});

test.serial('create() returns userId when there is no duplicate record', async (t) => {
  const data = { ...testUser };

  const findDuplicateRecordStub = sinon.stub(UserRepository, 'find');
  findDuplicateRecordStub.resolves(null);

  const expectedResult = { id: chance.guid() };
  const createUserRecordStub = sinon.stub(UserRepository, 'create');
  createUserRecordStub.resolves(expectedResult as User);

  const result = await create(data);

  t.truthy(findDuplicateRecordStub.calledOnce);
  t.truthy(createUserRecordStub.calledOnce);
  t.is(expectedResult.id, result.userId);
});
