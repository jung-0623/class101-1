import React from "react"
import { Link } from "react-router-dom"

interface Props {
  children: React.ReactNode
  to: string
}

export default function NavigationItem(props: Props): JSX.Element {
  return (
    <div className="border m-2">
      <Link to={props.to}>{props.children}</Link>
    </div>
  )
}
