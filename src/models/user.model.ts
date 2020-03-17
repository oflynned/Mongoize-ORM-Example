import {BaseDocument, Schema, Joi} from "@oflynned/mongoize-orm";
import {Comment} from "./comment.model";

export interface IUser {
    name: string;
    email: string;
    dob: Date;
    comments: Comment[];
}

class UserSchema extends Schema<IUser> {
    joiBaseSchema(): object {
        return {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            dob: Joi.date().required()
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
}
