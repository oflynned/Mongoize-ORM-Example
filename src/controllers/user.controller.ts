import {IUser, User} from "../models/user.model";
import {MongoClient, Repository} from "@oflynned/mongoize-orm";

export async function createUser(client: MongoClient, payload: IUser): Promise<User> {
    const user = await Repository.with(User).findOne(client, {email: payload.email});
    if (user) {
        return user;
    }

    return new User().build(payload).save(client);
}

export async function findUser(client: MongoClient, id: string): Promise<User> {
    return Repository.with(User).findById(client, id);
}

export async function findUsers(client: MongoClient, query: object): Promise<User[]> {
    return Repository.with(User).findMany(client, query);
}

export async function updateUser(client: MongoClient, id: string, payload: object): Promise<User> {
    return Repository.with(User).updateOne(client, id, payload);
}

export async function deleteUser(client: MongoClient, id: string): Promise<User> {
    return Repository.with(User).deleteOne(client, id);
}
