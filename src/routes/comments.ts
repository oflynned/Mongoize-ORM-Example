import {Request, Response} from 'express';
import {createComment, findComment, findComments} from "../controllers/comment.controller";
import {MongoClient} from "@oflynned/mongoize-orm";

const routes = (client: MongoClient) => {
    return {
        "/": {
            post: async (req: Request, res: Response): Promise<void> => {
                const comment = await createComment(client, req.body);
                res.json(comment);
            },
            get: async (req: Request, res: Response): Promise<void> => {
                const comments = await findComments(client, {});
                res.json(comments);
            }
        },
        "/:id": {
            get: async (req: Request, res: Response): Promise<void> => {
                const {id} = req.params;
                const comment = await findComment(client, id);
                res.json(comment);
            }
        },
        "/:id/poster": {
            get: async (req: Request, res: Response): Promise<void> => {
                const {id} = req.params;
                const comment = await findComment(client, id);
                res.json(comment.toJson().poster.toJson());
            }
        }
    }
};

export default routes;
