import { IRpc, RpcError, RpcFunctionRequest, RpcFunctionResponse } from "../rpcgen"
import fetchRpc from "../utils/fetchRpc"
import useAsync from "./useAsync"
import { useEffect } from "react"
import { parseRpcError } from "../utils/errors"

export default function useRpc<T extends keyof IRpc>(name: T, initArg?: RpcFunctionRequest<T>) {
  const f = (request: RpcFunctionRequest<T>) => fetchRpc({ name, request })
  const async = useAsync<RpcFunctionRequest<T>, RpcFunctionResponse<T>, RpcError>(f, initArg)

  useEffect(() => {
    if (async.error !== undefined) {
      alert(parseRpcError(async.error))
    }
  }, [async.error])

  return async
}
