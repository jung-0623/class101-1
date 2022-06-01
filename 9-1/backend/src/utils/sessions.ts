import crypto from "crypto"
import { RpcError } from "../rpcgen"

export function createSessionId(): string {
  return crypto.randomBytes(20).toString("hex")
}

export function parseSessionId(cookieString: string | undefined): string {
  if (!cookieString) {
    throw RpcError.NoSession
  }

  const cookies = parseCookie(cookieString)
  const sessionId = cookies.get("session-id")
  if (!sessionId) {
    throw RpcError.NoSession
  }

  return sessionId
}

function parseCookie(str: string): Map<string, string> {
  const r = new Map<string, string>()
  const keyValues = str.split(";")
  keyValues.forEach((kv) => {
    const keyAndValue = kv.split("=")
    if (keyAndValue.length !== 2) {
      return
    }
    r.set(keyAndValue[0].trim(), keyAndValue[1].trim())
  })
  return r
}
