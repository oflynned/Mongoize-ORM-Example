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
      comments: [Comment]
    }
  `;

  const userResolvers = {
    Query: {
      users: async (): Promise<object[]> => {
        const users: User[] = await Repository.with(User).findAll();
        return Promise.all(users.map(async (user: User) => user.populate()));
      },
      comments: async (): Promise<object[]> => {
        const comments: Comment[] = await Repository.with(Comment).findAll();
        return Promise.all(
          comments.map(async (comment: Comment) => comment.populate())
        );
      }
    }
  };

  const server = new ApolloServer({
    typeDefs: userType,
    resolvers: userResolvers
  });

  server.applyMiddleware({ app });
};
