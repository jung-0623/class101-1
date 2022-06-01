import React, { useEffect, useState } from "react"
import useNavigateWithSearch from "../hooks/useNavigateWithSearch"
import useNumberParams from "../hooks/useNumberParams"
import useRpc from "../hooks/useRpc"

export default function UpdatePage(): JSX.Element {
  const postId = useNumberParams("id")

  const rpcRead = useRpc("readPost", { postId })
  const rpcUpdate = useRpc("updatePost")
  const navigate = useNavigateWithSearch()

  const [body, setBody] = useState("")

  useEffect(() => {
    if (rpcRead.value) {
      setBody(rpcRead.value.post.body)
    }
  }, [rpcRead.value])

  useEffect(() => {
    if (rpcUpdate.value) {
      navigate("/detail", { id: postId })
    }
  }, [rpcUpdate.value])

  const onSubmit = () => {
    rpcUpdate.request({ postId, body })
  }

  return (
    <div className="flex flex-col items-center">
      <textarea
        className="border w-full max-w-xl font-xl p-3 mb-3"
        rows={5}
        value={body}
        onChange={(e) => {
          setBody(e.target.value)
        }}
      />
      <button className="border border-black" onClick={onSubmit}>
        글 수정
      </button>
    </div>
  )
}
