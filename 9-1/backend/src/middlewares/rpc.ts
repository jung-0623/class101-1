import { RequestHandler } from "express"
import { IRpc, RpcError } from "../rpcgen"
import rpcImpl from "../rpcImpl"
import { RpcContext } from "../rpcContext"
import { parseSessionId } from "../utils/sessions"
import { deleteSession, selectSession } from "../db/queries"

const rpc: RequestHandler = (req, res, next) => {
  const name = req.body.name as keyof IRpc
  const f = rpcImpl[name]
  if (!f) {
    console.error(`no function for name:${name}`)
    next(RpcError.WrongRequest)
    return
  }

  const { request } = req.body
  if (typeof request !== "object") {
    console.error(`request: ${request}`)
    next(RpcError.WrongRequest)
    return
  }

  const ctx: RpcContext = {
    getUserId: async () => {
      const sessionId = parseSessionId(req.header("Cookie"))
      const session = await selectSession(sessionId)
      return session.userId
    },
    deleteSession: async () => {
      const sessionId = parseSessionId(req.header("Cookie"))
      await deleteSession(sessionId)
      res.cookie("session-id", "", { maxAge: 0 })
    },
  }

  f(request, ctx)
    .then((response) => {
      res.json({ response })
    })
    .catch(next)
}

export default rpc
