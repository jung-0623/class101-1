import React, { useEffect, useState } from "react"
import useRpc from "../hooks/useRpc"
import { useNavigate } from "react-router-dom"

export default function WritePage(): JSX.Element {
  const rpcCreatePost = useRpc("createPost")
  const navigate = useNavigate()

  const [body, setBody] = useState("")

  useEffect(() => {
    if (rpcCreatePost.value) {
      navigate("/profile")
    }
  }, [rpcCreatePost.value])

  const onSubmit = () => {
    rpcCreatePost.request({ body })
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
        글 쓰기
      </button>
    </div>
  )
}
