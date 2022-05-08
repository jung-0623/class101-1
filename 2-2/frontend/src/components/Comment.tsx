import React from "react"

interface Props {}

export default function Comment(props: Props): JSX.Element {
  return (
    <div className="flex flex-col items-start border m-3">
      <div className="text-xs">내용</div>
      <div className="flex flex-row text-gray-600 text-xs self-end">
        <div>작성자</div>
        <div>2021-12-12</div>
      </div>
    </div>
  )
}
