import { CommentModel, PostModel, UserModel } from "./models"

export async function insertUser(name: string): Promise<void> {
  users.push({ id: users.length, name })
}

export async function insertPost(body: string, authorId: number): Promise<void> {
  posts.push({ id: posts.length, body, authorId, timestamp: Date.now() })
}

export async function insertComment(body: string, authorId: number, postId: number): Promise<void> {
  comments.push({ id: comments.length, postId, body, authorId, timestamp: Date.now() })
}

export async function selectUser(id: number): Promise<UserModel> {
  return findById(id, users)
}

export async function selectPost(id: number): Promise<PostModel> {
  return findById(id, posts)
}

export async function selectRandomPost(): Promise<PostModel> {
  return posts[Math.floor(Math.random() * posts.length)]
}

export async function selectPostsByAuthor(authorId: number): Promise<PostModel[]> {
  return posts.filter((v) => v.authorId === authorId)
}

export async function selectCommentsByAuthor(authorId: number): Promise<CommentModel[]> {
  return comments.filter((v) => v.authorId === authorId)
}

export async function selectCommentsByPost(postId: number): Promise<CommentModel[]> {
  return comments.filter((v) => v.postId === postId)
}

export async function updateUser(id: number, name: string): Promise<void> {
  const user = findById(id, users)
  user.name = name
}

const users: UserModel[] = [
  { id: 0, name: "홍길동" },
  { id: 1, name: "영희" },
]

const posts: PostModel[] = [
  { id: 0, authorId: 0, body: "첫 번째 글입니다", timestamp: Date.now() - 1233123 },
  { id: 1, authorId: 1, body: "두 번째 글", timestamp: Date.now() - 12312123 },
  { id: 2, authorId: 1, body: "3 번째 글입니다", timestamp: Date.now() - 1231123 },
  { id: 3, authorId: 0, body: "4 번째 글입니다", timestamp: Date.now() - 1231231 },
]

const comments: CommentModel[] = [
  { id: 0, authorId: 0, postId: 0, body: "첫 번째 글의 첫 번째 댓글", timestamp: Date.now() + 213213 },
  { id: 1, authorId: 1, postId: 0, body: "첫 번째 글의 2 번째 댓글", timestamp: Date.now() + 21321343 },
  { id: 2, authorId: 0, postId: 3, body: "4번글의 댓글", timestamp: Date.now() + 213213333 },
]

function findById<T extends { id: number }>(id: number, arr: T[]): T {
  const r = arr.find((v) => v.id === id) // r: T | undefined
  if (!r) {
    throw Error(`no id: ${id}`)
  }
  return r // r: T
}
