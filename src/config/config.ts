/**
 * Haven't decided on how I want work with this config.
 * Load extra configuration I don't want to share in .env file
 */
import convict from 'convict';

const env = process.env.NODE_ENV || 'development';

const config = convict({});

config.loadFile(`config/${env}.json`);
config.validate({ allowed: 'strict' });

export default config;
