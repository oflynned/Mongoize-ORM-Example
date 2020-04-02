import {Application} from 'express';
import {MongoClient} from "../../node_modules/@oflynned/mongoize-orm/src";

import indexRoute from "../routes";
import userRoute from '../routes/users';
import commentRoute from '../routes/comments';

const sitemap = (app: Application, client: MongoClient): void => {
    app.get("/", indexRoute()["/"].get);

    app.post('/users', userRoute(client)['/'].post);
    app.get('/users', userRoute(client)['/'].get);
    app.get('/users/:id', userRoute(client)["/:id"].get);
    app.get('/users/:id/comments', userRoute(client)["/:id/comments"].get);

    app.post("/comments", commentRoute(client)["/"].post);
    app.get("/comments", commentRoute(client)["/"].get);
    app.get("/comments/:id", commentRoute(client)["/:id"].get);
    app.get("/comments/:id/poster", commentRoute(client)["/:id/poster"].get);
};

export default sitemap;
