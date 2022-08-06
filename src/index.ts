import { AddressInfo } from 'net';
import app from './api/server';
import logger from './lib/utils/logger';

const server = app.listen(process.env.PORT || 3000, () => {
  const { port } = server.address() as AddressInfo;
  logger.info(`Server running on ${port}`);
});
