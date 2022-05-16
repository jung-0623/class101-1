import React from "react"
import { Comment as RpcComment } from "../rpcgen"
import { formatTimestamp } from "../utils/time"

interface Props {
  comment: RpcComment
}

export default function Comment(props: Props): JSX.Element {
  return (
    <div className="flex flex-col items-start border m-3">
      <div className="text-xs">{props.comment.body}</div>
      <div className="flex flex-row text-gray-600 text-xs self-end">
        <div>{props.comment.author.name}</div>
        <div>{formatTimestamp(props.comment.timestamp)}</div>
      </div>
    </div>
  )
}
