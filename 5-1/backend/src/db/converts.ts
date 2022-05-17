import { CommentModel, PostModel, UserModel } from "./models"
import { Comment, Post, User } from "../rpcgen"
import { selectCommentsByPost, selectUser } from "./queries"

export async function toUser(m: UserModel): Promise<User> {
  return { name: m.name, id: m.id }
}

export async function toPost(m: PostModel): Promise<Post> {
  const author = await toUser(await selectUser(m.authorId))
  return {
    id: m.id,
    body: m.body,
    timestamp: m.timestamp,
    author,
    comments: await toComments(await selectCommentsByPost(m.id)),
  }
}

export async function toComment(m: CommentModel): Promise<Comment> {
  const author = await toUser(await selectUser(m.authorId))
  return { id: m.id, author, body: m.body, timestamp: m.timestamp }
}

export function toComments(arr: CommentModel[]): Promise<Comment[]> {
  return Promise.all(arr.map((v) => toComment(v)))
}

export function toPosts(arr: PostModel[]): Promise<Post[]> {
  return Promise.all(arr.map((v) => toPost(v)))
}
