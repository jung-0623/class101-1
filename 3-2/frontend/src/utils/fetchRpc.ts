import { IRpc, RpcFunctionResponse, RpcRequest } from "../rpcgen"
import server from "../server"

export default function fetchRpc<T extends keyof IRpc>(rpcRequest: RpcRequest<T>): Promise<RpcFunctionResponse<T>> {
  return server[rpcRequest.name](rpcRequest.request)
}
