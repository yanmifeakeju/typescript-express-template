import { AddressInfo } from 'net';
import app from './api/server';
import config from './config/env';
import logger from './utils/logger';

const server = app.listen(config.SERVER_PORT || 3000, () => {
  const { port } = server.address() as AddressInfo;
  logger.info(`Server running ${port}`);
});
