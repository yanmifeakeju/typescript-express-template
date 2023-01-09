import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

interface TokenPayload<T extends Record<string, unknown>> {
  data: T;
}

export const createAuthToken = <T extends Record<string, unknown>>(payload: T, secret: Secret, expiresIn?: number) => {
  const data: TokenPayload<T> = { data: payload };
  return jwt.sign(data, secret, { expiresIn });
};

export const decodeToken = <T extends Record<string, unknown>>(token: string, secret: Secret) => {
  const decoded = jwt.verify(token, secret) as JwtPayload;
  return (<unknown>decoded.data) as TokenPayload<T>;
};
