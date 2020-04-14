import { Application } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { User } from '../models/user.model';
import { Comment } from '../models/comment.model';
import { Repository } from 'mongoize-orm';

export const graphql = (app: Application) => {
  const userType = gql`
    type User {
      _id: String
      name: String
      email: String
      comments: [Comment]
    }

    type Comment {
      _id: String
      content: String
      poster: User
    }

    type Query {
      users: [User]
      user(_id: String): User
      comments: [Comment]
    }
  `;

  const userResolvers = {
    Query: {
      users: async (): Promise<User[]> =>
        Repository.with(User).findAll({ populate: true }),
      user: async (context: any, { _id }: { _id: string }): Promise<User> => {
        return Repository.with(User).findById(_id, { populate: true });
      },
      comments: async (): Promise<Comment[]> =>
        Repository.with(Comment).findAll({ populate: true })
    }
  };

  const server = new ApolloServer({
    typeDefs: userType,
    resolvers: userResolvers
  });

  server.applyMiddleware({ app });
};
