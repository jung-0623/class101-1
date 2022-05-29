import { RequestHandler } from "express"
import { IRpc } from "../rpcgen"
import rpcImpl from "../rpcImpl"

const rpc: RequestHandler = (req, res, next) => {
  const name = req.body.name as keyof IRpc

  rpcImpl[name](req.body.request)
    .then((response) => {
      res.json({ response })
    })
    .catch(next)
}

export default rpc
