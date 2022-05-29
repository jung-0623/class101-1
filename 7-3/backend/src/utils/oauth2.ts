import { OAuth2Provider } from "../rpcgen"
import fetch, { Response } from "node-fetch"

type OAuth2Info = {
  authUrl: string
  tokenUrl: string
  clientId: string
  uniqueIdUrl: string
  getUniqueId: (res: Response) => Promise<string>
}

const infos: Record<OAuth2Provider, OAuth2Info> = {
  [OAuth2Provider.Kakao]: {
    authUrl: "https://kauth.kakao.com/oauth/authorize",
    tokenUrl: "https://kauth.kakao.com/oauth/token",
    clientId: "ad3d9213e9b3a4470c44ca85674ac87d",
    uniqueIdUrl: "https://kapi.kakao.com/v2/user/me",
    getUniqueId: async (res) => {
      const json = (await res.json()) as any
      if (typeof json.id === "number") {
        return `kakao${json.id}`
      }
      throw json
    },
  },
}

const redirectUrl = "http://127.0.0.1:8080/oauth"

export function getAuthUrl(provider: OAuth2Provider): string {
  const info = infos[provider]
  const params = new URLSearchParams()
  params.set("response_type", "code")
  params.set("redirect_uri", redirectUrl)
  params.set("client_id", info.clientId)
  params.set("state", `${provider}`)
  return `${info.authUrl}?${params.toString()}`
}

export async function fetchToken(
  provider: OAuth2Provider,
  code: string,
): Promise<string> {
  const info = infos[provider]
  const params = new URLSearchParams()
  params.set("grant_type", "authorization_code")
  params.set("client_id", info.clientId)
  params.set("redirect_uri", redirectUrl)
  params.set("code", code)

  const res = await fetch(info.tokenUrl, { method: "POST", body: params })
  const json = (await res.json()) as any
  const accessToken = json.access_token
  if (!accessToken) {
    throw json
  }

  return accessToken
}

export async function fetchUniqueId(
  provider: OAuth2Provider,
  accessToken: string,
): Promise<string> {
  const info = infos[provider]
  const res = await fetch(info.uniqueIdUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return info.getUniqueId(res)
}
