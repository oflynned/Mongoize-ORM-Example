import { Request, Response } from 'express';
import ky from 'ky-universal';
import serverConfig from '../config/server.config';

const routes = () => {
  const { serverPort: port } = serverConfig;
  return {
    '/': {
      get: async (req: Request, res: Response): Promise<void> => {
        const users = await ky.get(`http://localhost:${port}/api/users`).json();
        res.render('users', { users });
      }
    },
    '/:id': {
      get: async (req: Request, res: Response): Promise<void> => {
        const user = await ky
          .get(`http://localhost:${port}/api/users/${req.params.id}`)
          .json();
        res.render('user', { user });
      }
    },
    '/:id/comments': {
      get: async (req: Request, res: Response): Promise<void> => {
        const comments = await ky
          .get(`http://localhost:${port}/api/users/${req.params.id}/comments`)
          .json();
        res.render('comments', { comments });
      }
    },
    '/health': {
      get: async (req: Request, res: Response): Promise<void> => {
        res.json({ ping: 'pong' });
      }
    }
  };
};

export default routes;
