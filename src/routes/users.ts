import {Request, Response} from 'express';
import {createUser, findUser, findUsers} from "../controllers/user.controller";
import {MongoClient} from "mongoize-orm";
import {Comment} from "../models/comment.model";
import {User} from "../models/user.model";

const routes = (client: MongoClient) => {
    return {
        "/": {
            post: async (req: Request, res: Response): Promise<void> => {
                const user = await createUser(client, req.body);
                res.status(201).json(user.toJson());
            },
            get: async (req: Request, res: Response): Promise<void> => {
                const users = await findUsers(client, {});
                res.json(users.map((user: User) => user.toJson()));
            }
        },
        "/:id": {
            get: async (req: Request, res: Response): Promise<void> => {
                const {id} = req.params;
                try {
                    const user = await findUser(client, id);
                    res.json(user.toJson());
                } catch (e) {
                    res.status(404).send();
                }
            }
        },
        "/:id/comments": {
            get: async (req: Request, res: Response): Promise<void> => {
                const {id} = req.params;
                const user = await findUser(client, id);
                const comments = await user.comments(client);
                res.json(comments.map((comment: Comment) => comment.toJson()));
            }
        }
    }
};

export default routes;
