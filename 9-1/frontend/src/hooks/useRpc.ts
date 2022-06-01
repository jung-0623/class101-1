import { IRpc, RpcError, RpcFunctionRequest, RpcFunctionResponse } from "../rpcgen"
import fetchRpc from "../utils/fetchRpc"
import useAsync from "./useAsync"
import { useEffect } from "react"
import { parseRpcError } from "../utils/errors"
import { useNavigate } from "react-router-dom"

export default function useRpc<T extends keyof IRpc>(name: T, initArg?: RpcFunctionRequest<T>) {
  const f = (request: RpcFunctionRequest<T>) => fetchRpc({ name, request })
  const async = useAsync<RpcFunctionRequest<T>, RpcFunctionResponse<T>, RpcError>(f, initArg)
  const navigate = useNavigate()

  useEffect(() => {
    if (async.error !== undefined) {
      alert(parseRpcError(async.error))
      if (async.error === RpcError.NoSession) {
        navigate("/login")
      }
    }
  }, [async.error])

  return async
}
