import express from "express"
import error from "./middlewares/error"
import rpc from "./middlewares/rpc"
import oauth2 from "./middlewares/oauth2"

const app = express()

app.use(express.json())
app.post("/rpc", rpc)
app.get("/oauth", oauth2)
app.use(error)

export async function listen(hostname: string, port: number): Promise<void> {
  return new Promise((resolve) => {
    app.listen(port, hostname, () => {
      resolve()
    })
  })
}
