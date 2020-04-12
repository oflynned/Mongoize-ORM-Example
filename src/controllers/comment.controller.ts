import { CommentType, Comment } from '../models/comment.model';
import { Repository } from 'mongoize-orm';

export async function createComment(payload: CommentType): Promise<Comment> {
  return new Comment().build(payload).save();
}

export async function findComment(id: string): Promise<Comment> {
  return Repository.with(Comment).findById(id);
}

export async function findComments(query: object): Promise<Comment[]> {
  return Repository.with(Comment).findMany(query);
}

export async function deleteComment(id: string): Promise<Comment> {
  return Repository.with(Comment).deleteOne(id);
}
