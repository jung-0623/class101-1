import React from "react"

export default function MainPage(): JSX.Element {
  return (
    <div>
      <div>
        <div className="">내용</div>
        <div className="text-xs">by 작성자</div>
        <div className="text-xs text-gray-700">2021-12-12</div>
      </div>
      <button className="border border-black p-2 m-1">자세히</button>
      <button className="border border-black p-2 m-1">다음 글</button>
    </div>
  )
}
