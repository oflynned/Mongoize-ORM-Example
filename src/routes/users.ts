import { Request, Response } from 'express';
import {
  createUser,
  findUser,
  findUsers
} from '../controllers/user.controller';
import { MongoClient } from 'mongoize-orm';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';

const routes = () => {
  return {
    '/': {
      post: async (req: Request, res: Response): Promise<void> => {
        try {
          const user = await createUser(req.body);
          res.status(201).json(user.toJson());
        } catch (err) {
          res.status(400).json(err);
        }
      },
      get: async (req: Request, res: Response): Promise<void> => {
        const users = await findUsers({});
        res.status(200).json(users.map((user: User) => user.toJson()));
      }
    },
    '/:id': {
      get: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
          const user = await findUser(id);
          res.json(user.toJson());
        } catch (err) {
          res.status(404).json(err);
        }
      }
    },
    '/:id/comments': {
      get: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const user = await findUser(id);

        if (!user) {
          res.status(404).send();
        }

        await user.populate();
        res.json(
          user.toJson().comments.map((comment: Comment) => comment.toJson())
        );
      }
    }
  };
};

export default routes;
