import {
  BaseModelType,
  BaseRelationshipType,
  DatabaseClient,
  Joi,
  RelationalDocument,
  Repository,
  Schema
} from 'mongoize-orm';
import { User } from './user.model';

export interface CommentType extends BaseModelType {
  posterId: string;
  content: string;
}

interface CommentRelationship extends BaseRelationshipType {
  poster: Comment | object;
}

class CommentSchema extends Schema<CommentType> {
  joiBaseSchema(): object {
    return {
      posterId: Joi.string().required(),
      content: Joi.string()
        .max(512)
        .required()
    };
  }

  joiUpdateSchema(): object {
    return undefined;
  }
}

export class Comment extends RelationalDocument<
  CommentType,
  CommentSchema,
  CommentRelationship
> {
  joiSchema(): CommentSchema {
    return new CommentSchema();
  }

  protected async relationalFields(
    depth: number,
    client: DatabaseClient
  ): Promise<CommentRelationship> {
    await super.relationalFields(depth, client);
    return {
      poster: (await this.poster()).toJson()
    };
  }

  private async poster(): Promise<User> {
    return await Repository.with(User).findById(this.record.posterId);
  }
}
