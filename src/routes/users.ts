import {Request, Response} from 'express';
import {createUser, findUser, findUsers} from "../controllers/user.controller";
import {MongoClient} from "@oflynned/mongoize-orm";
import {Comment} from "../models/comment.model";

const routes = (client: MongoClient) => {
    return {
        "/": {
            post: async (req: Request, res: Response): Promise<void> => {
                const user = await createUser(client, req.body);
                res.json(user);
            },
            get: async (req: Request, res: Response): Promise<void> => {
                const users = await findUsers(client, {});
                res.json(users);
            }
        },
        "/:id": {
            get: async (req: Request, res: Response): Promise<void> => {
                const {id} = req.params;
                const user = await findUser(client, id);
                res.json(user);
            }
        },
        "/:id/comments": {
            get: async (req: Request, res: Response): Promise<void> => {
                const {id} = req.params;
                const user = await findUser(client, id);
                res.json(user.toJson().comments.map((comment: Comment) => comment.toJson()));
            }
        }
    }
};

export default routes;
