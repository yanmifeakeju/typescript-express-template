import envSchema from 'env-schema';
import { Type, Static } from '@sinclair/typebox';

const ConfigSchema = Type.Object({
  SERVER_HOSTNAME: Type.String(),
  SERVER_PORT: Type.Number(),
  DATABASE_URL: Type.String()
});

type Config = Static<typeof ConfigSchema>;
export const config = envSchema<Config>({ schema: ConfigSchema, dotenv: true });
