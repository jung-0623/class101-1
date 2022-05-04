import React from "react"
import Comment from "../components/Comment"

export default function DetailPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="">내용</div>
        <div className="text-xs">by 작성자</div>
        <div className="text-xs text-gray-700">2021-12-12</div>
      </div>
      <div>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <div className="flex flex-row border">
          <input className="" />
          <button>댓글 쓰기</button>
        </div>
      </div>
    </div>
  )
}
