import { Application, Request, Response } from 'express';
import { MongoClient } from 'mongoize-orm';

import indexRoute from '../routes';
import userRoute from '../routes/users';
import commentRoute from '../routes/comments';

const sitemap = (app: Application, client: MongoClient): void => {
  app.get('/', indexRoute()['/'].get);
  app.get('/:id', indexRoute()['/:id'].get);
  app.get('/:id/comments', indexRoute()['/:id/comments'].get);
  app.get('/health', indexRoute()['/health'].get);

  app.post('/api/users', userRoute(client)['/'].post);
  app.get('/api/users', userRoute(client)['/'].get);
  app.get('/api/users/:id', userRoute(client)['/:id'].get);
  app.get('/api/users/:id/comments', userRoute(client)['/:id/comments'].get);

  app.post('/api/comments', commentRoute(client)['/'].post);
  app.get('/api/comments', commentRoute(client)['/'].get);
  app.get('/api/comments/:id', commentRoute(client)['/:id'].get);
  app.get('/api/comments/:id/poster', commentRoute(client)['/:id/poster'].get);

  app.use('*', (req: Request, res: Response) => {
    res.status(404).send();
  });
};

export default sitemap;
