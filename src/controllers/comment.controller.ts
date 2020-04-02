import {IComment, Comment} from "../models/comment.model";
import {MongoClient, Repository} from "../../node_modules/@oflynned/mongoize-orm/src";

export async function createComment(client: MongoClient, payload: IComment): Promise<Comment> {
    return new Comment().build(payload).save(client);
}

export async function findComment(client: MongoClient, id: string): Promise<Comment> {
    return Repository.with(Comment).findById(client, id);
}

export async function findComments(client: MongoClient, query: object): Promise<Comment[]> {
    return Repository.with(Comment).findMany(client, query);
}

export async function deleteComment(client: MongoClient, id: string): Promise<Comment> {
    return Repository.with(Comment).deleteOne(client, id);
}
