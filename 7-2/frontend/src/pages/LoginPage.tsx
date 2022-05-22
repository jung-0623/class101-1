import React, { useEffect } from "react"
import kakaoLoginButton from "../kakao_login_large_wide.png"
import useRpc from "../hooks/useRpc"
import { OAuth2Provider } from "../rpcgen"

export default function LoginPage(): JSX.Element {
  const rpc = useRpc("readOAuth2Url")

  useEffect(() => {
    if (rpc.value) {
      window.location.href = rpc.value.url
    }
  }, [rpc.value])

  const onKakao = () => {
    rpc.request({ provider: OAuth2Provider.Kakao })
  }

  return (
    <div>
      <button className="w-[200px]" onClick={onKakao}>
        <img src={kakaoLoginButton} />
      </button>
    </div>
  )
}
