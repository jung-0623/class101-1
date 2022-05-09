import { Post, PromiseRpc, User ,Comment} from "./rpcgen"

const server: PromiseRpc = {
  createPost: (req) => {
    posts.push({ body: req.body, comments: [], id: posts.length, author: user, timestamp: Date.now() })
    return Promise.resolve({})
  },
  createComment: (req) => {
    const post = findPost(req.postId)
    post.comments.push({ id: post.comments.length, author: user, body: req.body, timestamp: Date.now() })
    return Promise.resolve({})
  },
  readPost: (req) => {
    return Promise.resolve({ post: findPost(req.postId) })
  },
  readRandomPost: (req) => {
    return Promise.resolve({ post: findPost(Math.floor(Math.random() * posts.length)) })
  },
  readProfile: (req) => {
    return Promise.resolve({user})
  },
  readPreview: (req) => {
    const comments:Comment[] = [];
    posts.forEach((p)=>{
      p.comments.forEach((c)=>{
        if(c.author.id===user.id){
          comments.push(c)
        }
      })
    })

    return Promise.resolve({posts:posts.filter((p)=>p.author.id===user.id),comments})
  },
  updateProfile: (req) => {
    user.name = req.name
    return Promise.resolve({})
  },
}

export default server

const user: User = { id: 3, name: "내 이름" }
const user2: User = { id: 4, name: "다른 유저" }
const posts: Post[] = [
  { id: 0, body: "내용1", author: user, timestamp: Date.now(), comments: [] },
  { id: 1, body: "내용2", author: user2, timestamp: Date.now(), comments: [] },
  { id: 2, body: "내용3", author: user2, timestamp: Date.now(), comments: [] },
]

function findPost(postId: number): Post {
  const post = posts.find((p) => p.id === postId)
  if (!post) {
    throw Error("no post")
  }
  return post
}