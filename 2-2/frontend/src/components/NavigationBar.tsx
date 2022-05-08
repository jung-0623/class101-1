import React from "react"
import NavigationItem from "./NavigationItem"

export default function NavigationBar(): JSX.Element {
  return (
    <div className="flex flex-row justify-center items-center">
      <NavigationItem to="/">메인</NavigationItem>
      <NavigationItem to="/write">글 쓰기</NavigationItem>
      <NavigationItem to="/profile">내 정보</NavigationItem>
    </div>
  )
}
