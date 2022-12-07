import test from 'ava';
import { UserServiceError } from './UserServiceError';
import sinon from 'sinon';
import { fetchUserProfile } from './fetch';
import { v4 } from 'uuid';
import Chance from 'chance';
import { UserRepository } from '../repository';

const chance = new Chance();

test.beforeEach(() => {
  sinon.restore();
});

test('fetchUserProfile() should throw error when passed incorrect uuid', async (t) => {
  const error = await t.throwsAsync(fetchUserProfile('a randomstring'));

  t.truthy(error instanceof UserServiceError);
});

test.serial('throws error when from user repository', async (t) => {
  const userId = v4();

  const stubbedUserRepository = sinon.stub(UserRepository, 'findUser');
  stubbedUserRepository.rejects(new Error('User not found'));

  const error = await t.throwsAsync(fetchUserProfile(userId));

  t.truthy(stubbedUserRepository.calledOnceWith({ id: userId }));
  t.truthy(error?.message, 'User not found');
});

test.serial('returns correct user from UserRepository', async (t) => {
  const userId = v4();

  const stubbedUserRepository = sinon.stub(UserRepository, 'findUser');

  const testUser = {
    id: userId,
    first_name: chance.first(),
    last_name: chance.last(),
    email: chance.email(),
    bio: chance.sentence(),
    password: chance.sentence()
  };

  stubbedUserRepository.resolves(testUser);

  const result = await fetchUserProfile(userId);

  t.truthy(stubbedUserRepository.calledOnceWith({ id: userId }));
  t.is(testUser.first_name, result.firstName);
  t.is(testUser.last_name, result.lastName);
  t.falsy('password' in result);
});
