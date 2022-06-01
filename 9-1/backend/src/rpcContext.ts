import { IRpc, RpcFunctionRequest, RpcFunctionResponse } from "./rpcgen"

export type RpcWithContext = {
  [K in keyof IRpc]: (
    req: RpcFunctionRequest<K>,
    context: RpcContext,
  ) => Promise<RpcFunctionResponse<K>>
}

export type RpcContext = {
  getUserId: () => Promise<number>
  deleteSession: () => Promise<void>
}
