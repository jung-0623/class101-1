import React from "react"
import { Preview as RpcPreview } from "../rpcgen"

interface Props {
  preview: RpcPreview
  onClick?: () => void
}

export default function Preview(props: Props): JSX.Element {
  return (
    <div className="text-xs" onClick={props.onClick}>
      {props.preview.body}
    </div>
  )
}
