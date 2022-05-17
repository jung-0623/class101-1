import { RequestHandler } from "express"
import rpcImpl from "../rpcImpl"
import { PromiseRpc } from "../rpcgen"

const rpc: RequestHandler = (req, res, next) => {
  rpcImpl[req.body.name as keyof PromiseRpc](req.body.request)
    .then((response) => {
      res.json({ response })
    })
    .catch(next)
}

export default rpc
