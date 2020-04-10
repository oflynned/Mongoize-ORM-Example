require('dotenv').config();

import { ConnectionOptions, MongoClient } from 'mongoize-orm';
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
  const client = await new MongoClient().connect(dbConfig());

  const server = buildServer(client);
  const port = server.get('port') || serverConfig.serverPort;
  server.listen(port, () => {
    console.log(
      `The server is running and listening on http://localhost:${port}`
    );
  });
})();
