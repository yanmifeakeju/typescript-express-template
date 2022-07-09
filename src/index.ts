import v1Router from './api/v1';
import logger from './lib/utils/logger';
import initializeServer from './server';

const server = initializeServer();
server.use(v1Router);
server.listen(process.env.PORT, () => logger.info(`Server listening on port ${process.env.PORT}`));
