import {
  Joi,
  Repository,
  CredentialDocument,
  CredentialType,
  CredentialSchema,
  BaseRelationshipType,
  DatabaseClient
} from 'mongoize-orm';
import { Comment } from './comment.model';

export interface UserType extends CredentialType {
  name: string;
  email: string;
}

export interface UserRelationshipType extends BaseRelationshipType {
  comments: Comment[];
}

class UserSchema extends CredentialSchema<UserType> {
  schemaWithoutCredentials(): object {
    return {
      name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required()
    };
  }
}

export class User extends CredentialDocument<
  UserType,
  UserSchema,
  UserRelationshipType
> {
  joiSchema(): UserSchema {
    return new UserSchema();
  }

  protected async relationalFields(
    depth: number,
    client: DatabaseClient
  ): Promise<UserRelationshipType> {
    await super.relationalFields(depth, client);
    return {
      comments: await this.comments()
    };
  }

  private async comments(): Promise<Comment[]> {
    const comments: Comment[] = await Repository.with(Comment).findMany({
      posterId: this.record._id
    });

    await Promise.all(comments.map((comment: Comment) => comment.populate()));

    return comments;
  }
}
