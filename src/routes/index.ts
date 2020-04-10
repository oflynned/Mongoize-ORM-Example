import { Request, Response } from 'express';

const routes = () => {
  return {
    '/': {
      get: async (req: Request, res: Response): Promise<void> => {
        res.json({ ping: 'pong' });
      }
    }
  };
};

export default routes;
