import { Post, PromiseRpc, User, Comment } from "./rpcgen"

const server: PromiseRpc = {
  createPost: async (req) => {
    posts.push({
      body: req.body,
      comments: [],
      id: posts.length,
      author: user,
      timestamp: Date.now(),
    })
    return {}
  },
  createComment: async (req) => {
    const post = findPost(req.postId)
    post.comments.push({
      id: post.comments.length,
      author: user,
      body: req.body,
      timestamp: Date.now(),
    })
    return {}
  },
  readPost: async (req) => {
    return { post: findPost(req.postId) }
  },
  readRandomPost: async () => {
    return { post: findPost(Math.floor(Math.random() * posts.length)) }
  },
  readProfile: async () => {
    return { user }
  },
  readPreview: async () => {
    const comments: Comment[] = []
    posts.forEach((p) => {
      p.comments.forEach((c) => {
        if (c.author.id === user.id) {
          comments.push(c)
        }
      })
    })

    return { posts: posts.filter((p) => p.author.id === user.id), comments }
  },
  updateProfile: async (req) => {
    user.name = req.name
    return {}
  },
}

export default server

const user: User = { id: 3, name: "내 이름" }
const user2: User = { id: 4, name: "다른 유저" }
const posts: Post[] = [
  { id: 0, body: "내용1", author: user, timestamp: Date.now() - 2345432, comments: [] },
  {
    id: 1,
    body: "내용2",
    author: user2,
    timestamp: Date.now() - 2131231231,
    comments: [{ body: "댓글2", author: user2, timestamp: Date.now(), id: 2 }],
  },
  {
    id: 2,
    body: "내용3",
    author: user2,
    timestamp: Date.now(),
    comments: [{ body: "댓글1", author: user, timestamp: Date.now(), id: 1 }],
  },
]

function findPost(postId: number): Post {
  const post = posts.find((p) => p.id === postId)
  if (!post) {
    throw Error("no post")
  }
  return post
}
