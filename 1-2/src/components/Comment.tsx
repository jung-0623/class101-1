import React from "react"

interface Props {}

export default function Comment(props: Props): JSX.Element {
  return (
    <div>
      댓글
      <div>작성자</div>
      <div>내용</div>
      <div>2021-12-12</div>
    </div>
  )
}
