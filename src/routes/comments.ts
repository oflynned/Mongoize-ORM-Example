import {Request, Response} from 'express';
import {createComment, findComment, findComments} from "../controllers/comment.controller";
import {MongoClient} from "../../node_modules/@oflynned/mongoize-orm";
import {User} from "../models/user.model";
import {Comment} from "../models/comment.model";

const routes = (client: MongoClient) => {
    return {
        "/": {
            post: async (req: Request, res: Response): Promise<void> => {
                const comment = await createComment(client, req.body);
                res.status(201).json(comment);
            },
            get: async (req: Request, res: Response): Promise<void> => {
                const comments = await findComments(client, {});
                res.json(comments.map((comment: Comment) => comment.toJson()));
            }
        },
        "/:id": {
            get: async (req: Request, res: Response): Promise<void> => {
                const {id} = req.params;
                const comment = await findComment(client, id);
                if (comment) {
                    res.json(comment.toJson());
                    return;
                }

                res.status(404).send();
            }
        },
        "/:id/poster": {
            get: async (req: Request, res: Response): Promise<void> => {
                const {id} = req.params;
                const comment: Comment = await findComment(client, id);
                if (comment) {
                    res.json((await comment.poster(client)).toJson());
                    return;
                }

                res.status(404).send();
            }
        }
    }
};

export default routes;
