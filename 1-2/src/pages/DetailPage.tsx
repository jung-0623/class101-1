import React from "react"
import Comment from "../components/Comment"

export default function DetailPage(): JSX.Element {
  return (
    <div>
      <div>작성자</div>
      <div>내용</div>
      <div>2021-12-12</div>
      <div>
        댓글 목록
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <input />
        <button>댓글 쓰기</button>
      </div>
    </div>
  )
}
