import { Request, Response } from 'express';
import {
  createComment,
  findComment,
  findComments
} from '../controllers/comment.controller';
import { MongoClient } from 'mongoize-orm';
import { Comment } from '../models/comment.model';

const routes = () => {
  return {
    '/': {
      post: async (req: Request, res: Response): Promise<void> => {
        try {
          const comment = await createComment(req.body);
          res.status(201).json(comment.toJson());
        } catch (err) {
          res.status(400).json(err);
        }
      },
      get: async (req: Request, res: Response): Promise<void> => {
        const comments = await findComments({});
        res
          .status(200)
          .json(comments.map((comment: Comment) => comment.toJson()));
      }
    },
    '/:id': {
      get: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const comment = await findComment(id);
        if (comment) {
          res.json(comment.toJson());
          return;
        }

        res.status(404).send();
      }
    },
    '/:id/poster': {
      get: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const comment: Comment = await findComment(id);
        await comment.populate();
        if (comment) {
          res.json(comment.toJson().poster);
          return;
        }

        res.status(404).send();
      }
    }
  };
};

export default routes;
