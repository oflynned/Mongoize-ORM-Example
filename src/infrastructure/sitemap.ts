import { Application, Request, Response } from 'express';

import indexRoute from '../routes';
import userRoute from '../routes/users';
import commentRoute from '../routes/comments';

const sitemap = (app: Application): void => {
  app.get('/', indexRoute()['/'].get);
  app.get('/user/:id', indexRoute()['/:id'].get);
  app.get('/user/:id/comments', indexRoute()['/:id/comments'].get);
  app.get('/health', indexRoute()['/health'].get);

  app.post('/api/users', userRoute()['/'].post);
  app.get('/api/users', userRoute()['/'].get);
  app.get('/api/users/:id', userRoute()['/:id'].get);
  app.get('/api/users/:id/comments', userRoute()['/:id/comments'].get);

  app.post('/api/comments', commentRoute()['/'].post);
  app.get('/api/comments', commentRoute()['/'].get);
  app.get('/api/comments/:id', commentRoute()['/:id'].get);
  app.get('/api/comments/:id/poster', commentRoute()['/:id/poster'].get);

  app.use('*', (req: Request, res: Response) => {
    res.status(404).send();
  });
};

export default sitemap;
