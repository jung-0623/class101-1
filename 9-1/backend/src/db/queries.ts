import { OAuth2Provider, RpcError } from "../rpcgen"
import { mustLong } from "../utils/errors"
import { select, selectOne } from "../utils/queries"
import { conn } from "./connection"
import {
  CommentModel,
  PostLikeModel,
  PostModel,
  SessionModel,
  UserModel,
} from "./models"

const ml = (v: string, min?: number) => mustLong(v, RpcError.Short, min)

export async function insertUser(
  name: string,
  provider: OAuth2Provider,
  uniqueId: string,
): Promise<void> {
  await conn().query(
    "insert into `users`(`name`,`provider`,`uniqueId`) values(?,?,?)",
    [ml(name), provider, uniqueId],
  )
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

export async function insertSession(id: string, userId: number): Promise<void> {
  await conn().query("insert into `sessions`(`id`,`userId`) values(?,?)", [
    id,
    userId,
  ])
}

export async function insertPostLike(
  postId: number,
  userId: number,
): Promise<void> {
  await conn().query("insert into `postLikes`(`postId`,`userId`) values(?,?)", [
    postId,
    userId,
  ])
}

export const selectSession = (id: string): Promise<SessionModel> =>
  selectOne("select * from `sessions` where `id` = ?", [id], RpcError.NoSession)

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

export const selectPostLikes = (postId: number): Promise<PostLikeModel[]> =>
  select("select * from `postLikes` where `postId` = ?", [postId])

export const selectPostsByAuthor = (authorId: number): Promise<PostModel[]> =>
  select("select * from `posts` where `authorId` = ?", [authorId])

export const selectCommentsByAuthor = (
  authorId: number,
): Promise<CommentModel[]> =>
  select("select * from `comments` where `authorId` = ?", [authorId])

export const selectCommentsByPost = (postId: number): Promise<CommentModel[]> =>
  select("select * from `comments` where `postId` = ?", [postId])

export const selectUserByUniqueId = (
  provider: OAuth2Provider,
  uniqueId: string,
): Promise<UserModel> =>
  selectOne(
    "select * from `users` where `provider` = ? and `uniqueId` = ?",
    [provider, uniqueId],
    RpcError.NoUser,
  )

export async function updatePost(
  postId: number,
  authorId: number,
  body: string,
): Promise<void> {
  await conn().query(
    "update `posts` set `body` = ? where `id` = ? and `authorId` = ?",
    [ml(body), postId, authorId],
  )
}

export async function updateUser(id: number, name: string): Promise<void> {
  await conn().query("update `users` set `name` = ? where `id` = ?", [
    ml(name),
    id,
  ])
}

export async function deleteSession(id: string): Promise<void> {
  await conn().query("delete from `sessions` where `id` = ?", [id])
}

export async function selectOrInsertUser(
  name: string,
  provider: OAuth2Provider,
  uniqueId: string,
): Promise<UserModel> {
  try {
    return await selectUserByUniqueId(provider, uniqueId)
  } catch (e) {
    if (e === RpcError.NoUser) {
      await insertUser(name, provider, uniqueId)
      return selectUserByUniqueId(provider, uniqueId)
    }

    throw e
  }
}
