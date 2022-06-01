import React, { useEffect, useState } from "react"
import Comment from "../components/Comment"
import Loading from "../components/Loading"
import useNumberParams from "../hooks/useNumberParams"
import useRpc from "../hooks/useRpc"
import { formatTimestamp } from "../utils/time"

export default function DetailPage(): JSX.Element {
  const postId = useNumberParams("id")

  const [commentBody, setCommentBody] = useState("")

  const rpcReadPost = useRpc("readPost", { postId })
  const rpcCreateComment = useRpc("createComment")
  const rpcPostLike = useRpc("createPostLike")

  useEffect(() => {
    if (rpcCreateComment.value) {
      rpcReadPost.request({ postId })
      setCommentBody("")
    }
  }, [rpcCreateComment.value])

  useEffect(() => {
    if (rpcPostLike.value) {
      rpcReadPost.request({ postId })
    }
  }, [rpcPostLike.value])

  const post = rpcReadPost.value?.post
  if (!post) {
    return <Loading />
  }

  const onWriteComment = () => {
    rpcCreateComment.request({ postId: post.id, body: commentBody })
  }

  const onLike = () => {
    rpcPostLike.request({ postId })
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="">{post.body}</div>
        <div className="text-xs">by {post.author.name}</div>
        <div className="text-xs text-gray-700">{formatTimestamp(post.timestamp)}</div>
        <button className="text-xs font-bold" onClick={onLike}>
          좋아요({post.likeCount})
        </button>
      </div>
      <div>
        {post.comments.map((c) => (
          <Comment key={c.id} comment={c} />
        ))}
        <div className="flex flex-row border">
          <input
            value={commentBody}
            onChange={(e) => {
              setCommentBody(e.target.value)
            }}
          />
          <button onClick={onWriteComment}>댓글 쓰기</button>
        </div>
      </div>
    </div>
  )
}
