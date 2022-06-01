import {
  insertComment,
  insertPost,
  insertPostLike,
  selectCommentsByAuthor,
  selectPost,
  selectPostLikes,
  selectPostsByAuthor,
  selectRandomPost,
  selectUser,
  updatePost,
  updateUser,
} from "./db/queries"
import { toComments, toPost, toPosts, toUser } from "./db/converts"
import { getAuthUrl } from "./utils/oauth2"
import { RpcWithContext } from "./rpcContext"

const rpcImpl: RpcWithContext = {
  createPost: async (req, ctx) => {
    await insertPost(req.body, await ctx.getUserId())
    return {}
  },
  createComment: async (req, ctx) => {
    await insertComment(req.body, await ctx.getUserId(), req.postId)
    return {}
  },
  readPost: async (req) => {
    return { post: await toPost(await selectPost(req.postId)) }
  },
  readRandomPost: async (req, ctx) => {
    return { post: await toPost(await selectRandomPost()) }
  },
  readProfile: async (req, ctx) => {
    return { user: await toUser(await selectUser(await ctx.getUserId())) }
  },
  readPreview: async (req, ctx) => {
    return {
      comments: await toComments(
        await selectCommentsByAuthor(await ctx.getUserId()),
      ),
      posts: await toPosts(await selectPostsByAuthor(await ctx.getUserId())),
    }
  },
  updatePost: async (req, ctx) => {
    await updatePost(req.postId, await ctx.getUserId(), req.body)
    return {}
  },
  updateProfile: async (req, ctx) => {
    await updateUser(await ctx.getUserId(), req.name)
    return {}
  },
  readOAuth2Url: async (req) => {
    const url = getAuthUrl(req.provider)
    return { url }
  },
  deleteSession: async (req, ctx) => {
    await ctx.deleteSession()
    return {}
  },
  createPostLike: async (req, ctx) => {
    const userId = await ctx.getUserId()
    const likes = await selectPostLikes(req.postId)
    if (likes.findIndex((v) => v.userId === userId) === -1) {
      await insertPostLike(req.postId, userId)
    }
    return {}
  },
}

export default rpcImpl
