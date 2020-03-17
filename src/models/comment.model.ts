import {BaseDocument, Schema, Joi} from "@oflynned/mongoize-orm";
import {User} from "./user.model";

export interface IComment {
    poster: User,
    content: string;
}

class CommentSchema extends Schema<IComment> {
    joiBaseSchema(): object {
        return {
            poster: Joi.string().required(),
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
}
