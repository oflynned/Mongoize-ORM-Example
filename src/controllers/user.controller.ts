import { UserType, User } from '../models/user.model';
import { MongoClient, Repository } from 'mongoize-orm';

export async function createUser(
  client: MongoClient,
  payload: UserType
): Promise<User> {
  const user = await Repository.with(User).findOne(client, {
    email: payload.email
  });
  if (user) {
    return user;
  }

  return new User().build(payload).save(client);
}

export async function findUser(client: MongoClient, id: string): Promise<User> {
  const user = await Repository.with(User).findById(client, id);
  if (user) {
    return user;
  }

  throw new Error('user not found');
}

export async function findUsers(
  client: MongoClient,
  query: object
): Promise<User[]> {
  return Repository.with(User).findMany(client, query);
}

export async function updateUser(
  client: MongoClient,
  id: string,
  payload: object
): Promise<User> {
  return Repository.with(User).updateOne(client, id, payload);
}

export async function deleteUser(
  client: MongoClient,
  id: string
): Promise<User> {
  return Repository.with(User).deleteOne(client, id);
}
