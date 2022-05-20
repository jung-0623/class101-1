import express from "express"
import rpc from "./middlewares/rpc"

const app = express()

app.use(express.json())
app.post("/rpc", rpc)

export async function listen(hostname: string, port: number): Promise<void> {
  return new Promise((resolve) => {
    app.listen(port, hostname, () => {
      console.log("listen: ", hostname, port)
      resolve()
    })
  })
}
