import { RequestHandler } from "express"
import { selectOrInsertUser } from "../db/queries"
import { OAuth2Provider } from "../rpcgen"
import { mustInt, mustString } from "../utils/errors"
import { fetchToken, fetchUniqueId } from "../utils/oauth2"

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
      res.send(JSON.stringify(user))
    })
    .catch(next)
}

export default oauth2
