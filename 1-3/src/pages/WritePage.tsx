import React from "react"

export default function WritePage(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <textarea className="border w-full max-w-xl font-xl p-3 mb-3" rows={5} />
      <button className="border border-black">글 쓰기</button>
    </div>
  )
}
