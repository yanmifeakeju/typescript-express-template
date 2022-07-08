import logger from './lib/utils/logger';
import initializeServer from './server';

const server = initializeServer();
server.listen(process.env.PORT, () => logger.info('Server listening on port ' + process.env.PORT));
