import initializeServer from './server';

const server = initializeServer();
server.listen(3000, () => console.log('Server listening on port 3000'));
