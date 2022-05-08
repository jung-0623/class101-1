import React from "react"
import kakaoLoginButton from "../kakao_login_large_wide.png"

export default function LoginPage(): JSX.Element {
  return (
    <div>
      <button className="w-[200px]">
        <img src={kakaoLoginButton} />
      </button>
    </div>
  )
}
