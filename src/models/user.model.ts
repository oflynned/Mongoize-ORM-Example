import {BaseDocument, Schema, Joi, Repository, MongoClient} from "../../node_modules/@oflynned/mongoize-orm";
import {Comment} from "./comment.model";

export interface IUser {
    name: string;
    email: string;
}

class UserSchema extends Schema<IUser> {
    joiBaseSchema(): object {
        return {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        };
    }

    joiUpdateSchema(): object {
        return undefined;
    }
}

export class User extends BaseDocument<IUser, UserSchema> {
    joiSchema(): UserSchema {
        return new UserSchema();
    }

    async comments(client: MongoClient): Promise<Comment[]> {
        return Repository.with(Comment).findMany(client, {posterId: this.record._id});
    }
}
