require('dotenv').config();

import {
  bindGlobalDatabaseClient,
  ConnectionOptions,
  MongoClient
} from 'mongoize-orm';
import { buildServer } from './server';
import serverConfig from '../config/server.config';

const dbConfig = (): ConnectionOptions => {
  if (process.env.MONGODB_URI) {
    return {
      uri: process.env.MONGODB_URI
    };
  }

  return {
    host: 'localhost',
    port: 27017,
    database: 'test'
  };
};

(async () => {
  await bindGlobalDatabaseClient(new MongoClient(), dbConfig());

  const server = buildServer();
  const port = server.get('port') || serverConfig.serverPort;
  server.listen(port, () => {
    console.log(
      `The server is running and listening on http://localhost:${port}`
    );
  });
})();
