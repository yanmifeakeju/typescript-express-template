import test from 'ava';
import sinon from 'sinon';
import { fetchUser } from './fetch';
import { v4 } from 'uuid';
import { ValidationError } from '../../../shared/errors/ValidationError';
import { UserRepository } from '../repositories';

// const chance = new Chance();

test.beforeEach(() => {
  sinon.restore();
});

test('fetchUserProfile() should throw error when passed incorrect uuid', async (t) => {
  const error = await t.throwsAsync(fetchUser(UserRepository)({ userId: 'a randomstring' }));

  t.truthy(error instanceof ValidationError);
});

test.serial('throws error when from user repository', async (t) => {
  const userId = v4();

  const stubbedUserRepository = sinon.stub(UserRepository, 'selectUserById');
  stubbedUserRepository.rejects(new Error('User not found'));

  const error = await t.throwsAsync(fetchUser(UserRepository)({ userId }));

  t.truthy(stubbedUserRepository.calledOnce);
  t.truthy(error?.message, 'User not found');
});

// test.serial('returns correct user from UserRepository', async (t) => {
//   const userId = v4();

//   const stubbedUserRepository = sinon.stub(UserRepository, 'findUnique');

//   const testUser = {
//     id: userId,
//     first_name: chance.first(),
//     last_name: chance.last(),
//     email: chance.email(),
//     bio: chance.sentence(),
//     password: chance.sentence()
//   };

//   stubbedUserRepository.resolves(testUser);

//   const result = await fetchProfile({ userId });

//   t.truthy(stubbedUserRepository.calledOnce);
//   t.is(testUser.first_name, result.firstName);
//   t.is(testUser.last_name, result.lastName);
//   t.falsy('password' in result);
// });
