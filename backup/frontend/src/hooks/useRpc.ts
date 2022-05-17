import { IRpc, RpcError, RpcFunctionRequest, RpcFunctionResponse } from "../rpcgen"
import fetchRpc from "../utils/fetchRpc"
import useAsync from "./useAsync"

export default function useRpc<T extends keyof IRpc>(name: T, initArg?: RpcFunctionRequest<T>) {
  const f = (request: RpcFunctionRequest<T>) => fetchRpc({ name, request })
  return useAsync<RpcFunctionRequest<T>, RpcFunctionResponse<T>, RpcError>(f, initArg)
}
