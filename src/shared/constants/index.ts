export const UsersConstants = Object.freeze({
  BAN_PASSWORD_PREFIX: 'password:request:ban',
  RESET_PASSWORD_COUNT_PREFIX: 'password:request:count',
  MAX_PASSWORD_RESET_REQUEST_PER_MIN: 2,
  MAX_REQUESTS_BEFORE_BAN: 5,
  RESET_PASSWORD_COUNT_TTL: 300,
  BAN_PASSWORD_TTL: 1800
});
