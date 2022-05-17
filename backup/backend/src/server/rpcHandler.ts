import { RequestHandler } from "express"
import rpcImpl from "../rpcImpl"
import { IRpc } from "../rpcgen"

const rpcHandler: RequestHandler = (req, res, next) => {
  console.log(req.body)
  const name = req.body.name
  if (!name || typeof name !== "string") {
    next("no name")
    return
  }

  const f = rpcImpl[name as keyof IRpc]

  if (!f) {
    next(`no function for name:${name}`)
    return
  }

  const request = req.body.request
  if (!request || typeof request !== "object") {
    next("no request")
    return
  }

  f(request)
    .then((response) => {
      res.json({ response })
    })
    .catch(next)
}

export default rpcHandler
