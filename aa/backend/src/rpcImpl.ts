import { PromiseRpc } from "./rpcgen"
import {
  insertComment,
  insertPost,
  selectCommentsByAuthor,
  selectPost,
  selectPostsByAuthor,
  selectRandomPost,
  selectUser,
  updateUser,
} from "./db/queries"
import { toComments, toPost, toPosts, toUser } from "./db/converts"

const userId = 0

const rpcImpl: PromiseRpc = {
  createPost: async (req) => {
    await insertPost(req.body, userId)
    return {}
  },
  createComment: async (req) => {
    await insertComment(req.body, userId, req.postId)
    return {}
  },
  readPost: async (req) => {
    return { post: await toPost(await selectPost(req.postId)) }
  },
  readRandomPost: async (req) => {
    return { post: await toPost(await selectRandomPost()) }
  },
  readProfile: async (req) => {
    return { user: await toUser(await selectUser(userId)) }
  },
  readPreview: async (req) => {
    return {
      comments: await toComments(await selectCommentsByAuthor(userId)),
      posts: await toPosts(await selectPostsByAuthor(userId)),
    }
  },
  updateProfile: async (req) => {
    await updateUser(userId, req.name)
    return {}
  },
}

export default rpcImpl
