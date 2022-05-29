export interface UserModel {
  id: number
  name: string
  provider: number
  uniqueId: string
}

export interface PostModel {
  id: number
  authorId: number
  body: string
  timestamp: number
}

export interface CommentModel {
  id: number
  authorId: number
  postId: number
  body: string
  timestamp: number
}

export interface SessionModel {
  id: string
  userId: number
}
