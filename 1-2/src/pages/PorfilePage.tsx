import React from "react"
import Preview from "../components/Preview"

export default function PorfilePage(): JSX.Element {
  return (
    <div>
      <div>내 이름</div>
      <button>이름 변경</button>
      <div>
        내가 쓴 글
        <Preview />
        <Preview />
        <Preview />
        <Preview />
        <Preview />
      </div>
      <div>
        내가 쓴 댓글
        <Preview />
        <Preview />
        <Preview />
        <Preview />
      </div>
      <button>로그아웃</button>
    </div>
  )
}
