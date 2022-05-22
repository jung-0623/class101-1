import { RpcError } from "../rpcgen"

const rpcErrorKor: Record<RpcError, string> = {
  [RpcError.Other]: "알 수 없는 오류입니다.",
  [RpcError.WrongRequest]: "잘못된 요청 입니다.",
  [RpcError.NoUser]: "존재하지 않는 사용자 입니다.",
  [RpcError.NoPost]: "존재하지 않는 글 입니다.",
  [RpcError.Short]: "너무 짧습니다.",
}

export function parseRpcError(e: RpcError): string {
  return rpcErrorKor[e]
}
