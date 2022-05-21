import { CommentModel, PostModel, UserModel } from "./models"
import { conn } from "./connection"
import { RowDataPacket } from "mysql2"

export async function insertUser(name: string): Promise<void> {
  await conn().query("insert into `users`(`name`) values(?)", [name])
}

export async function insertPost(
  body: string,
  authorId: number,
): Promise<void> {
  await conn().query(
    "insert into `posts`(`body`, `authorId`, `timestamp`) values(?,?,?)",
    [body, authorId, Date.now()],
  )
}

export async function insertComment(
  body: string,
  authorId: number,
  postId: number,
): Promise<void> {
  await conn().query(
    "insert into `comments`(`body`, `authorId`, `postId`, `timestamp`) values(?,?,?,?)",
    [body, authorId, postId, Date.now()],
  )
}

export async function selectUser(id: number): Promise<UserModel> {
  const [rows] = await conn().query<RowDataPacket[]>(
    "select * from `users` where `id` = ?",
    [id],
  )
  return rows[0] as UserModel
}

export async function selectPost(id: number): Promise<PostModel> {
  const [rows] = await conn().query<RowDataPacket[]>(
    "select * from `posts` where `id` = ?",
    [id],
  )
  return rows[0] as PostModel
}

export async function selectRandomPost(): Promise<PostModel> {
  const [rows] = await conn().query<RowDataPacket[]>(
    "select * from `posts` order by rand() limit 1",
  )
  return rows[0] as PostModel
}

export async function selectPostsByAuthor(
  authorId: number,
): Promise<PostModel[]> {
  const [rows] = await conn().query<RowDataPacket[]>(
    "select * from `posts` where `authorId` = ?",
    [authorId],
  )
  return rows as PostModel[]
}

export async function selectCommentsByAuthor(
  authorId: number,
): Promise<CommentModel[]> {
  const [rows] = await conn().query<RowDataPacket[]>(
    "select * from `comments` where `authorId` = ?",
    [authorId],
  )
  return rows as CommentModel[]
}

export async function selectCommentsByPost(
  postId: number,
): Promise<CommentModel[]> {
  const [rows] = await conn().query<RowDataPacket[]>(
    "select * from `comments` where `postId` = ?",
    [postId],
  )
  return rows as CommentModel[]
}

export async function updateUser(id: number, name: string): Promise<void> {
  await conn().query("update `users` set `name` = ? where `id` = ?", [name, id])
}
