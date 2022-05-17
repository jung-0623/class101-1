import express from "express"
import rpcHandler from "./rpcHandler"

const app = express()

app.use(express.json())

app.post("/rpc", rpcHandler)

export async function listen(hostname: string, port: number): Promise<void> {
  return new Promise((resolve) => {
    app.listen(port, hostname, resolve)
  })
}
