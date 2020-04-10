import { MongoClient } from 'mongoize-orm';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import handlebars from 'express-handlebars';
import path from 'path';

import sitemap from './sitemap';

export const buildServer = (client: MongoClient): Application => {
  const app = express();
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(helmet());
  app.use(cors());

  // templating view layer setup
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '../views'));
  app.engine(
    'hbs',
    handlebars({
      defaultLayout: 'index',
      extname: 'hbs'
    })
  );
  app.use(express.static('public'));

  sitemap(app, client);

  return app;
};

export default buildServer;
