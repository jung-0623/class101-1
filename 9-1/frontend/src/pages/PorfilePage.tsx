import React, { useEffect, useState } from "react"
import Preview from "../components/Preview"
import useRpc from "../hooks/useRpc"
import Loading from "../components/Loading"
import useNavigateWithSearch from "../hooks/useNavigateWithSearch"

export default function PorfilePage(): JSX.Element {
  const rpcReadProfile = useRpc("readProfile", {})
  const rpcReadPreview = useRpc("readPreview", {})
  const rpcUpdateProfile = useRpc("updateProfile")
  const rpcDeleteSession = useRpc("deleteSession")

  const navigate = useNavigateWithSearch()

  const [name, setName] = useState("")

  const user = rpcReadProfile.value?.user
  const preview = rpcReadPreview.value

  useEffect(() => {
    if (user?.name) {
      setName(user.name)
    }
  }, [user?.name])

  useEffect(() => {
    if (rpcUpdateProfile.value) {
      rpcReadPreview.request({})
    }
  }, [rpcUpdateProfile.value])

  useEffect(() => {
    if (rpcDeleteSession.value) {
      navigate("/login", {})
    }
  }, [rpcDeleteSession.value])

  if (!user || !preview) {
    return <Loading />
  }

  const onChangeName = () => {
    rpcUpdateProfile.request({ name })
  }

  const onClickPost = (id: number) => {
    navigate("/update", { id })
  }

  const onLogout = () => {
    rpcDeleteSession.request({})
  }

  return (
    <div className="flex flex-col items-center">
      <input
        className="text-xl font-bold text-center"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <button className="text-xs underline" onClick={onChangeName}>
        이름 변경
      </button>
      <div className="flex flex-row justify-between w-full max-w-lg">
        <div>
          <div className="font-bold">내가 쓴 글</div>
          {preview.posts.map((p) => (
            <Preview
              key={p.id}
              preview={p}
              onClick={() => {
                onClickPost(p.id)
              }}
            />
          ))}
        </div>
        <div>
          <div className="font-bold">내가 쓴 댓글</div>
          {preview.comments.map((p) => (
            <Preview key={p.id} preview={p} />
          ))}
        </div>
      </div>
      <button className="text-gray-500 font-xs" onClick={onLogout}>
        로그아웃
      </button>
    </div>
  )
}
