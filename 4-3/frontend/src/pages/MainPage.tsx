import React, { useEffect } from "react"
import useRpc from "../hooks/useRpc"
import { formatTimestamp } from "../utils/time"
import Loading from "../components/Loading"
import useNavigateWithSearch from "../hooks/useNavigateWithSearch"

export default function MainPage(): JSX.Element {
  const rpcRandomPost = useRpc("readRandomPost", {})
  const navigate = useNavigateWithSearch()
  const post = rpcRandomPost.value?.post

  if (!post) {
    return <Loading />
  }

  const onNext = () => {
    rpcRandomPost.request({})
  }

  const onDetail = () => {
    navigate("/detail", { id: post.id })
  }

  return (
    <div>
      <div>
        <div className="">{post.body}</div>
        <div className="text-xs">by {post.author.name}</div>
        <div className="text-xs text-gray-700">{formatTimestamp(post.timestamp)}</div>
      </div>
      <button className="border border-black p-2 m-1" onClick={onDetail}>
        자세히
      </button>
      <button className="border border-black p-2 m-1" onClick={onNext}>
        다음 글
      </button>
    </div>
  )
}
