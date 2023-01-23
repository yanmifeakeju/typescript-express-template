import envSchema from 'env-schema';
import { Static, Type } from '@sinclair/typebox';
import { StringEnum } from '../shared/schema';

const ConfigSchema = Type.Object({
  NODE_ENV: StringEnum(['development', 'production', 'test']),
  SERVER_HOSTNAME: Type.String(),
  SERVER_PORT: Type.Number(),
  DATABASE_URL: Type.String(),
  USER_JWT_SECRET: Type.String(),
  REDIS_URL: Type.String({ format: 'uri' }),
  PASSWORD_JWT_SECRET: Type.String()
});

type Config = Static<typeof ConfigSchema>;

const config = envSchema<Config>({
  schema: ConfigSchema,
  dotenv: true,
  ajv: {
    customOptions(ajvInstance) {
      const opts = [
        'date-time',
        'time',
        'date',
        'email',
        'hostname',
        'ipv4',
        'ipv6',
        'uri',
        'uri-reference',
        'uuid',
        'uri-template',
        'json-pointer',
        'relative-json-pointer',
        'regex'
      ];
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('ajv-formats')(ajvInstance, opts);
      return ajvInstance;
    }
  }
});

export default config;
