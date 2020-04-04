import {BaseDocument, Schema, Joi, Repository, MongoClient} from "mongoize-orm";
import {User} from "./user.model";

export interface IComment {
    posterId: string,
    content: string;
}

class CommentSchema extends Schema<IComment> {
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

export class Comment extends BaseDocument<IComment, CommentSchema> {
    joiSchema(): CommentSchema {
        return new CommentSchema();
    }

    async poster(client: MongoClient): Promise<User> {
        return Repository.with(User).findById(client, this.record.posterId);
    }
}
