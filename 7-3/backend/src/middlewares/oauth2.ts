import { RequestHandler } from "express"
import { insertSession, selectOrInsertUser } from "../db/queries"
import { OAuth2Provider } from "../rpcgen"
import { mustInt, mustString } from "../utils/errors"
import { fetchToken, fetchUniqueId } from "../utils/oauth2"
import { createSessionId } from "../utils/sessions"

const oauth2: RequestHandler = (req, res, next) => {
  const code = mustString(req.query["code"], "no code")
  const state = mustString(req.query["state"], "no state")
  const provider: OAuth2Provider = mustInt(state, `${state} is not a provider`)
  fetchToken(provider, code)
    .then((accessToken) => {
      return fetchUniqueId(provider, accessToken)
    })
    .then((uniqueId) => {
      return selectOrInsertUser("익명", provider, uniqueId)
    })
    .then((user) => {
      const sessionId = createSessionId()
      insertSession(sessionId, user.id)
        .then(() => {
          res.cookie("session-id", sessionId)
          res.redirect("http://127.0.0.1:3000")
        })
        .catch(next)
    })
    .catch(next)
}

export default oauth2
