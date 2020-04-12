import { UserType, User } from '../models/user.model';
import { Repository } from 'mongoize-orm';

export async function createUser(payload: UserType): Promise<User> {
  const user = await Repository.with(User).findOne({ email: payload.email });
  if (user) {
    return user;
  }

  return new User().build(payload).save();
}

export async function findUser(id: string): Promise<User> {
  const user = await Repository.with(User).findById(id);
  if (user) {
    return user;
  }

  throw new Error('User not found');
}

export async function findUsers(query: object): Promise<User[]> {
  return Repository.with(User).findMany(query);
}

export async function updateUser(id: string, payload: object): Promise<User> {
  return Repository.with(User).updateOne(id, payload);
}

export async function deleteUser(id: string): Promise<User> {
  return Repository.with(User).deleteOne(id);
}
