import test from 'ava';
import Chance from 'chance';
import { hashPaswword, verifyPassword } from './auth';

const chance = new Chance();

test('hashPaswword() returns a hashed string', async (t) => {
  const password = chance.string({ alpha: true, length: 10 });
  const hashed = await hashPaswword(password);
  t.not(password, hashed);
});

test('verifyPaswword() returns true when passed the correct password for hashed string', async (t) => {
  const password = chance.string({ alpha: true, length: 10 });
  const hashed = await hashPaswword(password);
  const verify = await verifyPassword(password, hashed);
  t.truthy(verify);
});

test('verifyPaswword() returs false when passed incorrect password for hashed string', async (t) => {
  const password = chance.string({ alpha: true, length: 10 });
  const hashed = await hashPaswword(password);
  const verify = await verifyPassword(chance.string({ alpha: true, length: 8 }), hashed);
  t.falsy(verify);
});
