import {
  BaseDocument,
  Schema,
  Joi,
  Repository,
  MongoClient,
  BaseModelType
} from 'mongoize-orm';
import { Comment } from './comment.model';

export interface UserType extends BaseModelType {
  name: string;
  email: string;
}

class UserSchema extends Schema<UserType> {
  joiBaseSchema(): object {
    return {
      name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required()
    };
  }

  joiUpdateSchema(): object {
    return undefined;
  }
}

export class User extends BaseDocument<UserType, UserSchema> {
  joiSchema(): UserSchema {
    return new UserSchema();
  }

  async comments(client: MongoClient): Promise<Comment[]> {
    return Repository.with(Comment).findMany(client, {
      posterId: this.record._id
    });
  }
}
