import React from "react"
import { Link } from "react-router-dom"

export default function NavigationBar(): JSX.Element {
  return (
    <div>
      <Link to="/">메인</Link>
      <Link to="/write">글 쓰기</Link>
      <Link to="/profile">내 정보</Link>
    </div>
  )
}
