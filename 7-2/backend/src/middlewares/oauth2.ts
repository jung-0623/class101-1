import { RequestHandler } from "express"
import { mustInt, mustString } from "../utils/errors"
import { OAuth2Provider } from "../rpcgen"
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
      res.send(`provider: ${provider}, uniqueId: ${uniqueId}`)
    })
    .catch(next)
}

export default oauth2
