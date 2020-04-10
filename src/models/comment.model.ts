import {BaseDocument, Schema, Joi, Repository, MongoClient, BaseModelType} from "mongoize-orm";
import {User} from "./user.model";

export interface CommentType extends BaseModelType{
    posterId: string,
    content: string;
}

class CommentSchema extends Schema<CommentType> {
    joiBaseSchema(): object {
        return {
            posterId: Joi.string().required(),
            content: Joi.string().max(512).required()
        };
    }

    joiUpdateSchema(): object {
        return undefined;
    }
}

export class Comment extends BaseDocument<CommentType, CommentSchema> {
    joiSchema(): CommentSchema {
        return new CommentSchema();
    }

    async poster(client: MongoClient): Promise<User> {
        return Repository.with(User).findById(client, this.record.posterId);
    }
}
