import { RpcError } from "../rpcgen"
import { mustLong } from "../utils/errors"
import { select, selectOne } from "../utils/queries"
import { conn } from "./connection"
import { CommentModel, PostModel, UserModel } from "./models"

const ml = (v: string, min?: number) => mustLong(v, RpcError.Short, min)

export async function insertUser(name: string): Promise<void> {
  await conn().query("insert into `users`(`name`) values(?)", [ml(name)])
}

export async function insertPost(
  body: string,
  authorId: number,
): Promise<void> {
  await conn().query(
    "insert into `posts`(`body`, `authorId`, `timestamp`) values(?,?,?)",
    [ml(body), authorId, Date.now()],
  )
}

export async function insertComment(
  body: string,
  authorId: number,
  postId: number,
): Promise<void> {
  await conn().query(
    "insert into `comments`(`body`, `authorId`, `postId`, `timestamp`) values(?,?,?,?)",
    [ml(body), authorId, postId, Date.now()],
  )
}

export const selectUser = (id: number): Promise<UserModel> =>
  selectOne("select * from `users` where `id` = ?", [id], RpcError.NoUser)

export const selectPost = (id: number): Promise<PostModel> =>
  selectOne("select * from `posts` where `id` = ?", [id], RpcError.NoPost)

export const selectRandomPost = (): Promise<PostModel> =>
  selectOne(
    "select * from `posts` order by rand() limit 1",
    undefined,
    RpcError.NoPost,
  )

export const selectPostsByAuthor = (authorId: number): Promise<PostModel[]> =>
  select("select * from `posts` where `authorId` = ?", [authorId])

export const selectCommentsByAuthor = (
  authorId: number,
): Promise<CommentModel[]> =>
  select("select * from `comments` where `authorId` = ?", [authorId])

export const selectCommentsByPost = (postId: number): Promise<CommentModel[]> =>
  select("select * from `comments` where `postId` = ?", [postId])

export async function updateUser(id: number, name: string): Promise<void> {
  await conn().query("update `users` set `name` = ? where `id` = ?", [
    ml(name),
    id,
  ])
}
