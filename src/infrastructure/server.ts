import {MongoClient} from "../../node_modules/@oflynned/mongoize-orm";
import express, {Application} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import sitemap from './sitemap';

export const buildServer = (client: MongoClient): Application => {
    const app = express();
    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(helmet());
    app.use(cors());

    sitemap(app, client);

    return app;
};

export default buildServer;
