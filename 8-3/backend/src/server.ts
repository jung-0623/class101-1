import express from "express"
import error from "./middlewares/error"
import rpc from "./middlewares/rpc"
import oauth2 from "./middlewares/oauth2"
import path from "path"

const app = express()

app.use(express.json())
app.post("/rpc", rpc)
app.get("/oauth", oauth2)

const staticDir = path.join(__dirname, "..", "static")
app.use(express.static(staticDir))
app.get("*", (req, res) => {
  res.sendFile(path.join(staticDir, "index.html"))
})

app.use(error)

export async function listen(hostname: string, port: number): Promise<void> {
  return new Promise((resolve) => {
    app.listen(port, hostname, () => {
      resolve()
    })
  })
}
