import { AddressInfo } from 'net';
import app from './api/server';
import logger from './utils/logger';

const server = app.listen(process.env.SERVER_PORT || 3000, () => {
  const { port } = server.address() as AddressInfo;
  logger.info(`Server running ${port}`);
});
