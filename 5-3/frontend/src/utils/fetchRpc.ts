import { IRpc, RpcFunctionResponse, RpcRequest } from "../rpcgen"

export default async function fetchRpc<T extends keyof IRpc>(
  rpcRequest: RpcRequest<T>,
): Promise<RpcFunctionResponse<T>> {
  const res = await fetch("/rpc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rpcRequest),
  })

  const json = await res.json()
  return json.response
}
