import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import env from '../config/env';

const algorithm = 'AES-256-CBC';
const encryptionKey = env.APP_ENCRYPTION_KEY;

export const encrypt = (value: string, key = encryptionKey) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  let encryptedEmail = cipher.update(value, 'utf8', 'hex');
  encryptedEmail += cipher.final('hex');
  return `${iv.toString('hex')}:${encryptedEmail}`;
};

export const decrypt = (encryptedString: string, key = encryptionKey) => {
  const [ivHex, encryptedData] = encryptedString.split(':');
  const decipher = createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
  let decryptedString = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedString += decipher.final('utf8');
  return decryptedString;
};
