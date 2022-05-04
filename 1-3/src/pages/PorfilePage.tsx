import React from "react"
import Preview from "../components/Preview"

export default function PorfilePage(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <input className="text-xl font-bold text-center" value="내 이름" />
      <button className="text-xs underline">이름 변경</button>
      <div className="flex flex-row justify-between w-full max-w-lg">
        <div>
          <div className="font-bold">내가 쓴 글</div>
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
      </div>
      <button className="text-gray-500 font-xs">로그아웃</button>
    </div>
  )
}
