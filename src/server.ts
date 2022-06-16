import express from 'express';

function initializeServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  console.log('Hello');

  return app;
}

export default initializeServer;
